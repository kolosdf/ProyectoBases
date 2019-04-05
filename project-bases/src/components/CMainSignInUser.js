import React from 'react';
import { Grid,Button,Image, Icon,Form, GridColumn } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgUserTag from './../images/UserTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgRegistroUser from './../images/RegistroUserICON1.png';

const style = {
    margin: '0.5em',
    paddingLeft: 0,    
    listStyle: 'none',
    backgroundColor: '#FFCC00'
};



class MainSignInUser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            nombre:'',
            cel: '',
            medioPago:'',
            tarjeta: '',
            banco:''
        };

        this.handleChangeNombre = this.handleChangeNombre.bind(this)
        this.handleChangeBanco = this.handleChangeBanco.bind(this)
        this.handleChangeCel = this.handleChangeCel.bind(this)    
        this.handleChangeTarjeta = this.handleChangeTarjeta.bind(this)    
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeNombre(event){
        this.setState({nombre: event.target.value})
    }

    handleChangeCel(event){
        this.setState({cel: event.target.value});
    }

    handleChangeMedioPago(event){
        this.setState({medioPago: event.target.value});
    }

    handleChangeTarjeta(event){
        this.setState({tarjeta: event.target.value});
    }

    handleChangeBanco(event){
        this.setState({banco: event.target.value})
    }

    handleClick(){
        alert('Nombre:'+this.state.nombre+'\nCel:'+this.state.cel+'\nTarjeta: '+this.state.tarjeta+'\nBanco:'+this.state.banco+'\nMedio de pago:'+this.state.medioPago);
    }

    render(){

        const nombre = this.state.nombre
        const cel = this.state.cel;
        const banco = this.state.banco;
        const tarjeta = this.state.tarjeta;
        const medioPago = this.state.medioPago;

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
                        <Form.Input icon='user' iconPosition='left' label='Nombre' placeholder='Nombre'
                                    value={nombre} onChange={this.handleChangeNombre}/>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                                    value={cel} onChange={this.handleChangeCel}/>
                        <Form.Input icon='money' iconPosition='left' label='Medio de pago' placeholder='Medio De Pago'
                                    value={medioPago} onChange={this.handleChangeMedioPago}/>
                        <Form.Input icon='square' iconPosition='left' label='Tarjeta'  placeholder='Numero tarjeta'
                                    value={tarjeta} onChange={this.handleChangeTarjeta}/>
                        <Form.Input icon='dollar' iconPosition='left' label='Banco'  placeholder='Banco'
                                    value={banco} onChange={this.handleChangeBanco}/>            

                    </Form>    
                        </Grid.Column>
                        <Grid.Column>  
                        <Button href='/User/Main' animated onClick={this.handleClick} >
                            <Image src={ImgRegistroUser} />
                        </Button>
                        </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(MainSignInUser);