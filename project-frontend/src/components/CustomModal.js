import React from 'react';
import { Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class CustomModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            headerT: this.props.headerT,
            texto: this.props.texto
        };
    }

    render(){
        const headerT = this.state.headerT;
        const texto = this.state.texto;

        return(
            <Modal
                header={headerT}
                content= {texto}
                actions={[{ key: 'Entendido', content: 'Entendido', positive: true }]}
                basic
            />
        );
    }
}

export default withRouter(CustomModal);