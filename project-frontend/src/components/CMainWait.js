import React from 'react';
import { Grid,Button,Image, GridRow } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
//import ImgDispo from './../images/TaxiDisponibleICON.png';
//import ImgService from './../images/TaxiServicioICON.png';
import ImgTag from './../images/3TaxiTag.png';
import ImgLogo from './../images/logoYellow.png';
import ImgWait from './../images/esperandoTaxiICON.png';

const style = {
    margin: '0.5em',
    paddingLeft: 0,    
    listStyle: 'none',
    backgroundColor: '#FFCC00'
};

class MWait extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Grid centered columns={2}  relaxed='very' style={style}>
                <Grid.Row>
                    <Grid.Column floated='left'>
                        <Image src={ImgLogo} />
                    </Grid.Column>

                    <Grid.Column floated='right'>
                        <Image src={ImgTag} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Image src={ImgWait} />
                </Grid.Row>
            </Grid>
        );
    }
}

export default withRouter(MWait);