import axios from 'axios'

import setAuthToken from "../utils/SetAuthToken";
import { SERVER_URL } from '../utils/constants'
import {AUTH} from './types';
import { toast } from 'react-toastify'

export const login = (email,password,history) => {
	return(dispatch) => {
	axios.post(`${SERVER_URL}/auth/signin`, {email, password}).then(res => {
      // Save to localStorage
      const { token, user } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);

      dispatch(setCurrentUser(user));

      history.replace('/home');
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		console.log(err)
      }
    });

	}
}

export const setCurrentUser = (user) => {
	return {
		type: AUTH.SET_CURRENT_USER,
		user
	}
}

export const sendResetPasswordEmail = (email) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/auth/reset-password`, {email}).then(res => {
      toast.success('Link Has Been Successfully send to Your email ')
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const resetPassword = (password,token,history) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/auth/reset-password/${token}`, {password}).then(res => {
      toast.success('Your Password Has Been Successfully changed')
      history.replace('/home')
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const createUser = (email, password, firstName, lastName) => {
  return(dispatch) => {
    axios.post(`${SERVER_URL}/auth/signup`, {email, password, firstName, lastName}).then(res => {
      toast.success('User Has Been SuccessFully Created Please Verify Your Email')
    })
    .catch(err => {
      if (err.response) {
         toast.error(err.response.data.message)
      } else {
		    console.log(err)
      }
    });
  }
}

export const logoutUser = (history) => dispatch => {
   // Remove token from localStorage
   localStorage.removeItem("jwtToken");
   // Remove auth header for future requests
   setAuthToken(false);
   // Set current user to {} which will set isAuthenticated to false
   dispatch({
     type: AUTH.LOGOUT
   });
   history.replace('/home');
 };