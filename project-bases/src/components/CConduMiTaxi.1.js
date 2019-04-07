import React from 'react';
import { Grid,Button,Image, Form} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgRegistroDriver from './../images/RegistroDrivers.png';
import ImgSalirSquare from './../images/SalirSquareICON.png';
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

const opcionesAno = [
    { key: '99', text: '1999', value: '1999' }, { key: '00', text: '2000', value: '2000' },
    { key: '01', text: '2001', value: '2001' }, { key: '02', text: '2002', value: '2002' },
    { key: '03', text: '2003', value: '2003' }, { key: '04', text: '2004', value: '2004' },
    { key: '05', text: '2005', value: '2005' }, { key: '06', text: '2006', value: '2006' },
    { key: '07', text: '2007', value: '2007' }, { key: '08', text: '2008', value: '2008' },
    { key: '09', text: '2009', value: '2009' }, { key: '10', text: '2010', value: '2010' },
    { key: '11', text: '2011', value: '2011' }, { key: '12', text: '2012', value: '2012' },
    { key: '13', text: '2013', value: '2013' }, { key: '14', text: '2014', value: '2014' },
    { key: '15', text: '2015', value: '2015' }, { key: '16', text: '2016', value: '2016' },
    { key: '17', text: '2017', value: '2017' }, { key: '18', text: '2018', value: '2018' },
    { key: '19', text: '2019', value: '2019' },
]

const opcionesBaul = [
    { key: 'P', text: 'Pequeño', value: 'Pequeño' },
    { key: 'M', text: 'Mediano', value: 'Mediano' },
    { key: 'G', text: 'Grande', value: 'Grande' },
]


class ConduMiTaxi extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cedula: this.props.location.state.cedula,        
            placa: '',
            marca: '',
            modelo: '',
            ano: '',
            baul: '',
            soat: '',
        };

        this.handleChangePlaca = this.handleChangeCedula.bind(this);
        this.handleChangeCel = this.handleChangeCel.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeContra = this.handleChangeContra.bind(this);
        this.handleChangeFechaNac = this.handleChangeFechaNac.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCedula(event){ this.setState({cedula: event.target.value}); }
    handleChangeCel(event){ this.setState({numCel: event.target.value}); }
    handleChangeNombre(event){ this.setState({nombre: event.target.value}); }
        
    handleChangeGenero(event, { name, value }){
        this.setState({genero: value});
    }

    handleChangeDir(event){ this.setState({direccion: event.target.value}); }
    handleChangeEmail(event){ this.setState({email: event.target.value}); }

    handleClick(){
        var str1 = "Campos Vacios:\n";
        var str2 = "";

        var cedula = this.state.cedula;
        if(cedula === ""){ cedula = 'vacio'; str1 = str1+"Cedula\n";}
        var numCel = this.state.numCel;
        if(numCel === ""){ numCel = 'vacio'; str1 = str1+"Número de Celular\n";}
        var nombre = this.state.nombre;
        if(nombre === ""){ nombre = 'vacio'; str1 = str1+"Nombre\n";}
        var apellido = this.state.apellido;   
        if(apellido === ""){ apellido = 'vacio'; str1 = str1+"Apellido\n";}     
        var contra = this.state.contra;
        if(contra === ""){ contra = 'vacio'; str1 = str1+"Contraseña\n";}
        var direccion = this.state.direccion;
        if(direccion === ""){ direccion = 'vacio'; str1 = str1+"Dirección\n";}        

        if((cedula === "vacio") || (numCel === "vacio") || (nombre === "vacio") || (apellido === "vacio") || (contra === "vacio") ||
           (diaNac === "vacio")){
            alert(str1);
        }else if((modoPago === "Debito") && ((numeroC === "vacio") || (banco === "vacio"))){
            alert(str2)
        }else{
            if(modoPago === "Efectivo"){
                numeroC = null;
                banco = null;
            }

            axios.post(`http://localhost:3500/SignIn/Driver/${cedula}-${numCel}-${nombre}-${apellido}-${contra}-${diaNac}-${mesNac}-${anoNac}-${direccion}-${email}-${genero}-${modoPago}-${numeroC}-${banco}`)
            .then(res => {
                const mensaje = res.data;
                console.log(mensaje);
                if(mensaje === 'Usuario Creado'){
                    this.props.history.push({pathname:'/Driver'});
                }else{
                    alert('La cedula ya está registrada');
                }

            })
            .catch( err => console.log('Error: ', err))
        }
    }

    render(){
        const cedula = this.state.cedula;
        const numCel = this.state.numCel;
        const nombre = this.state.nombre;
        const apellido = this.state.apellido;        
        const contra = this.state.contra;
        const fechaNac = this.state.fechaNac;

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
                        <Form.Input icon='id card' iconPosition='left' label='Cedula'  placeholder='Cedula'
                            value={cedula} onChange={this.handleChangeCedula}/>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                            value={numCel} onChange={this.handleChangeCel}/>
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type = "password" placeholder='Contraseña'
                            value={contra} onChange={this.handleChangeContra}/>                        

                        <Form.Select fluid label='Genero' options={opcionesGenero} placeholder='Genero' 
                            name='genero' value={genero} onChange={this.handleChangeGenero}/>
                        <Form.Input icon='home' iconPosition='left' label='Dirección' placeholder='Dirección'
                            value={direccion} onChange={this.handleChangeDir}/>
                        <Form.Input icon='mail' iconPosition='left' label='Email' placeholder='Email'
                            value={email} onChange={this.handleChangeEmail}/>                      
                    </Form>    
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClick} >
                            <Image src={ImgRegistroDriver} />
                        </Button>
                    </Grid.Row>

                    <Grid.Row>
                        <Button href='/Driver' compact style={styleButton}>
                            <Image src={ImgSalirSquare} />                            
                        </Button>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(ConduMiTaxi);