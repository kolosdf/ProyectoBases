import React from 'react';
import { Grid,Button, Icon,Form,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import imagen from './../images/mainRightImg.png';

const style = {
    margin: '0.5em',
    paddingLeft: 0,
    listStyle: 'none',
    backgroundColor: '#FFCC00'
  };


class MainLoginC extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cedula: '',
            contra: '',
        };

        this.handleChangeCedula = this.handleChangeCedula.bind(this)       
        this.handleChangeContra = this.handleChangeContra.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCedula(event){
        this.setState({cedula: event.target.value});
    }

    handleChangeContra(event){
        this.setState({contra: event.target.value});
    }

    handleClick(){
        var userCedula = this.state.cedula;
        if(userCedula === "") userCedula = 'vacio';

        var userPass = this.state.contra;
        if(userPass === "") userPass = 'vacio';

        axios.get(`http://localhost:3500/Driver/${userCedula}-${userPass}`)
        .then(res => {
            const userValid = res.data;
            console.log(userValid);
            if(userValid){
                this.props.history.push({pathname:'/Driver/Main', state:{cedula:this.state.cedula, placa:''}});
            }else{
                alert('Datos Incorrectos');
            }

        })
        .catch( err => console.log('Error: ', err))
    }

    render(){
        const cedula = this.state.cedula;
        const contra = this.state.contra;

        return(
            <Grid columns={2}  relaxed='very' style={style}> 
                <Grid.Column>
                    <Form widths='equal'>
                        <Form.Input icon='id card' iconPosition='left' label='Cedula' placeholder='Cedula'
                                    value={cedula} onChange={this.handleChangeCedula} required/>
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type='password' placeholder='Contraseña'
                                    value={contra} onChange={this.handleChangeContra} required/>

                        <Button animated onClick={this.handleClick} >
                            <Button.Content visible>Ingresar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>                       

                        <Button href='/SignIn/Driver' content='Registrase' icon='signup'/>

                        <Button href='/' animated='fade'>
                            <Button.Content visible>
                                <Icon name='arrow left' />
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow left' />
                            </Button.Content>
                        </Button>
                    </Form>
                </Grid.Column>

                <Grid.Column>
                    <Image src={imagen} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(MainLoginC)