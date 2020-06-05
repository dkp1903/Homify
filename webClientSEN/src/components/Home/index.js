import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Ahmedabad from '../../assets/location/ahmedabad.svg';
import Bangalore from '../../assets/location/bangalore.svg';
import Chennai from '../../assets/location/chennai.svg';
import Delhi from '../../assets/location/delhi.svg';
import Hyderabad from '../../assets/location/hyderabad.svg';
import Mumbai from '../../assets/location/mumbai.svg';

const images = [
  {
    url: Delhi,
    title: 'Delhi',
    width: '10%',
  },
  {
    url: Ahmedabad,
    title: 'Ahmedabad',
    width: '10%',
  },
  {
	url : Chennai,
	title: 'Chennai',
	width: '10%'
  },
  {
    url: Bangalore,
    title: 'Bangalore',
    width: '10%',
  },
  {
    url: Hyderabad,
    title: 'Hyderabad',
    width: '10%',
  },
  {
    url: Mumbai,
    title: 'Mumbai',
    width: '10%',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
	flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
	position: 'relative',
	flexDirection:'column',
    height: '160px',
  },

  focusVisible: {
	color: 'red'
  },

  imageButton: {
	position:'absolute',
	flexWrap: 'wrap',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
	justifyContent: 'flex-end',
	flexDirection: 'column',
  },

  imageSrc: {
    position:'absolute',
	height: '130px',
    left: 0,
    right: 0,
    top: 0,
	bottom: 0,
	display: 'flex',
	backgroundSize: 'cover',
	backgroundPosition: 'center 40%',
  }
}));

function ImageButton() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{images.map(image => (
					<ButtonBase
						data
						disableRipple
						key={image.title}
						className={classes.image}
						focusVisibleClassName={classes.focusVisible}
						style={{width: image.width, margin:'10px'}}
						id="buttonCity"
					>
						<Link to={`/search/${image.title.toLowerCase()}`}>
							<span className={classes.imageSrc} style={{backgroundImage: `url(${image.url})`}}/>
							<span className={classes.imageButton}>
								<h1 class="is-size-6 has-text-grey" > {image.title}</h1>
							</span>
						</Link>
					</ButtonBase>
			))}
		</div>
	);
};

class Home extends React.Component {


	handleClick = (event) => {
		if(event.keyCode === 13) {
			this.props.history.push(`/search/${event.target.value}`)
		}
	}
	render() {
		console.log(this.props);
		return (
			<div className="column is-centered">
				<h1 id="homeTitle" style={{marginBottom:'50px'}}>Where Do You want to Live!</h1>
                <div className="container">
					<div className="column is-centered">
						<div className="columns is-centered" style={{marginBottom:"50px"}}>
							<p className="control has-icons-left" style={{width:"70%"}}>
								<input className="input is-rounded" type="text" placeholder="Search City" onKeyDown={this.handleClick}/>
								<span className="icon is-small is-left">
									<i className="fas fa-search"></i>
								</span>
							</p>
						</div>
						<div className="columns is-centered">
							<h1 className="is-size-4" style={{fontFamily: 'Pacifico'}}>Popular Cities</h1>
						</div>
						<div className="columns is-centered">
							<ImageButton/>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

export default withRouter(Home);