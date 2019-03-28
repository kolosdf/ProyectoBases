import React from 'react';
import './MenuBar.css';

class MenuBar extends React.Component {    
    handleAboutUs(){
      alert('Juan felipe Gil - juan.felipe.gil@correounivalle.edu.co\nMelissa Fuentes - melissa.fuentes@correounivalle.edu.co');
    }

    handleHelpB(){
      alert('Para recibir ayuda envie un correo');
    }
    
    render() {
      return (
        <div className='menu-Bar'>
          <button onClick={this.handleAboutUs}>Sobre nosotros</button>
          <button onClick={this.handleHelpB}>Ayuda</button>
        </div>
      );
    }
  }

  export default MenuBar;