import React from 'react'
import { Grid,Image,List } from 'semantic-ui-react'
import image from './../images/logoWhite.png'

const style = {
    paddingLeft: 0,
    listStyle: 'none',
    backgroundColor: '#4D4D4D'
  };

  const styleYellowT = {
    color: '#FFCC00'
  };

export default class BottomMenu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            aboutUsM: 'Empresa que presta un servicio para pedir servicio de taxi de forma rapida y eficiente, que facilita el pago del servicio',
            ourServicesM: 'Servicios: \n-Pedir taxi\n-Aceptar una solicitud de presta servicio de taxi',
            reviewM: 'No hay reseñas',
            helpM: 'Juan felipe Gil - juan.felipe.gil@correounivalle.edu.co\nMelissa Fuentes - melissa.fuentes@correounivalle.edu.co',
        };

        this.handleClickAboutUs = this.handleClickAboutUs.bind(this);
        this.handleClickOurServM= this.handleClickOurServM.bind(this);
        this.handleClickReviewM = this.handleClickReviewM.bind(this);
        this.handleClickHelpM = this.handleClickHelpM.bind(this);
    }

    handleClickAboutUs(){
        alert(this.state.aboutUsM);
    }

    handleClickOurServM(){
        alert(this.state.ourServicesM);
    }

    handleClickReviewM(){
        alert(this.state.reviewM);
    }

    handleClickHelpM(){
        alert(this.state.helpM);
    }

    render(){
        return(
            <Grid relaxed='very' style={style}>

                <Grid.Column floated='right' width={5}>
                    <List selection>
                        <List.Item onClick={this.handleClickAboutUs}>
                            <List.Content style={styleYellowT}>Sobre Nosotros</List.Content>
                        </List.Item>
                        <List.Item onClick={this.handleClickOurServM}>
                            <List.Content style={styleYellowT}>Nuestros Servicios</List.Content>
                        </List.Item>
                        <List.Item onClick={this.handleClickReviewM}>
                            <List.Content style={styleYellowT}>Reseñas</List.Content>
                        </List.Item>
                        <List.Item onClick={this.handleClickHelpM}>
                            <List.Content style={styleYellowT}>Ayuda</List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>


                <Grid.Column floated='right' width={5}>
                    <List>
                        <List.Item>
                            <List.Content style={styleYellowT}>Recursos:</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>Freepik</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>Macrovector</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>rawpixel.com</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>Smashicons</List.Content>
                        </List.Item>    
                    </List>
                </Grid.Column>


                <Grid.Column floated='right' width={5}>
                    <Image src={image} />
                </Grid.Column>
            </Grid>

        );
    }


}