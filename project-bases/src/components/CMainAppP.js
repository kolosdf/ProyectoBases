import React from 'react';
import { Grid,Button,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import imagen from './../images/mainRightImg.png';
import imageTaxi from './../images/TaxiICON.png';
import imageUser from './../images/UserICON.png'

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

const styleWord = {
    font: 'Open Sans',
    fontstyle: 'oblique'
};

class MainApp extends React.Component{
    constructor(props){
        super(props);

        this.handleClickUser = this.handleClickUser.bind(this)        
        this.handleClickConduct = this.handleClickConduct.bind(this)
    }

    handleClickUser(event){
        alert('Usuario')
    }

    handleClickConduct(event){
        alert('Conductor')
    }

    render(){
        return(
            <Grid centered columns={2}  relaxed='very' style={style}> 
                <Grid.Column stretched>
                    <Grid.Row style={styleWord}>
                        Seleccione una Opción
                    </Grid.Row>
                    <Grid.Row>
                        <Button href='/Driver' compact style={styleButton}>
                            <Image src={imageTaxi} />                            
                        </Button>
                    </Grid.Row>                    
                    <Grid.Row>
                        <Button href='/User' compact style={styleButton}>
                            <Image src={imageUser} />                            
                        </Button>
                    </Grid.Row>               
                </Grid.Column>

                <Grid.Column>
                    <Image src={imagen} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(MainApp);