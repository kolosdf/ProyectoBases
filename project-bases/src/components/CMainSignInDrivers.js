import React from 'react';
import { Grid,Button,Image, Icon,Form, GridColumn } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgConduTag from './../images/ConduTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgRegistroUser from './../images/RegistroDrivers.png';

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
            cedula:'',
            contra:''
        };

        this.handleChangeNombre = this.handleChangeNombre.bind(this)
        this.handleChangeCel = this.handleChangeCel.bind(this)    
        this.handleChangeCedula = this.handleChangeCedula.bind(this)   
        this.handleChangeContra = this.handleChangeContra.bind(this)  
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeNombre(event){
        this.setState({nombre: event.target.value})
    }

    handleChangeCel(event){
        this.setState({cel: event.target.value});
    }

    handleChangeCedula(event){
        this.setState({cedula: event.target.value});
    }

    handleChangeContra(event){
        this.setState({contra: event.target.value});
    }


    handleClick(){
        alert('Nombre:'+this.state.nombre+'\nCel:'+this.state.cel+'\nCedula: '+this.state.cedula);
    }

    render(){

        const nombre = this.state.nombre
        const cel = this.state.cel;
        const cedula = this.state.cedula;
        const contra = this.state.contra;


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
                        <Form.Input icon='user' iconPosition='left' label='Nombre' placeholder='Nombre'
                                    value={nombre} onChange={this.handleChangeNombre}/>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                                    value={cel} onChange={this.handleChangeCel}/>
                        <Form.Input icon='square' iconPosition='left' label='Cedula'  placeholder='Cedula'
                                    value={cedula} onChange={this.handleChangeCedula}/>
                        <Form.Input icon='interrogation' iconPosition='left' label='Contraseña' type = "password" placeholder='Contraseña'
                                    value={contra} onChange={this.handleChangeContra}/>            

                    </Form>    
                        </Grid.Column>
                        <Grid.Column>  
                        <Button href='/Driver/Main' animated onClick={this.handleClick} >
                            <Image src={ImgRegistroUser} />
                        </Button>
                        </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(MainSignInUser);