import React from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createUser } from '../../../actions/auth';

class NormalSignUpForm extends React.Component {
	render() {
		const { errors, touched } = this.props
		return (
			<div className="container">
				<div className="columns is-centered">
					<div className="column is-half">
						<div className="card">
							<header className="card-header">
								<h1 className="card-header-title is-size-2">
									Sign Up
								</h1>
							</header>
							<div className="card-content">

								<div className="content">
									<Form>
										<div className="field">
											<label className="label">First Name</label>
											<div className="control">
												<Field className="input" name="firstName" type="text" placeholder="First Name" />
											</div>
											{touched.firstName && errors.firstName ? <p class="help is-danger">{errors.firstName}</p> : null }
										</div>
										<div className="field">
											<label className="label">Last Name</label>
											<div className="control">
												<Field className="input" name="lastName" type="text" placeholder="Last Name" />
											</div>
											{touched.lastName && errors.lastName ? <p class="help is-danger">{errors.lastName}</p> : null }
										</div>
										<div className="field">
											<label className="label">Email</label>
											<div className="control">
												<Field className="input" name="email" type="text" placeholder="Email" />
											</div>
											{touched.email && errors.email ? <p class="help is-danger">{errors.email}</p> : null }
										</div>
										<div className="field">
											<label className="label">Password</label>
											<div className="control">
												<Field className="input" name="password" type="password" placeholder="Password" />
											</div>
											{touched.password && errors.password ? <p class="help is-danger">{errors.password}</p> : null }
										</div>
										<div className="field">
											<label className="label">Confirm Password</label>
											<div className="control">
												<Field className="input" name="confirmPassword" type="password" placeholder="Re-type Password" />
											</div>
											{touched.confirmPassword && errors.confirmPassword ? <p class="help is-danger">{errors.confirmPassword}</p> : null }
										</div>
										<div className="field">
											<div className="control is-centered">
												<button className="button is-success is-centered" type="submit">
													Submit
												</button>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const SignUp = withFormik({
	mapPropsToValues() {
		return ({
			firstName: '',
			lastName: '',
			confirmPassword: '',
			email: '',
			password: ''
		})
	},
	handleSubmit(values, { props, resetForm }) {
		props.createUser(values.email, values.password, values.firstName, values.lastName);
		resetForm();
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid email').required(),
		password: Yup.string().required('Please Enter your password').matches(
		  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
		),
		firstName: Yup.string().required('first name cannot be empty'),
		lastName: Yup.string().required('last name cannot be empty'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
	})
})(NormalSignUpForm)

const mapDispatchToProps = (dispatch) => ({
	createUser: (email, password, firstName, lastName) => dispatch(createUser(email, password, firstName, lastName))
})


export default withRouter(connect(null, mapDispatchToProps)(SignUp));
