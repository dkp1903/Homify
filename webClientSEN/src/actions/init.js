import axios from 'axios'

import setAuthToken from "../utils/SetAuthToken";
import { SERVER_URL } from '../utils/constants'
import {setCurrentUser} from './auth';

export const init = (history) => {
	return(dispatch) => {
		const authToken = localStorage.getItem('jwtToken');
		if(!authToken) {
			history.replace('/home')
		}
		axios.post(`${SERVER_URL}/auth/signinToken`, {token: authToken}).then(res => {
			// Save to localStorage
			const { token, user } = res.data;
			// Set token to ls
			// Set token to Auth header
			setAuthToken(token);
	  
			dispatch(setCurrentUser(user));
	  
			history.replace('/home');
		})
		.catch(err => {
			localStorage.removeItem("jwtToken");
		});
	
	}
}