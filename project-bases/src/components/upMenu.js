import React from 'react';

export default class upMenu1 extends React.Component {          
    render(){
        return (               
            <div>
                <h1>Hola mundo</h1>
                <button onClick={this.handleClickAboutUs}>Sobre Nosotros</button>
                <button onClick={this.handleClickHelp}>Ayuda</button>
            </div>        
        );
    }
}

