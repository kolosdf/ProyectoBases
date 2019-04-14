import React from 'react';
import { Grid,Button,Image, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
//import ImgPlaces from './../images/MisLugaresICON.png';
import ImgAdd from './../images/addd.png';
import ImgTaxi from './../images/PedirTaxiICON.png';
import PLacesTag from './../images/lugaresTag.png';
import ImgBack from './../images/back.png';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

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

class MainUser extends React.Component{
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
            <Grid centered columns={3}  relaxed='very' style={style}> 
                <Grid.Row>                    
                    <Grid.Column floated='right'>
                        <Image src={ImgBack} />
                    </Grid.Column>
                    <Grid.Column floated='left'>
                        <Image src={PLacesTag} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column stretched floated='left'>                 
                   <Grid.Row>
                        <Label style ={{fontSize: '25px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content = 'Desde ' />
                        <Dropdown  style={{fontSize:'10px'}} options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    </Grid.Row>

                    <Grid.Row>
                        <Label style ={{fontSize: '25px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } content = 'Hasta  ' />
                        <Dropdown  style ={{fontSize: '35px',  color: '#FFFFFF', backgroundColor: '#FFCC00'} } options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column stretched floated='right' centered>
                    <Grid.Row>
                        <Button compact style={styleButton}>
                            <Image src={ImgAdd} />                            
                        </Button>

                        <Button compact style={styleButton}>
                            <Image src={ImgTaxi} />                            
                        </Button>
                    </Grid.Row>
                </Grid.Column>               
            </Grid>
        );
    }
}

export default withRouter(MainUser);