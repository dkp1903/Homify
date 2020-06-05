import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from '../../actions/init';

class LandingPage extends Component {
	componentDidMount() {
		this.props.init()
	}
	render() {
		return (
			<div className="container" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '300px', height: '300px'}}>
			  <div className="chimney" style={{top: '-150px', right: 0, bottom: 0, left: '115px', margin: 'auto', position: 'absolute', width: '50px', height: '50px', zIndex: -1}}>
				<div className="cTop" style={{top: '24px', right: 0, bottom: 0, left: '4px', margin: 'auto', position: 'absolute', width: '70%', height: '6px', borderRadius: '6px', border: '5px solid #292d39'}}>
				  <div className="vapour" style={{top: '-20px', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '4px', height: '10px', backgroundColor: '#292d39', borderRadius: '10px', animation: 'evaporate 500ms infinite', animationDelay: '200ms'}} />
				  <div className="vapour" style={{top: '-20px', right: 0, bottom: 0, left: '-15px', margin: 'auto', position: 'absolute', width: '4px', height: '10px', backgroundColor: '#292d39', borderRadius: '10px', animation: 'evaporate 500ms infinite', animationDelay: '400ms'}} />
				  <div className="vapour" style={{top: '-20px', right: 0, bottom: 0, left: '-30px', margin: 'auto', position: 'absolute', width: '4px', height: '10px', backgroundColor: '#292d39', borderRadius: '10px', animation: 'evaporate 500ms infinite', animationDelay: '600ms'}} />
				  <div className="vapour" style={{top: '-20px', right: 0, bottom: 0, left: '15px', margin: 'auto', position: 'absolute', width: '4px', height: '10px', backgroundColor: '#292d39', borderRadius: '10px', animation: 'evaporate 500ms infinite', animationDelay: '800ms'}} />
				  <div className="vapour" style={{top: '-20px', right: 0, bottom: 0, left: '30px', margin: 'auto', position: 'absolute', width: '4px', height: '10px', backgroundColor: '#292d39', borderRadius: '10px', animation: 'evaporate 500ms infinite', animationDelay: '1000ms'}} />
				</div>
				<div className="cBot" style={{top: '50px', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '10px', height: '20px', borderRadius: '6px', border: '5px solid #292d39'}} />
			  </div>
			  <div className="ceils" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', transform: 'rotate(-90deg)'}}>
				<div className="ceiling" style={{top: 0, right: 0, bottom: 0, left: '220px', margin: 'auto', position: 'absolute', height: '4px', width: '130px', borderRadius: '7px', backgroundColor: '#828592', border: '5px solid #292d39', transformOrigin: 'left', transition: 'all 400ms', transform: 'rotate(-125deg) translate(-5px)'}}>
				  <div className="cover" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute'}} />
				</div>
				<div className="ceiling" style={{top: 0, right: 0, bottom: 0, left: '220px', margin: 'auto', position: 'absolute', height: '4px', width: '130px', borderRadius: '7px', backgroundColor: '#828592', border: '5px solid #292d39', transformOrigin: 'left', transition: 'all 400ms', zIndex: -1, transform: 'rotate(125deg) translate(-5px)'}}>
				  <div className="cover" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute'}} />
				</div>
			  </div>
			  <div className="body" style={{top: '120px', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '160px', height: '150px', borderRadius: '2px', zIndex: -1, borderLeft: '5px solid #292d39', borderRight: '5px solid #292d39'}}>
				<div className="top" style={{top: '-120px', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '40px', height: '40px', borderRadius: '50%', border: '7px solid #292d39', backgroundColor: '#717483'}}>
				  <div className="h" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', height: '5px', backgroundColor: '#292d39'}} />
				  <div className="v" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '5px', backgroundColor: '#292d39'}} />
				</div>
				<div className="door" style={{top: '50%', right: 0, bottom: 0, left: '-90px', margin: 'auto', position: 'absolute', width: '40px', height: '70px', border: '4px solid #292d39', backgroundColor: '#717483'}}>
				  <div className="knob" style={{top: 0, right: 0, bottom: 0, left: '-20px', margin: 'auto', position: 'absolute', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#292d39'}} />
				</div>
				<div className="window" style={{top: '40px', right: 0, bottom: 0, left: '70px', margin: 'auto', position: 'absolute', width: '40px', height: '40px', backgroundColor: '#717483', borderRadius: '5px', border: '6px solid #292d39'}}>
				  <div className="h" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', height: '5px', backgroundColor: '#292d39'}} />
				  <div className="v" style={{top: 0, right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '5px', backgroundColor: '#292d39'}} />
				  <div className="support" style={{top: '115%', right: 0, bottom: 0, left: '-14px', margin: 'auto', position: 'absolute', width: '150%', height: '7px', backgroundColor: 'white', borderRadius: '10px', border: '4px solid #292d39'}} />
				</div>
			  </div>
			  <div className="floor" style={{top: '95%', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', width: '80%', height: '12px', border: '4px solid #292d39', borderRadius: '10px 10px 0px 0px', backgroundColor: '#edeef0'}} />
			  <div className="tree" style={{top: '50%', right: 0, bottom: 0, left: '97%', margin: 'auto', position: 'absolute', width: '70px', height: '150px'}}>
				<div className="main" style={{top: '-60px', right: 0, bottom: 0, left: '-20px', margin: 'auto', position: 'absolute', width: '100px', height: '140px', backgroundColor: '#a1db9e', borderRadius: '70% 70% 70% 70%', border: '5px solid #292d39'}}>
				  <div className="branch" style={{top: '20px', right: 0, bottom: 0, left: '30px', margin: 'auto', position: 'absolute', width: '5px', height: '40px', backgroundColor: '#292d39', borderRadius: '5px', transform: 'rotate(50deg)'}} />
				  <div className="branch" style={{top: '50px', right: 0, bottom: 0, left: '-30px', margin: 'auto', position: 'absolute', width: '5px', height: '40px', backgroundColor: '#292d39', borderRadius: '5px', transform: 'rotate(-60deg)'}} />
				</div>
				<div className="stem" style={{top: '40px', right: 0, bottom: 0, left: 0, margin: 'auto', position: 'absolute', height: '70%', width: '5px', borderRadius: '10px', backgroundColor: '#292d39'}} />
			  </div>
			  <div className="ground" style={{top: '100%', right: 0, bottom: 0, left: '-50px', margin: 'auto', position: 'absolute', width: '140%', height: '10px', borderRadius: '8px', backgroundColor: '#292d39'}} />
			</div>
		  );
	}
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
	init: () => dispatch(init(ownProps.history))
})

export default withRouter(connect(null, mapDispatchToProps)(LandingPage));