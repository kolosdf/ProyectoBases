import React from 'react';
import { Grid,Button,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
//import ImgDispo from './../images/TaxiDisponibleICON.png';
//import ImgService from './../images/TaxiServicioICON.png';
import ImgNoService from './../images/TaxiNoServicioICON.png';
import ImgMiTaxi from './../images/MiTaxiICON.png';
import ImgExit from './../images/SalirICON.png';
import ImgAsist from './../images/AsistenciaICON.png';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';

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


class MainCondu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cedula: this.props.location.state.cedula,
            placa: ''
        };        

        this.handleClickUser = this.handleClickUser.bind(this);      
        this.handleClickConduct = this.handleClickConduct.bind(this);
    }

    handleClickUser(event){
        alert('Usuario')
    }

    handleClickConduct(event){
        alert('Conductor')
    }

    render(){
        return(
            <Grid centered columns={3}  relaxed='very' style={style}>
                <Grid.Row>                    
                    <Grid.Column floated='left'>
                        <Image src={ImgConduTag} />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Image src={ImgLogo} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column stretched>                    
                    <Grid.Row>
                        <Button compact style={styleButton}>
                            <Image src={ImgNoService} />                            
                        </Button>
                    </Grid.Row>                    
                    <Grid.Row>
                        <Button compact style={styleButton}>
                            <Image src={ImgAsist} />                             
                        </Button>
                    </Grid.Row>               
                </Grid.Column>

                <Grid.Column stretched>                   
                    <Grid.Row>
                        <Button compact style={styleButton}>
                            <Image src={ImgMiTaxi} />                            
                        </Button>
                    </Grid.Row>                    
                    <Grid.Row>
                        <Button href='/' compact style={styleButton}>
                            <Image src={ImgExit} />                            
                        </Button>
                    </Grid.Row>               
                </Grid.Column>             
            </Grid>
        );
    }
}

export default withRouter(MainCondu);