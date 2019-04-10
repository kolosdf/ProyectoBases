import React from 'react';
import { Grid,Button, Icon,Form,Image, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import BottomMenu from '../components/BottomMenuBar';
import ImgServTag from './../images/viajandoTag.png';
import UpMenu from '../components/SMenuBar';
import ImgBack from './../images/back.png';
import MainMapa from '../components/CMainMap';


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

class Mapp extends React.Component {

  render() {
    
    return (

        <Grid centered columns={2} relaxed='very' style={style}>
          <Grid.Row>

          <Grid.Column floated='left'>
                        <Button href='/Driver/Main'>
                        <Image src={ImgBack} />
                            </Button>
                    </Grid.Column>

          <Grid.Column floated='right'>
                        <Image src={ImgServTag} />
                    </Grid.Column>

            </Grid.Row>

      <Grid.Column stretched floated='right'>
        <Grid.Row floated='centered'>
        <Button content='Seleccionar Ubicacion'  style={{fontSize: '35px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } onClick={this.handleClick}/>
         </Grid.Row>
        
      </Grid.Column>

      <Grid.Column floated='right'>

        <MainMapa/>

      </Grid.Column>

      </Grid>

    );
  }
}

export default Mapp