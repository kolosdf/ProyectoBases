import React from 'react';
import { Grid,Button,Image, Form} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgAddTaxi from './../images/AddB.png';
import ImgMap from './../images/MapB.png';
import ImgAtras from './../images/AtrasICON.png';
import axios from 'axios';
import { isNullOrUndefined } from 'util';


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


class ConduMiTaxi extends React.Component{
    constructor(props){
        super(props);

        try{
            this.state = {
                cedula: this.props.location.state.cedula,
                placa: this.props.location.state.placa,
                coordenadaX: this.props.location.state.coordeadaX,
                coordenadaY: this.props.location.state.coordeadaY,
                marca: '',
                modelo: '',
                ano: '',
                baul: '',
                soat: '',
            };
        }catch(err){
            this.props.history.push({pathname:'/'});
            this.state = {
                cedula: '',
                placa: '',
                coordenadaX: '',
                coordenadaY: '',
                marca: '',
                modelo: '',
                ano: '',
                baul: '',
                soat: '',
            };
        }

        this.handleChangePlaca= this.handleChangePlaca.bind(this);
        this.fillInputs = this.fillInputs.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickAtras = this.handleClickAtras.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickMap = this.handleClickMap.bind(this);

        if(!(this.state.placa === '')){
            this.fillInputs();
        }
    }

    handleChangePlaca(event){ this.setState({placa: event.target.value}); } 
    
    handleClickAtras(event){
        this.props.history.push({pathname:'/Driver/Main', state:{cedula:this.state.cedula, placa:this.state.placa, coordenadaX:this.state.coordenadaX, coordenadaY:this.state.coordenadaY}});
    }

    handleClickMap(event){
        this.props.history.push({pathname:'/Driver/Main/MiTaxi/Map', state:{cedula:this.state.cedula, placa:this.state.placa, coordenadaX:this.state.coordenadaX, coordenadaY:this.state.coordenadaY}});
    }

    fillInputs(){
        const cedula = this.state.cedula;
        const placa = this.state.placa;
        const assing = false;
    
        axios.get(`http://localhost:3500/Driver/Main/MiTaxi/${placa}-${cedula}-${assing}`)
        .then(res => {
            const respuesta = res.data;
            console.log(respuesta);
    
            if(isNullOrUndefined(respuesta)){
                alert('La placa no está registrada en el sistema');
            }else if(respuesta === "Taxi no disponible"){
                alert(respuesta);
            }else{
                this.setState({marca: respuesta.marca});
                this.setState({modelo: respuesta.modelo});
                this.setState({ano: respuesta.ano});
                this.setState({baul: respuesta.baul});
                this.setState({soat: respuesta.soat});
            }
        })
        .catch( err => console.log('Error: ', err))
    }

    handleClick(){
        const cedula = this.state.cedula;
        const placa = this.state.placa;
        const assing = true;

        if(placa === ""){
            alert('Escriba el numero de la placa')
        }else{
            axios.get(`http://localhost:3500/Driver/Main/MiTaxi-Disp/${placa}-${cedula}`)
            .then(res => {
                const respuesta = res.data;

                if(respuesta === 'True'){
                    axios.get(`http://localhost:3500/Driver/Main/MiTaxi/${placa}-${cedula}-${assing}`)
                    .then(res => {
                        const respuesta = res.data;
                        console.log(respuesta);

                        if(isNullOrUndefined(respuesta)){
                            alert('La placa no está registrada en el sistema');
                        }else if(respuesta === "Taxi no disponible"){
                            alert(respuesta);
                        }else{
                            this.setState({marca: respuesta.marca});
                            this.setState({modelo: respuesta.modelo});
                            this.setState({ano: respuesta.ano});
                            this.setState({baul: respuesta.baul});
                            this.setState({soat: respuesta.soat});
                        }
                    })
                    .catch( err => console.log('Error: ', err))
                }else{
                    alert(respuesta);
                }
            })
            .catch( err => console.log('Error: ', err))            
        }        
    }

    handleClickAdd(){
        this.props.history.push({pathname:'/Driver/Main/MiTaxi/AddTaxi', state:{cedula:this.state.cedula, placa:this.state.placa, coordenadaX:this.state.coordenadaX, coordenadaY:this.state.coordenadaY}});
    }

    render(){
        const placa = this.state.placa;
        const marca = this.state.marca;
        const modelo = this.state.modelo;
        const ano = this.state.ano;
        const baul = this.state.baul;
        const soat = this.state.soat;

        return(
            <Grid centered columns={2}  relaxed='very' style={style}> 
                <Grid.Row>                    
                    <Grid.Column floated='left'>
                        <Image src={ImgConduTag} />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Image src={ImgLogo} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column>
                    <Form widths = 'equal'>
                        <Form.Group>
                            <Form.Input icon='taxi' iconPosition='left' label='Placa'  placeholder='Placa'
                                value={placa} onChange={this.handleChangePlaca} required/>

                                <Button content='Seleccionar' onClick={this.handleClick}/>
                        </Form.Group>

                        <Form.Input icon='dashboard' iconPosition='left' label='Marca' placeholder='Marca' value={marca} readOnly/>
                        <Form.Input icon='browser' iconPosition='left' label='Modelo' placeholder='Modelo' value={modelo} readOnly/>
                        <Form.Input icon='calendar alternate outline' iconPosition='left' label='Año' placeholder='Año' value={ano} readOnly/>
                        <Form.Input icon='archive' iconPosition='left' label='Baul' placeholder='Baul' value={baul} readOnly/>
                        <Form.Input icon='id card' iconPosition='left' label='Soat' placeholder='Soat' value={soat} readOnly/>
                        <Form.Group></Form.Group>
                    </Form>    
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClickAdd}>
                            <Image src={ImgAddTaxi} />
                        </Button>
                    </Grid.Row>

                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClickMap}>
                            <Image src={ImgMap} />
                        </Button>
                    </Grid.Row>

                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClickAtras}>
                            <Image src={ImgAtras} />                            
                        </Button>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(ConduMiTaxi);