import React from 'react';
import { Grid,Button,Image, Label, Rating} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import TaxiTag from './../images/3TaxiTag.png';
import ImgRespuesta from './../images/esperandoRespuestaICON.png';

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
const options = ['No selected' , 'poner lugares del usuario']
const defaultOption = options[0]

class MainQualify extends React.Component{
    constructor(){
        super();

 }

    render(){
        return(
            <Grid centered columns={3}  relaxed='very' style={style}> 
                <Grid.Row>                    
                    <Grid.Column floated='left'>
                        <Image src={TaxiTag} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Image src={ImgRespuesta}/>
                    </Grid.Row>

            </Grid>
        );
    }
}

export default withRouter(MainQualify);