import React, { Component } from 'react';
import Property from './Property';
import Filter from './Filter';
import { withRouter } from 'react-router-dom';

import { SERVER_URL } from "../../utils/constants";

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            properties: [],
            visible: 3
        }          
    }

	async componentDidMount() {
		const url = SERVER_URL + "/property";
		const response = await fetch(url);
		const data = await response.json();
		this.setProperty(data.property);
	}

    setProperty = (property) => {
        this.setState({ properties: [...property], loading: false });
    } 

	loadmore = () => {
		this.setState({ visible: this.state.visible + 4 });
	};

    onClickProperty = (id) => {
        this.props.history.push(`/property/${id}`)
    }

    renderFooter = () => {
        const { properties } = this.state;
        if (!properties.length) {
            return (
                <div style={{textAlign: "center",fontFamily: 'Pacifico',fontSize: "2.5em"}} > 
                
                    Sorry try another filter
                </div>
            )
        }
        return (
        <div class="block" style={{ textAlign: 'center' }} data-test-id="loadMoreButton">
            <a class="button is-primary" onClick={this.loadmore}>load more </a>
        </div>)
    }

    renderProperties = () => {
        const { properties, loading } = this.state;
        if(loading) return (
            <div className=" has-text-success" style={{textAlign: "center"}}>
                <i className="fas fa-spinner fa-pulse fa-3x"></i>
            </div>
        );
        

        return (
           <>
           { properties.slice(0, this.state.visible).map((property, i) => (
                <Property 
                    key={property.propertyId}
                    id={property.propertyId}
                    type={property.type}
                    onClick={this.onClickProperty}
                    ownerPhoneNumber={property.ownerPhoneNumber}
                    city={property.city}
                    noOfBedrooms={property.noOfBedrooms}
                    totalSqft={property.totalSqft}
                    noOfBathrooms={property.noOfBathrooms}
                    price={property.price}
                    distanceToNearestGym={property.distanceToNearestGym}
                    distanceToNearestHospital={property.distanceToNearestHospital}
                    distanceToNearestSchool={property.distanceToNearestSchool}
                    furnished={property.furnished}
                    imageURL={SERVER_URL + '/' + property.imagePath}
                />))}
                {this.renderFooter()}
            </>
        )

    }
    render() {
        return (
            <div className="columns">
                <div className="column is-narrow is-offset-1">
                    <div style={{ position: "sticky", top:-12}}>
                        <Filter 
                            setProperty ={this.setProperty}
                            setLoading ={ () =>  {this.setState({loading: true})}}
                        />
                    </div>
                </div>
                <div className="column">
                <div class="container" style={{ marginLeft: 0 }}>
                    {this.renderProperties()}
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
