import React from 'react';
import { Grid,Button, Icon,Form,Image, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import BottomMenu from '../components/BottomMenuBar';
import './Up&BottomMenu.css';
import ImgMapTag from './../images/viajandoTag.png';
import UpMenu from '../components/SMenuBar';
import ImgLogo from './../images/taxiTag.png';
import pagarTaxi from './../images/pagar.png';
import MappService from '../components/CMainMapService';

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

class MapService extends React.Component {

  render() {    
    return (
      <div className='main-containerBlack'>
        <div className='main-container'>
          <UpMenu />

          <Grid centered columns={2} relaxed='very' style={style}>
            <Grid.Row>
              <Grid.Column floated='left'>
                <Image src={ImgLogo} />
              </Grid.Column>

              <Grid.Column floated='right'>
                <Image src={ImgMapTag} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Column stretched floated='right'>
              <Grid.Row>
                <Label style={{fontSize: '40px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content='Conductor' /> 
              </Grid.Row>

              <Grid.Row>  
                <Label style={{fontSize: '30px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content='Nombre:' /> 
              </Grid.Row>
              
              <Grid.Row>  
                <Label style={{fontSize: '30px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content='Placa:' /> 
              </Grid.Row>

              <Grid.Row>  
                <Label style={{fontSize: '20px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content='Distancia' /> 
              </Grid.Row>

              <Grid.Row>
                <Button style={styleButton}>
                  <Image src={pagarTaxi}/>
                </Button>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column floated='left'>
              <MappService/>
            </Grid.Column>
          </Grid>
        </div>
        <BottomMenu />
      </div>
    );
  }
}

export default MapService