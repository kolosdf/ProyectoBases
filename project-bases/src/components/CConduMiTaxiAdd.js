import React from 'react';
import { Grid,Button,Image, Form, Icon} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgAtras from './../images/AtrasICON.png';
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
    { key: 'P', text: 'Pequeño', value: 'Pequeno' },
    { key: 'M', text: 'Mediano', value: 'Mediano' },
    { key: 'G', text: 'Grande', value: 'Grande' },
]


class ConduMiTaxiAdd extends React.Component{
    constructor(props){
        super(props);
        
        try{
            this.state = {
                cedula: this.props.location.state.cedula,
                placaActual: this.props.location.state.placa,
                placa: '',
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
                placaActual: '',
                placa: '',
                marca: '',
                modelo: '',
                ano: '',
                baul: '',
                soat: '',
            };
        }

        this.handleChangePlaca = this.handleChangePlaca.bind(this);
        this.handleChangeMarca = this.handleChangeMarca.bind(this);
        this.handleChangeModelo = this.handleChangeModelo.bind(this);
        this.handleChangeAno = this.handleChangeAno.bind(this);
        this.handleChangeBaul = this.handleChangeBaul.bind(this);
        this.handleChangeSoat = this.handleChangeSoat.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickAtras = this.handleClickAtras.bind(this);
    }

    handleChangePlaca(event){ this.setState({placa: event.target.value}); }
    handleChangeMarca(event){ this.setState({marca: event.target.value}); }
    handleChangeModelo(event){ this.setState({modelo: event.target.value}); }
        
    handleChangeAno(event, { name, value }){
        this.setState({ano: value});
    }

    handleChangeBaul(event, { name, value }){
        this.setState({baul: value});
    }
    handleChangeSoat(event){ this.setState({soat: event.target.value}); }

    handleClickAtras(event){
        this.props.history.push({pathname:'/Driver/Main/MiTaxi', state:{cedula:this.state.cedula, placa:this.state.placaActual}});
    }

    handleClick(){
        var str1 = "Campos Vacios:\n";

        var placa = this.state.placa;
        if(placa === ""){ placa='vacio'; str1 = str1+"Placa\n";}
        var marca = this.state.marca;
        if(marca === ""){ str1 = str1+"Marca\n";}
        var modelo = this.state.modelo;
        if(modelo === ""){ str1 = str1+"Modelo\n";}
        var ano = this.state.ano;
        if(ano === ""){ str1 = str1+"Año\n";}
        var baul = this.state.baul;
        if(baul === ""){ str1 = str1+"Baul\n";}
        var soat = this.state.soat;
        if(soat === ""){ str1 = str1+"Soat\n";}        

        if((placa === "vacio") || (marca === "") || (modelo === "") || 
           (ano === "") || (baul === "") || (soat === "")){
            alert(str1);
        }else{
            axios.post(`http://localhost:3500/Driver/Main/MiTaxi/AddTaxi/${placa}-${marca}-${modelo}-${ano}-${baul}-${soat}`)
            .then(res => {
                const mensaje = res.data;
                console.log(mensaje);
                alert(mensaje)

                if(mensaje === 'Taxi Creado'){
                    this.setState({placa: ''});
                    this.setState({marca: ''});
                    this.setState({modelo: ''});
                    this.setState({soat: ''});
                }

            })
            .catch( err => console.log('Error: ', err))
        }
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
                        <Form.Input icon='taxi' iconPosition='left' label='Placa'  placeholder='Placa'
                            value={placa} onChange={this.handleChangePlaca} required/>
                        <Form.Input icon='dashboard' iconPosition='left' label='Marca' placeholder='Marca'
                            value={marca} onChange={this.handleChangeMarca} required/>
                        <Form.Input icon='browser' iconPosition='left' label='Modelo' placeholder='Modelo'
                            value={modelo} onChange={this.handleChangeModelo} required/>

                        <Form.Select fluid label='Año' options={opcionesAno} placeholder='Año' 
                            name='ano' value={ano} onChange={this.handleChangeAno} required/>
                        <Form.Select fluid label='Tamaño Baul' options={opcionesBaul} placeholder='Tamaño' 
                            name='baul' value={baul} onChange={this.handleChangeBaul} required/>
                        <Form.Input icon='id card' iconPosition='left' label='Soat' placeholder='Soat'
                            value={soat} onChange={this.handleChangeSoat} required/>

                        <Button animated='fade' onClick={this.handleClick} >
                            <Button.Content visible>Agregar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='plus' />
                            </Button.Content>
                        </Button>
                        <Form.Group></Form.Group>
                    </Form>    
                </Grid.Column>
                <Grid.Column>
                    <Button compact style={styleButton} onClick={this.handleClickAtras}>
                        <Image src={ImgAtras} />                            
                    </Button>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(ConduMiTaxiAdd);