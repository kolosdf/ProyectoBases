import React, { Component } from 'react'
import { Menu, Image,Modal, Button } from 'semantic-ui-react'
import image from './../images/logo.png'

const style = {
  margin: 0,
  backgroundColor: '#FFFFFF'
};

export default class UpMenu extends Component {
  state = {
    sobreNos: 'Empresa que presta un servicio para pedir servicio de taxi de forma rapida y eficiente, que facilita el pago del servicio',
    modalAOpen: false,
  }

  handleOpen = () => this.setState({ modalAOpen: true })
  handleClose = () => this.setState({ modalAOpen: false })

  render() {
    const sobreNos = this.state.sobreNos;

    return (
      <Menu widths={3} borderless style={style}>        
        <Menu.Item>
        <Image src={image} />
        </Menu.Item>

        <Modal
          trigger={<Menu.Item name='sobreNos'> Sobre Nosotros </Menu.Item>}
          header='Sobre Nosotros'
          content= {sobreNos}
          actions={[{ key: 'Entendido', content: 'Entendido', positive: true }]}
          basic
        />

        <Modal
         trigger={<Menu.Item name='ayuda' onClick={this.handleOpen}> Ayuda </Menu.Item>}
         open={this.state.modalAOpen}
         onClose={this.handleClose}
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
            <Button color='green' onClick={this.handleClose}> Entendido </Button>
          </Modal.Actions>
        </Modal>
      </Menu>
    )
  }
}