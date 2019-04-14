import React from 'react';
import { Grid,Button,Image, Label, Rating} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import QTag from './../images/rateTag.png';
import ImgBack from './../images/back.png';
import ImgAceptar from './../images/aceptar.png';
import ImgCancelar from './../images/cancel.png';

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

//Combobox con puntos de origen del usuario
const options = ['No seleccionado' , 'Poner lugares del usuario']
const defaultOption = options[0]

class MainQualify extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Grid centered columns={3}  relaxed='very' style={style}> 
                <Grid.Row>                    
                    <Grid.Column floated='right'>
                        <Image src={ImgBack} />
                    </Grid.Column>

                    <Grid.Column floated='left'>
                        <Image src={QTag} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Rating size='massive' maxRating={5} clearable />
                </Grid.Row>

               <Grid.Row>
                    <Button compact style={styleButton}>
                        <Image src={ImgAceptar} />                            
                    </Button>

                    <Button compact style={styleButton}>
                        <Image src={ImgCancelar} />                            
                    </Button>
                </Grid.Row>
            </Grid>
        );
    }
}

export default withRouter(MainQualify);