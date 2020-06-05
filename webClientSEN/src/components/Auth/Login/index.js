import React from 'react';
import { connect } from 'react-redux'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { withRouter, Redirect } from 'react-router-dom';

import { login, sendResetPasswordEmail } from '../../../actions/auth';
import { toast } from 'react-toastify'


class NormalLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isForgotPassword: false,
      forgetEmail: ''
    }
  }

  handleForgetPassword = () => {
    const { forgetEmail } = this.state;
    if(!forgetEmail) {
      toast.error('please enter an valid email')
    }
    this.setState({forgetEmail: ''});
    this.props.resetPassword(forgetEmail)
  }
  
  handelChange = (event) => {
    this.setState({forgetEmail: event.target.value})
  }
  toggleForget = () => {
    this.setState((prevState) => {
      return {
        isForgotPassword: !prevState.isForgotPassword
      }
    })
  }

  renderRightPanel = () => {
    const {isForgotPassword} = this.state;
    if(!isForgotPassword) {
      return([
        <h1 style={{fontWeight: 800, textAlign: 'center'}}> Where Should We Live In Team Welcomes </h1>,
        <h1 style={{fontSize: 60, textAlign: 'center'}}>YOU</h1>
      ])
    }
    return (
      [
      <div class="field is-centered">
        <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input className="input" name="forgetPassword" type="email" placeholder="Email" onChange={this.handelChange} value={this.state.forgetEmail}/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
      </div>,
      <div class="field">
        <div class="control">
          <button class="button is-success" onClick={this.handleForgetPassword}>
            Send Reset Link
          </button>
        </div>
      </div>
      ]
    );
  }


  render() {
    if(this.props.isAuthenticated){
      return <Redirect to="/" />
    }
    const { errors, touched } = this.props
    return(
      <div className='container'>
        <Form>
        <div className='columns is-vcentered is-8'>
          <div className='column'>
            <div class="field">
            <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <Field className="input" name="email" type="email" placeholder="Email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              {touched.email && errors.email ? <p class="help is-danger">{errors.email}</p> : null }
            </div>
            <div class="field">
            <label class="label">Password</label>
              <div class="control has-icons-left">
                <Field className="input" name="password" type="password" placeholder="Password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-success" type="submit">
                  Login
                </button>
                <a className="is-pulled-right is-center" onClick={this.toggleForget}> Forgot Password</a>
              </div>
            </div>
          </div>
          <div className='column'>
            {this.renderRightPanel()}
          </div>
        </div>
        </Form>
      </div>
    );
  }
}

const LoginForm = withFormik({
  mapPropsToValues() {
    return({
      email: '',
      password: '',
      forgetPassword: ''
    })
  },
  handleSubmit(values, {props, resetForm}) {
    props.login(values.email, values.password, props.history)
    resetForm()
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required(),
    password: Yup.string().required()
  })
})(NormalLoginForm)


const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (email, password, history) => dispatch(login(email, password, history)),
    resetPassword: (email) => dispatch(sendResetPasswordEmail(email))
  })
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
;
