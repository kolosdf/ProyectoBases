import React from 'react';
import { Grid,Button,Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import ImgPlaces from './../images/MisLugaresICON.png';
import ImgMap from './../images/MapaICON.png';
import ImgPreferencies from './../images/PreferenciasICON.png';
import ImgExit from './../images/SalirICON.png';
import ImgUserTag from './../images/UserTag.png';
import ImgLogo from './../images/logoYellow.png';

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


class MainUser extends React.Component{
    constructor(props){
        super(props);

        try{
            this.state = {
                cel: this.props.location.state.cel,
            };
        }catch(err){
            this.props.history.push({pathname:'/'});
            this.state = {
                cel: '',
            };
        }        

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
                    <Grid.Column floated='left'>
                        <Image src={ImgUserTag} />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <Image src={ImgLogo} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>                   
                    <Grid.Column stretched>
                        <Grid.Row>
                            <Button compact style={styleButton}>
                                <Image src={ImgPlaces} />                            
                            </Button>
                        </Grid.Row>                    
                        <Grid.Row>
                            <Button compact style={styleButton}>
                                <Image src={ImgPreferencies} />                            
                            </Button>
                        </Grid.Row>               
                    </Grid.Column>

                    <Grid.Column stretched>
                        <Grid.Row>
                            <Button compact style={styleButton}>
                                <Image src={ImgMap} />                            
                            </Button>
                        </Grid.Row>                    
                        <Grid.Row>
                            <Button href='/' compact style={styleButton}>
                                <Image src={ImgExit} />                            
                            </Button>
                        </Grid.Row>               
                    </Grid.Column>
                </Grid.Row>                
            </Grid>
        );
    }
}

export default withRouter(MainUser);