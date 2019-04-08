import React from 'react'
import { Grid,Image,List,Modal,Button } from 'semantic-ui-react'
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
            reviewM: 'No hay reseñas',
            modalSOpen: false,
            modalAOpen: false,
        };
    }

    handleServiceOpen = () => this.setState({ modalSOpen: true })
    handleServiceClose = () => this.setState({ modalSOpen: false })
    handleHelpOpen = () => this.setState({ modalAOpen: true })
    handleHelpClose = () => this.setState({ modalAOpen: false })

    render(){
        const aboutUsM = this.state.aboutUsM;
        const reviewM = this.state.reviewM;

        return(
            <Grid relaxed='very' style={style}>

                <Grid.Column floated='right' width={5}>
                    <List selection>
                        <Modal
                            trigger={<List.Item>
                                        <List.Content style={styleYellowT}>Sobre Nosotros</List.Content>
                                    </List.Item>}
                            header='Sobre Nosotros'
                            content= {aboutUsM}
                            actions={[{ key: 'Entendido', content: 'Entendido', positive: true }]}
                            basic
                        />

                        <Modal
                            trigger={<List.Item onClick={this.handleServiceOpen}>
                                        <List.Content style={styleYellowT}>Nuestros Servicios</List.Content>
                                    </List.Item>}
                            open={this.state.modalSOpen}
                            onClose={this.handleServiceClose}
                            basic
                            >
                            <Modal.Header>Nuestros Servicios</Modal.Header>
                            <Modal.Content>            
                                <Modal.Description> 
                                <h3>Servicios:</h3>
                                <p>- Pedir taxi</p>
                                <p>- Aceptar una solicitud de presta servicio de taxi</p>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={this.handleServiceClose}> Entendido </Button>
                            </Modal.Actions>
                        </Modal>

                        <Modal
                            trigger={<List.Item>
                                        <List.Content style={styleYellowT}>Reseñas</List.Content>
                                    </List.Item>}
                            header='Reseñas'
                            content= {reviewM}
                            actions={[{ key: 'Entendido', content: 'Entendido', positive: true }]}
                            basic
                        />

                        <Modal
                            trigger={<List.Item onClick={this.handleHelpOpen}>
                                        <List.Content style={styleYellowT}>Ayuda</List.Content>
                                    </List.Item>}
                            open={this.state.modalAOpen}
                            onClose={this.handleHelpClose}
                            basic
                            >
                            <Modal.Header>Ayuda</Modal.Header>
                            <Modal.Content>            
                                <Modal.Description> 
                                <h3>Correos:</h3>
                                <p>Juan felipe Gil  -  juan.felipe.gil@correounivalle.edu.co</p>
                                <p>Melissa Fuentes  -  melissa.fuentes@correounivalle.edu.co</p>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={this.handleHelpClose}> Entendido </Button>
                            </Modal.Actions>
                        </Modal>
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