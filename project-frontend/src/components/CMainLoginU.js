import React from 'react';
import { Grid,Button, Icon,Form,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import imagen from './../images/mainRightImg.png';
import axios from 'axios';
import { isString } from 'util';
import ImgUserTag from './../images/UserTag.png';

const style = {
    margin: '0.5em',
    paddingLeft: 0,
    listStyle: 'none',
    backgroundColor: '#FFCC00'
  };


class MainLoginU extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cel: '',
            contra: ''
        };

        this.handleChangeCel = this.handleChangeCel.bind(this)        
        this.handleChangeContra = this.handleChangeContra.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCel(event){
        this.setState({cel: event.target.value});
    }

    handleChangeContra(event){
        this.setState({contra: event.target.value});
    }

    handleClick(){
        var userCel = this.state.cel;
        var userPass = this.state.contra;

        axios.get(`http://localhost:3500/User/${userCel}-${userPass}`)
        .then(res => {
            const userValid = res.data;
            console.log(userValid);
            if(isString(userValid)){
                alert('Valor invalido para numero de celular');
            }else if(userValid){
                this.props.history.push({pathname:'/User/Main', state:{cel:this.state.cel}});
            }else{
                alert('Datos Incorrectos');
            }

        })
        .catch( err => console.log('Error: ', err))
    }

    render(){
        const cel = this.state.cel;
        const contra = this.state.contra;

        return(
            <Grid columns={2}  relaxed='very' style={style}> 
                <Grid.Column>
                    <Image src={ImgUserTag} />
                    <Form widths='equal'>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                                    value={cel} onChange={this.handleChangeCel} required/>
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type='password' placeholder='Contraseña'
                                    value={contra} onChange={this.handleChangeContra} required/>

                        <Button animated onClick={this.handleClick} >
                            <Button.Content visible>Ingresar</Button.Content>
                            <Button.Content hidden >
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                        
                        <Button href='/SignIn/User' content='Registrase' icon='signup'/>
                        
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

export default withRouter(MainLoginU)