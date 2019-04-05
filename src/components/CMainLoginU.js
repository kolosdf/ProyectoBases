import React from 'react';
import { Grid,Button, Icon,Form,Image } from 'semantic-ui-react'
//import { Router, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import imagen from './../images/mainRightImg.png';

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
        alert('Cel:'+this.state.cel+'\nContra: '+this.state.contra);
    }

    render(){
        const cel = this.state.cel;
        const contra = this.state.contra;

        return(
            <Grid columns={2}  relaxed='very' style={style}> 
                <Grid.Column>
                    <Form widths='equal'>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                                    value={cel} onChange={this.handleChangeCel}/>
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type='password' placeholder='Contraseña'
                                    value={contra} onChange={this.handleChangeContra}/>

                        <Button href='/User/Main' animated onClick={this.handleClick} >
                            <Button.Content visible>Ingresar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                        
                        <Button href='/SignIn/User' animated onClick={this.handleClick} >
                            <Button.Content visible>Registrarse</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
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