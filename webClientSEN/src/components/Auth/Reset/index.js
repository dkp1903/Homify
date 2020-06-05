import React from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetPassword } from '../../../actions/auth';

class NormalResetPassword extends React.Component {

	render() {
		const { errors, touched } = this.props
		return (
			<div className="container is-vcentered">
				<div className="columns is-centered">
					<div className="column is-one-third">
						<div className="card">
							<header class="card-header">
								<h2 class="card-header-title is-size-4">
									Reset Password
    							</h2>
							</header>
							<div className="card-content">

								<div className="content">
									<Form>
										<div class="field">
											<label class="label is-family-sans-serif">Password</label>
											<div class="control has-icons-left">
												<Field class="input" name="password" type="password" placeholder="Password" />
												<span class="icon is-small is-left">
												<i class="fas fa-envelope"></i>
											</span>
											</div>
											{touched.password && errors.password ? <p class="help is-danger">{errors.password}</p> : null}
										</div>
										<div class="field">
											<label class="label is-family-sans-serif">Re-type password</label>
											<div class="control has-icons-left">
												<Field class="input" name="confirmPassword" type="password" placeholder="Re-type password" />
												<span class="icon is-small is-left">
												<i class="fas fa-envelope"></i>
											</span>
											</div>
											{touched.confirmPassword && errors.confirmPassword ? <p class="help is-danger">{errors.confirmPassword}</p> : null}
										</div>
										<div class="field">
											<div class="control is-centered">
												<button class="button is-success is-centered" type="submit">
													Reset Password
												</button>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div> ̰

				</div>

			</div>
		)
	}
}

const ResetPassword = withFormik({
	mapPropsToValues() {
		return ({
			password: '',
			confirmPassword: '',
		})
	},
	handleSubmit(values, { props, resetForm }) {
		props.resetPassword(values.password, props.match.params.token, props.history)
		resetForm()
	},
	validationSchema: Yup.object().shape({
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
		password: Yup.string().required()
	})
})(NormalResetPassword)

const mapDispatchToProps = (dispatch) => ({
	resetPassword: (password, token, history) => dispatch(resetPassword(password, token, history))
})

export default withRouter(connect(null, mapDispatchToProps)(ResetPassword));
