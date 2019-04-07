import React from 'react';
import { Grid,Button,Image, Form} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgRegistroDriver from './../images/RegistroDrivers.png';
import ImgSalirSquare from './../images/SalirSquareICON.png';
import axios from 'axios';

//https://www.npmjs.com/package/react-semantic-ui-datepickers
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import ptLocale from 'react-semantic-ui-datepickers/dist/locales/es-ES';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

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

const opcionesGenero = [
    { key: 'm', text: 'Masculino', value: 'Masculino' },
    { key: 'f', text: 'Femenino', value: 'Femenino' },
]

const opcionesModoPago = [
    { key: 'e', text: 'Efectivo', value: 'Efectivo' },
    { key: 'd', text: 'Debito', value: 'Debito' },
]

function getMonthFromString(mon){

    var d = Date.parse(mon + "1, 2012");
    if(!isNaN(d)){
       return new Date(d).getMonth() + 1;
    }
    return -1;
}

class SignInDriver extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cedula: '',
            numCel: '',
            nombre: '',
            apellido: '',
            contra: '',
            diaNac: '',
            mesNac: '',
            anoNac: '',
            direccion: '',
            email: '',
            genero: '',
            modoPago: '',            
            numeroC: '',
            banco: '',
        };

        this.handleChangeCedula = this.handleChangeCedula.bind(this);
        this.handleChangeCel = this.handleChangeCel.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeContra = this.handleChangeContra.bind(this);
        this.handleChangeFechaNac = this.handleChangeFechaNac.bind(this);
        this.handleChangeDir = this.handleChangeDir.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeGenero = this.handleChangeGenero.bind(this);
        this.handleChangeModoP = this.handleChangeModoP.bind(this);
        this.handleChangeNumC = this.handleChangeNumC.bind(this);
        this.handleChangeBanco = this.handleChangeBanco.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCedula(event){ this.setState({cedula: event.target.value}); }
    handleChangeCel(event){ this.setState({numCel: event.target.value}); }
    handleChangeNombre(event){ this.setState({nombre: event.target.value}); }
    handleChangeApellido(event){ this.setState({apellido: event.target.value}); }
    handleChangeContra(event){ this.setState({contra: event.target.value}); }
    
    handleChangeFechaNac(event){
        if(event!=null){
            const str1 = event.toString().split(" ");
            const dia = str1[2];
            const mes = getMonthFromString(str1[1]);
            const ano = str1[3];            
            this.setState({diaNac: dia});
            this.setState({mesNac: mes});
            this.setState({anoNac: ano});
        }else{
            this.setState({diaNac: ''});
            this.setState({mesNac: ''});
            this.setState({anoNac: ''});
        }
    }

    handleChangeDir(event){ this.setState({direccion: event.target.value}); }
    handleChangeEmail(event){ this.setState({email: event.target.value}); }
    handleChangeGenero(event, { name, value }){
        this.setState({genero: value});
    }
    handleChangeModoP(event, { name, value }){
        this.setState({modoPago: value});       
    }
    handleChangeNumC(event){ this.setState({numeroC: event.target.value}); }
    handleChangeBanco(event){ this.setState({banco: event.target.value}); }

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

        var diaNac = this.state.diaNac;
        var mesNac = this.state.mesNac;
        var anoNac = this.state.anoNac;
        if((diaNac === "") || (mesNac === "") || (anoNac === "")){
            diaNac = 'vacio';
            mesNac = 'vacio';
            anoNac = 'vacio';             
            str1 = str1+"Fecha de Nacimiento\n";
        }

        var direccion = this.state.direccion;
        if(direccion === ""){ direccion = 'vacio'; str1 = str1+"Dirección\n";}
        var email = this.state.email;
        if(email === ""){ email = 'vacio'; str1 = str1+"Email\n";}
        var genero = this.state.genero;
        if(genero === ""){ genero = 'vacio'; str1 = str1+"Genero\n";}
        var modoPago = this.state.modoPago;
        if(modoPago === ""){ modoPago = 'vacio'; str1 = str1+"Modo Pago\n";}
        var numeroC = this.state.numeroC;
        if(numeroC === ""){ numeroC = 'vacio'; str2 = str1+"Numero Cuenta\n";}
        var banco = this.state.banco;
        if(banco === ""){ banco = 'vacio'; str2 = str2+"Banco\n";}

        if((cedula === "vacio") || (numCel === "vacio") || (nombre === "vacio") | (apellido === "vacio") || (contra === "vacio") ||
           (diaNac === "vacio") || (direccion === "vacio") || (email === "vacio") || (genero === "vacio") || (modoPago === "vacio")){
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
        const direccion = this.state.direccion;
        const email = this.state.email;
        const genero = this.state.genero;
        const modoPago = this.state.modoPago;
        const numeroC = this.state.numeroC;
        const banco = this.state.banco;

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

                        <Form.Group>
                            <Form.Input icon='user' iconPosition='left' label='Nombre' placeholder='Nombre'
                                value={nombre} onChange={this.handleChangeNombre}/>
                            <Form.Input icon='user outline' iconPosition='left' label='Apellido' placeholder='Apellido'
                                value={apellido} onChange={this.handleChangeApellido}/>
                        </ Form.Group>
                        
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type = "password" placeholder='Contraseña'
                            value={contra} onChange={this.handleChangeContra}/>

                        <SemanticDatepicker label='Fecha Nacimiento' icon='calendar alternate' locale={ptLocale}
                            value={fechaNac} onDateChange={this.handleChangeFechaNac}/>

                        <Form.Input icon='home' iconPosition='left' label='Dirección' placeholder='Dirección'
                            value={direccion} onChange={this.handleChangeDir}/>
                        <Form.Input icon='mail' iconPosition='left' label='Email' placeholder='Email'
                            value={email} onChange={this.handleChangeEmail}/>

                        <Form.Select fluid label='Genero' options={opcionesGenero} placeholder='Genero' 
                            name='genero' value={genero} onChange={this.handleChangeGenero}/>
                        <Form.Select fluid label='Modo Pago' options={opcionesModoPago} placeholder='Modo Pago' 
                            name='modoP' value={modoPago} onChange={this.handleChangeModoP}/>

                        <Form.Group>
                            <Form.Input icon='payment' iconPosition='left' label='Número Tarjeta' placeholder='Número Tarjeta'
                                value={numeroC} onChange={this.handleChangeNumC}/>
                            <Form.Input icon='building' iconPosition='left' label='Banco' placeholder='Banco'
                                value={banco} onChange={this.handleChangeBanco}/>
                        </Form.Group>                        
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

export default withRouter(SignInDriver);