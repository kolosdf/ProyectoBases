import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import image from './../images/logo.png'

const style = {
  margin: 0,
  backgroundColor: '#FFFFFF'
};

export default class UpMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
      if(name==='sobreNos'){
        alert('Empresa que presta un servicio para pedir servicio de taxi de forma rapida y eficiente, que facilita el pago del servicio');
      }else{
        alert('Juan felipe Gil - juan.felipe.gil@correounivalle.edu.co\nMelissa Fuentes - melissa.fuentes@correounivalle.edu.co');
      }
    }

  render() {
    const { activeItem } = this.state

    return (
      <Menu widths={3} borderless style={style}>
        
            <Menu.Item>
            <Image src={image} />
            </Menu.Item>

            <Menu.Item
            name='sobreNos'
            active={activeItem === 'sobreNos'}
            onClick={this.handleItemClick}
            >
            Sobre Nosotros
            </Menu.Item>

            <Menu.Item
            name='ayuda'
            active={activeItem === 'ayuda'} 
            onClick={this.handleItemClick}
            >
            Ayuda
            </Menu.Item>
        
      </Menu>
    )
  }
}