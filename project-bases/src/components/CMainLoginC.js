import React from 'react';
import { Grid,Button, Icon,Form,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
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
            cel: '',
            contra: '',
            placa: ''
        };

        this.handleChangeCel = this.handleChangeCel.bind(this)
        this.handleChangePlaca = this.handleChangePlaca.bind(this)        
        this.handleChangeContra = this.handleChangeContra.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeCel(event){
        this.setState({cel: event.target.value});
    }

    handleChangePlaca(event){
        this.setState({placa: event.target.value});
    }

    handleChangeContra(event){
        this.setState({contra: event.target.value});
    }

    handleClick(){
        alert('Cel:'+this.state.cel+'\nContra: '+this.state.contra + '\nPlaca:'+this.state.placa);

    }

    render(){
        const cel = this.state.cel;
        const contra = this.state.contra;
        const placa = this.state.placa;

        return(
            <Grid columns={2}  relaxed='very' style={style}> 
                <Grid.Column>
                    <Form widths='equal'>
                        <Form.Input icon='phone' iconPosition='left' label='Celular' placeholder='Celular'
                                    value={cel} onChange={this.handleChangeCel}/>
                        <Form.Input icon='taxi' iconPosition='left' label='Placa' placeholder='Placa'
                                    value={placa} onChange={this.handleChangePlaca}/>
                        <Form.Input icon='lock' iconPosition='left' label='Contraseña' type='password' placeholder='Contraseña'
                                    value={contra} onChange={this.handleChangeContra}/>

                        <Button href='/Driver/Main' animated onClick={this.handleClick} >
                            <Button.Content visible>Ingresar</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>                       

                        <Button href='/SignIn/Driver' content='Registrase' icon='signup'/>
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