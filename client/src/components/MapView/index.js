import React, { Component} from 'react';
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import { SERVER_URL } from '../../utils/constants';
import { withRouter } from 'react-router-dom';
import defaultImage from '../../assets/location/ahmedabad.svg';
class MapView extends Component
{
    
    async componentDidMount() {
        const url = SERVER_URL + '/property';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ properties: [...data.property] });
        
    }
     
        
        
    
    state = 
    {
        properties: [],
        viewport : {
        latitude: 23.0225,
        longitude : 72.5714, 
        zoom : 10,
        width: "100vw",
        height: "100vh", 
        
        },
        showPopup : false,
        popupProperty: null,
        
    };
    onClickPopup = () => {
                const id = this.state.popupProperty.propertyId;
                console.log(this.state.popupProperty);
                this.props.history.push(`/property/${id}`);
    }
               
    
    render(){
            const {showPopup} = this.state;

            return(
            <div>
                
                
                <ReactMapGL {...this.state.viewport} 
                    onViewportChange={(viewport) => this.setState({viewport})} 
                    mapStyle = "mapbox://styles/dkp1903/ck9gkcrzg078i1iqy13p2p2hp"
                    mapboxApiAccessToken = "pk.eyJ1IjoiZGtwMTkwMyIsImEiOiJjazhya3F3YWMwM2tsM21wbWY3ZTE0OWo1In0.bspO79N0Vc0Fgu1b4bqU5A"
                >
                
                {this.state.properties.length ? this.state.properties.map((property, propertyId) => ( 
                    <Marker 
                        longitude={parseFloat(property.longitude)}
                        latitude= {parseFloat(property.latitude)}
                        key={propertyId}>
                        <span className="icon has-text-info"
                        onClick = {(e) => {
                            e.preventDefault();
                            this.setState({showPopup: true, popupProperty: property});
                             
                        }}>
                            <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                        </span>
                    </Marker>
                )): null}

                        {showPopup && <Popup
                            latitude={parseFloat(this.state.popupProperty.latitude)}
                            longitude={parseFloat(this.state.popupProperty.longitude)}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => this.setState({showPopup: false})}
                            anchor="top" >
                                
<div class="card" onClick={this.onClickPopup}>
    <div class="card-image">
        <figure className="image is-4by3">
            <img src={`${SERVER_URL}/${this.state.popupProperty.imagePath}`} alt="Property" />
        </figure>
    </div>
    <div class="card-content">
        <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src={defaultImage} alt="Property" />
        </figure>
      </div>
      <div class="media-content">
        <div class="block" style={{ textAlign: 'center' }} data-test-id="loadMoreButton">
            <h1 className="title is-5" style={{marginTop: 13, marginBottom: 6 }}>{this.state.popupProperty.propertyName} </h1>
        </div>
      </div>
    </div>

    <div class="content" >
        <div className="level-item" style={{ justifyContent: 'left'}} >
            <h1 className="title is-6" style={{ marginBottom: 6 }}> 
                
                <i class="fas fa-rupee-sign fa-xs"></i>
                <strong> Price: Rs {this.state.popupProperty.price}
                </strong>
            </h1>  
        </div>

        <div className="level-item" style={{ justifyContent: 'left'}}>
            <h1 className="title is-6" style={{ marginBottom: 6 }}>
                <i class="fas fa-grin-hearts fa-xs"></i>
                <strong> Living Index : {this.state.popupProperty.livingIndex}</strong>
            </h1> 
        </div>
        
        <div className="level-item" style={{ justifyContent: 'left'}} >
            <h1 className="title is-6" style={{ marginBottom: 6}} >
                <i class="fas fa-bed fa-xs"></i>
                <strong> Bedrooms: {this.state.popupProperty.noOfBedrooms} BHK</strong>
            </h1> 
        </div>
        
        <div className="level-item" style={{ justifyContent: 'left'}} >
            <h1 className="title is-6">
                <i class="fas fa-arrows-alt fa-xs"></i>
                <strong> Size: {this.state.popupProperty.totalSqft}</strong>
            </h1>
            <span style={{ marginBottom: 0 }}><i>&nbsp;sq.ft</i></span>
        </div>
    </div>
    </div>
</div>
</Popup>}
</ReactMapGL>
</div>);
 
    }
    
}
 
export default withRouter(MapView);