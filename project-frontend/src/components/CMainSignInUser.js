import React from 'react';
import { Grid,Button,Image,Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgUserTag from './../images/UserTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgRegistroUser from './../images/RegistroUserICON.png';
import ImgAtras from './../images/AtrasICON.png';
import axios from 'axios'

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

function getMonthFromString(mon){

    var d = Date.parse(mon + "1, 2012");
    if(!isNaN(d)){
       return new Date(d).getMonth() + 1;
    }
    return -1;
}

const opcionesTipoT = [
    { key: 'v', text: 'Visa', value: 'Visa' },
    { key: 'm', text: 'Mastercard', value: 'Mastercard' },
]


class SignInUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {            
            cel: '',
            nombre:'',
            apellido: '',
            dirResidencia: '',
            contrasena: '',
            tipoT: '',
            diaVencT: '',
            mesVencT: '',
            anoVencT: '',
            numeroT: '',
            numSeguridadT: '',            
        };

        this.handleChangeCel = this.handleChangeCel.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeDirResid = this.handleChangeDirResid.bind(this);
        this.handleChangeContra = this.handleChangeContra.bind(this);
        this.handleChangeTipoT = this.handleChangeTipoT.bind(this);

        this.handleChangeFecha = this.handleChangeFecha.bind(this);

        this.handleChangeNumeroT = this.handleChangeNumeroT.bind(this);
        this.handleChangeNumeroSegT = this.handleChangeNumeroSegT.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeCel(event){ this.setState({cel: event.target.value}); }
    handleChangeNombre(event){ this.setState({nombre: event.target.value}) }
    handleChangeApellido(event){ this.setState({apellido: event.target.value}) }
    handleChangeDirResid(event){ this.setState({dirResidencia: event.target.value}) }
    handleChangeContra(event){ this.setState({contrasena: event.target.value}) }

    handleChangeTipoT(event, { name, value }){
        this.setState({tipoT: value});       
    }

    handleChangeFecha(event){
        if(event!=null){
            const str1 = event.toString().split(" ");
            const dia = str1[2];
            const mes = getMonthFromString(str1[1]);
            const ano = str1[3];            
            this.setState({diaVencT: dia});
            this.setState({mesVencT: mes});
            this.setState({anoVencT: ano});
        }else{
            this.setState({diaVencT: ''});
            this.setState({mesVencT: ''});
            this.setState({anoVencT: ''});
        }
    }

    handleChangeNumeroT(event){ this.setState({numeroT: event.target.value}) }
    handleChangeNumeroSegT(event){ this.setState({numSeguridadT: event.target.value}) }

    handleClick(){
        var contra = this.state.contrasena;
        var contraInvalida = (contra.length<5);

        if(contraInvalida){
            alert('Contraseña invalida, la contraseña debe se de minimo 5 digitos')
        }else{
            var str1 = "Campos Vacios:\n";

            var cel = this.state.cel;
            if(cel === ""){ str1 = str1+"Número de Celular\n";}
            var nombre = this.state.nombre;
            if(nombre === ""){ str1 = str1+"Nombre\n";}
            var apellido = this.state.apellido;   
            if(apellido === ""){ str1 = str1+"Apellido\n";} 
            var dirResidencia = this.state.dirResidencia;
            if(dirResidencia === ""){ str1 = str1+"Dirección de Residencia\n";}
            var tipoT = this.state.tipoT;
            if(tipoT === ""){ str1 = str1+"Tarjeta\n";}

            var diaVencT = this.state.diaVencT;
            var mesVencT = this.state.mesVencT;
            var anoVencT = this.state.anoVencT;
            if((diaVencT === "") || (mesVencT === "") || (anoVencT === "")){           
                str1 = str1+"Fecha de Vencimiento de tarjeta\n";
            }

            var numeroT = this.state.numeroT;
            if(numeroT === ""){ str1 = str1+"Numero de Tarjeta\n";}
            var numSeguridadT = this.state.numSeguridadT;
            if(numSeguridadT === ""){ str1 = str1+"Numero de Seguridad de Tarjeta\n";}

            if((cel === "") || (nombre === "") | (apellido === "") || (dirResidencia === "") || (contra === "") ||
            (tipoT === "")  || (diaVencT === "") || (numeroT === "") || (numSeguridadT === "")){
                alert(str1);
            }else{
                axios.post(`http://localhost:3500/SignIn/User/${cel}-${nombre}-${apellido}-${dirResidencia}-${contra}-${tipoT}-${diaVencT}-${mesVencT}-${anoVencT}-${numeroT}-${numSeguridadT}`)
                .then(res => {
                    const mensaje = res.data;
                    console.log(mensaje);
                    if(mensaje === '422'){
                        alert('Campos Invalidos')
                    }else if(mensaje === 'Usuario Creado'){
                        this.props.history.push({pathname:'/User'});
                    }else{
                        alert('El numero de celular ya está registrado');
                    }

                })
                .catch( err => console.log('Error: ', err))
            }
        }
    }

    render(){
        const cel = this.state.cel;
        const nombre = this.state.nombre;
        const apellido = this.state.apellido;
        const dirResidencia = this.state.dirResidencia;
        const contra = this.state.contra;        
        const tipoT = this.state.tipoT;
        const fechaV = this.state.fechaV;
        const numeroT = this.state.numeroT;
        const numSeguridadT = this.state.numSeguridadT;

        return(
            <Grid centered columns={2}  relaxed='very' style={style}> 
                <Grid.Row>                    
                    <Grid.Column floated='left'>
                        <Image src={ImgUserTag} />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Image src={ImgLogo} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column>
                    <Form widths = 'equal'>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                            value={cel} onChange={this.handleChangeCel} required/>

                        <Form.Group>
                            <Form.Input icon='user' iconPosition='left' label='Nombre' placeholder='Nombre'
                                value={nombre} onChange={this.handleChangeNombre} required/>
                            <Form.Input icon='user outline' iconPosition='left' label='Apellido' placeholder='Apellido'
                                value={apellido} onChange={this.handleChangeApellido} required/>
                        </ Form.Group>

                        <Form.Input icon='home' iconPosition='left' label='Dirección' placeholder='Dirección'
                            value={dirResidencia} onChange={this.handleChangeDirResid} required/>                        
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type = "password" placeholder='Contraseña'
                            value={contra} onChange={this.handleChangeContra} required/>  

                        <Form.Select fluid label='Tarjeta' options={opcionesTipoT} placeholder='Seleccione' 
                            name='tipoT' value={tipoT} onChange={this.handleChangeTipoT} required/>

                        <SemanticDatepicker label='Fecha Vencimiento Tarjeta' icon='calendar alternate' locale={ptLocale}
                            value={fechaV} onDateChange={this.handleChangeFecha} required/>
                        
                        <Form.Group>
                            <Form.Input icon='credit card' iconPosition='left' label='Numero Tarjeta' placeholder='Numero Tarjeta'
                                value={numeroT} onChange={this.handleChangeNumeroT} required/>                        
                            <Form.Input icon='credit card outline' iconPosition='left' label='Numero de Seguridad Tarjeta' type = "password" placeholder='Numero de seguridad'
                                value={numSeguridadT} onChange={this.handleChangeNumeroSegT} required/>  
                        </Form.Group>                        
                    </Form>    
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row>
                        <Button compact style={styleButton} onClick={this.handleClick} >
                            <Image src={ImgRegistroUser} />
                        </Button>
                    </Grid.Row>

                    <Grid.Row>
                        <Button href='/User' compact style={styleButton}>
                            <Image src={ImgAtras} />                            
                        </Button>
                    </Grid.Row>
                </Grid.Column>                
            </Grid>
        );
    }
}

export default withRouter(SignInUser);