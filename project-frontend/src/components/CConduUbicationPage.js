import React from 'react';
import { Grid,Button,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
//import BottomMenu from '../components/BottomMenuBar';
import ImgMapaTag from './../images/MapaTag.png';
//import UpMenu from '../components/SMenuBar';
import ImgBack from './../images/back.png';
//import MainMapa from '../components/CMainMap';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios'

const Geo = require("open-street-map-reverse-geo-node-client");
const reverse = new Geo.ReverseGeocoder();

let position;
let zoomMap;

const style = {
  margin: '0.5em',
  paddingLeft: 0,
  listStyle: 'none',
  backgroundColor: '#FFCC00'
};

const styleButton = {
  color: '#FFFFFF',
  backgroundColor: '#FFCC00'
};

class ConduUbicationPage extends React.Component {
  constructor(props){
    super(props);

    try{
      this.state = {
        cedula: this.props.location.state.cedula,
        placa: this.props.location.state.placa,
        coordenadaX: this.props.location.state.coordeadaX,
        coordenadaY: this.props.location.state.coordeadaY,
        lat: 3.42158,
        lng: -76.5205,
        zoom: 18,
        currentPos:'',
        addres:'',
        markers: [],
        latitud: '',
        longitud: '',
      };
    }catch(err){
      this.props.history.push({pathname:'/'});
      this.state = {
          cedula: '',
          placa: '',
          coordenadaX: '',
          coordenadaY: '',
          lat: 3.42158,
          lng: -76.5205,
          zoom: 18,
          currentPos:'',
          addres:'',
          markers: [],
          latitud: '',
          longitud: '',
      };
    }

    this.mandarPos = this.mandarPos.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAtras = this.handleClickAtras.bind(this);
  }

  handleClickAtras(event){
    const placa = this.state.placa;
    const coordenadax = this.state.coordenadaX;
    const coordenaday = this.state.coordenaday;

    if(!(this.coordeadaX === '')){
      axios.post(`http://localhost:3500/Driver/Main/MiTaxi/Map/${placa}-${coordenadax}-${coordenaday}`)
      .then(res => {
          const respuesta = res.data;
          console.log(respuesta);
      })
      .catch( err => console.log('Error: ', err))
    }
   
    this.props.history.push({pathname:'/Driver/Main/MiTaxi', state:{cedula:this.state.cedula, placa:this.state.placa, coordenadaX:this.state.coordenadaX, coordenadaY:this.state.coordenadaY}});
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

      this.setState({latitud: e.lat});
      this.setState({longitud: e.lng});
      this.setState({coordenadaX: e.lat});
      this.setState({coordenadaY: e.lng});
      const latlngA = this.state.currentPos;
      alert(latlngA);

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
      <Grid centered columns={2} relaxed='very' style={style}>
        <Grid.Row>
          <Grid.Column floated='left'>
            <Button compact onClick={this.handleClickAtras} style={styleButton}>
              <Image src={ImgBack} />
            </Button>
          </Grid.Column>

          <Grid.Column floated='right'>
            <Image src={ImgMapaTag} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column stretched floated='right'>
          <Grid.Row floated='centered'>
            <Button content='Seleccionar Ubicacion'  style={{fontSize: '35px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } onClick={this.handleClick}/>
          </Grid.Row>        
        </Grid.Column>

        <Grid.Column floated='right'>
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
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(ConduUbicationPage)