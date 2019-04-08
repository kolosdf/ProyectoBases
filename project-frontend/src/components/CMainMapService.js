import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

const Geo = require("open-street-map-reverse-geo-node-client");
const reverse = new Geo.ReverseGeocoder();

let position;

let zoomMap;


class MappService extends React.Component {

constructor(props){
super(props);
this.state = {lat: 3.42158, lng: -76.5205, zoom: 18, currentPos: null ,currentPos:'' ,addres:'',markers: []};
this.mandarPos = this.mandarPos.bind(this);
this.handleClick = this.handleClick.bind(this);
}

//Funcion para añadir marcas al mapa al hacer click
addMarker = (e) =>{
  const {markers} = this.state
  markers.push(e.latlng)
  this.setState({markers})
}

handleClick(e){
    this.setState({currentPos:e.latlng})
    console.log(this.state.currentPos);

  reverse
    .getReverse(this.state.currentPos.lat, this.state.currentPos.lng)
    .then(location => {
      this.setState({addres:location.displayName})
      console.log(this.state.addres)
    })
    .catch(err => {
      console.error(err)
    })
    this.addMarker(e);
  }
  

  mandarPos() {
    this.props.callback({
      lat: this.state.currentPos.lat,
      lng: this.state.currentPos.lng
    });
}


  render() {

    const {lat,lng,zoom} = this.state;
    position = [lat,lng];
    zoomMap = zoom;
    
    return (

        <Map center = {position} zoom = {zoomMap} onclick = {this.handleClick} onSelect = {this.mandarPos} >
                     
                     <TileLayer attribution = "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       />
       
             {this.state.markers.map((position,idx) => 
           
           <Marker draggable key={'marker-${idx}'} position = {position} latlng>
             <Popup> <span>{this.state.addres}</span> </Popup>
             </Marker>
    )}
        </Map>
    );
  }
}

export default MappService