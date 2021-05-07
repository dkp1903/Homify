import React from 'react';
import { connect } from 'react-redux';
import {
	useLocation,
	Link,
	withRouter
} from "react-router-dom";
import { logoutUser } from '../../actions/auth';



const NavBar = ({ isAuthenticated, logoutUser }) => {
	const location = useLocation();
	const renderLeft = () => {
		if (isAuthenticated) {
			return (
				<div className="navbar-item">
					<Link className="navbar-item" to='/wishList'>
						<span className="icon has-text-info is-medium">
						<i className="fas fa-list fa-lg"></i>
				  		</span>
					</Link>
					<span className="icon has-text-info is-medium">
						<i className="far fa-bell fa-lg"></i>
				  	</span>
					<div className="button is-light" onClick={logoutUser}>Logout</div>
				</div>
			);
		}
		return (
			[
				<div className="navbar-item" key='end'>
					<div className="buttons">
						<Link to='/signUp' className="button is-primary" key='signup'>
							<strong>Sign up</strong>
						</Link>
						<Link to='/login' className="button is-light" key='login'>
							Log in
						</Link>
					</div>
				</div>
			]
		);
	}
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<div className="navbar-item" key={'logo'}>
					<Link to='/' >
						<b>WSILN</b>
					</Link>
				</div>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">
					<Link className="navbar-item" to='/home' key={'home'}>
						Home
					</Link>
					<Link className="navbar-item" to='/contact' key={'contact'}>
						Contact
					</Link>
					<Link className="navbar-item" to='/Blog' key={'blog'}>
						Blog
					</Link>
					<Link className="navbar-item" to='/MapView' key={'mapview'}>
						Map
					</Link>
				</div>

				<div className="navbar-end">
					{renderLeft()}
				</div>
			</div>
		</nav>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => dispatch(logoutUser(ownProps.history))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));