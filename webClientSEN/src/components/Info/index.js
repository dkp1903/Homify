import React, { Component } from 'react';
import {useParams} from 'react-router-dom';

import ResetPasswordSuccess from './resetPasswordSuccess';
import ForgotPassword from './forgotPassword';
import NotAvailable from '../NotAvailable';

const Info = (props) => {
	let { info } = useParams();
	console.log(useParams())
	switch(info) {
		case 'resetPasswordSuccess':
			return <ResetPasswordSuccess />
			break;
		case 'forgotPassword':
			return <ForgotPassword />
			break;
		default:
			return  <span />;
	}
}

export default Info;