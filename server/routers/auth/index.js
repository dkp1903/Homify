
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../database/user");

const {
  sendConfirmationMail,
  sendPasswordResetMail
} = require("../../utils/mailSender.js");

const saltRounds = 10;

const signIn = async(req, res) => {
    const { email, password } = req.body
    try {
      const users = await User.findUser(email);
      const user=users.rows[0]
      if(!user) {
        return res.status(401).json({
          error: true,
          message: "either email or password is wrong"
        })
      }
      if(!user.is_verified) {
        return res.status(401).json({
          error: true,
          message: "Email not verified"
        })
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "Auth failed!.." });
        }
        if(result) {
          const {user_id, email, first_name, last_name } = user;
          const token = jwt.sign({user_id},process.env.SECRET_KEY, { expiresIn: "5h"})
          return res.status(200).json({
            message: "Successful Authentication",
            token,
            user: {
              email,
              first_name,
              last_name
            }
          })
        }
        return res.status(400).json({ message: "Email and password combination is wrong", error: true });
      })
    }catch(e) {
      res.status(500).json({
        message: "something went wrong please try again",
        error: true,
      })
    }
};

const userVerification = async(req, res) => {
  const user = jwt.verify(req.params.token, process.env.SECRET_KEY);
  const { user_id } = user;

  try {
    await User.setEmailVerified(user_id);
    return res.set('Location','/info/emailVerified' ).status(301).json({
      message: "user verified successfully"
    })
  } catch(e) {
    res.status(500).json({
      error: true,
      message: "Error verifying user"
    })
  }
  
};

/* response object should have following parameter
  email
  password
  first name
  last name
*/

const signUp = async(req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    user = await User.findUser(email);
    if(user.rows.length!=0 && user.rows[0].is_verified) {
      return res.status(402).json({
        error: true,
        message: "email already exists"
      })
    }
  }catch(e) {
    console.log(e)
    return res.status(500).json({
      error: true, 
      message: "Database error. Failed to create a user"
    })
  }
  bcrypt.genSalt(saltRounds, function(err, salt) {
     bcrypt.hash(password, salt, (err, hash) => {
        User.createUser(email,hash,firstName,lastName).then((user)  => {
          sendConfirmationMail(user.user_id, user.email, user.first_name);
          return res.status(201).json({
            message: 'User Created Successfully'
          })
        }
        ).catch((e) => res.status(500).json({
          error: true, 
          message: "Database error. Failed to create a user"
        })
        )
    })
  });
  
};

const sendPasswordResetLink = async(req, res) => {
  const { email } = req.body;
  try {
    const users = await User.findUser(email);
    const user=users.rows[0]
    if(!user) {
      return res.status(401).json({
        error: true,
        message: "Error email not registered"
      })
    }
    if(!user.is_verified) {
      return res.status(401).json({
        error: true,
        message: "Email not verified"
      });
    }
    sendPasswordResetMail(email, user.user_id);
    res.status(200).json({ message: "Reset link send to your email" });
  } catch(e) {
    res.status(500).json({
      error: true,
      message: "Error verifying user"
    });
  }
};

const resetPassword = (req, res) => {
  const { password } = req.body;
  const user = jwt.verify(req.params.token, process.env.SECRET_KEY);
  const { user_id } = user;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, (err, hash) => {
      User.resetPassword(user_id,hash).then(()  => {
        return res.status(201).json({
          message: 'Password Reset Successfully'
        })
      }).catch((e) => res.status(500).json({
        error: true, 
        message: "Database error. Failed to create a user"
      })
      )
    });
  });
};

const signInViaToken = async(req, res) => {
  const { token } = req.body;
  if(!token) {
    return res.status(500).json({
      error: true, 
      message: "Token Not Provided"
    })
  }
  const decyptToken = jwt.verify(token, process.env.SECRET_KEY);
  try {
    const { user_id } = decyptToken;
    users = await User.findUserViaId(user_id);
    const user=users.rows[0]
    if(!user) {
      return res.status(402).json({
        error: true,
        message: "email already exists"
      })
    }
    const { email, first_name, last_name } = user;
    return res.status(200).json({
      message: "Successful Authentication",
      token,
      user: {
        email,
        first_name,
        last_name
      }
    })

  }catch(e) {
    console.log(e)
    return res.status(500).json({
      error: true, 
      message: "Database error. Failed to create a user"
    })
  }
}

const router = express.Router();

router.get("/:token", userVerification);
router.post("/signin", signIn);
router.post("/signinToken", signInViaToken)
router.post("/signup", signUp);
router.post("/reset-password", sendPasswordResetLink);
router.post("/reset-password/:token", resetPassword);

module.exports = router;