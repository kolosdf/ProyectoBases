import React from 'react';
import { Grid,Button,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgDispo from './../images/TaxiDisponibleICON.png';
import ImgService from './../images/TaxiServicioICON.png';
import ImgNoService from './../images/TaxiNoServicioICON.png';
import ImgMiTaxi from './../images/MiTaxiICON.png';
import ImgExit from './../images/SalirICON.png';
import ImgAsist from './../images/AsistenciaICON.png';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import axios from 'axios';

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

        try{
            this.state = {
                cedula: this.props.location.state.cedula,
                placa: this.props.location.state.placa,
                imgB: ImgNoService,
                dispo: 'Ocupado',
            };
        }catch(err){
            this.props.history.push({pathname:'/'});
            this.state = {
                cedula: '',
                placa: '',
                dispo: 'Ocupado',
            };
        }

        this.handleClickMiTaxi = this.handleClickMiTaxi.bind(this);
        this.handleClickExit = this.handleClickExit.bind(this);
        this.handleClickDispo = this.handleClickDispo.bind(this);
    }

    handleClickMiTaxi(event){
        this.props.history.push({pathname:'/Driver/Main/MiTaxi', state:{cedula:this.state.cedula, placa:this.state.placa}});
    }

    changeDispo(cedula,dispo){
        axios.post(`http://localhost:3500/Driver/Dispo/${cedula}-${dispo}`)
            .then(res => {                
            })
            .catch( err => console.log('Error: ', err));
    }

    handleClickDispo(event){
        const cedula = this.state.cedula;        

        if(this.state.dispo === 'Ocupado'){
            this.setState({imgB: ImgDispo});
            this.setState({dispo: 'Disponible'});
            
            const dispo = 'Disponible';
            this.changeDispo(cedula,dispo);

        }else{
            this.setState({imgB: ImgNoService});
            this.setState({dispo: 'Ocupado'});

            const dispo = 'Ocupado';
            this.changeDispo(cedula,dispo);
        }        
    }

    handleClickExit(event){
        const cedula = this.state.cedula;
        const placa = this.state.placa;
        const dispo = 'Ocupado';

        if(placa === ''){
            this.changeDispo(cedula,dispo);
            this.props.history.push({pathname:'/'});
        }else{
            axios.delete(`http://localhost:3500/Driver/Exit/${placa}-${cedula}-${dispo}`)
            .then(res => {
                this.props.history.push({pathname:'/'});
            })
            .catch( err => console.log('Error: ', err))
        }
        
    }

    render(){
        const imgB = this.state.imgB;
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
                        <Button compact style={styleButton} onClick={this.handleClickDispo}>
                            <Image src={imgB} />                            
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
                        <Button compact style={styleButton} onClick={this.handleClickMiTaxi}>
                            <Image src={ImgMiTaxi} />                            
                        </Button>
                    </Grid.Row>                    
                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClickExit}>
                            <Image src={ImgExit} />                            
                        </Button>
                    </Grid.Row>               
                </Grid.Column>             
            </Grid>
        );
    }
}

export default withRouter(MainCondu);