const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  secureConnection: "true",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false
  }
});

const sendConfirmationMail = (user_id,email,name) => {

  const token = jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: "5d" }); // Generate Token
  const url = `http://localhost:5000/auth/${token}`;
  const mailOptions = {
    from: '"Where Should I Live No Reply" <noreply.whereshouldilive@gmail.com>',
    to: email,
    subject: "	Confirm your account on where should I live in",
    html:
      `Hello, <strong>${name}</strong> <br><br>` +
      `<p>Please click <a href="${url}">here</a> to verify your Where Should I Live In account.</p><br>` +
      "Regards,<br>" +
      "Team, Where Should I Live In"
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Message sent: %s", info.messageId);
  });
};


const sendPasswordResetMail = (email, user_id) => {
  const token = jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: "5d" }); // Generate Token
  const url = `http://localhost:3000/reset-password/${token}`;

  const mailOptions = {
    from: '"Where Should I Live No Reply" <noreply.whereshouldilive@gmail.com>',
    to: email,
    subject: "Reset Password",
    html:
      `Hello,<br><br>` +
      `<p>Please click <a href="${url}">here</a> to change the password.</p><br>` +
      "Regards,<br>" +
      "Team, Where Should I Live In"
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log("Message sent: %s", info.messageId);
  });
};

module.exports = {
  sendConfirmationMail,
  sendPasswordResetMail
};