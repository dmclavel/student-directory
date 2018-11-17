import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './LoginModal.css';

class LoginModal extends Component {

    // componentDidMount() {
    //     document.addEventListener('keydown', this.eventListen);
    // }
    //
    // componentWillUnmount() {
    //     document.removeEventListener('Escape', this.eventListen);
    // }
    //
    // eventListen = () => {
    //     document.addEventListener('keydown', event => {
    //             const keyName = event.key;
    //             console.log(keyName);
    //
    //             switch (keyName) {
    //                 case 'Escape':
    //                     this.closeLoginModal();
    //
    //                     break;
    //                 case 'Enter':
    //                     this.state.onShowLoginModal ?
    //                         this.login(event, this.state.emailUserAdd, this.state.emailUserPass)
    //                         :
    //                         this.signup(event, this.state.emailUserAdd, this.state.emailUserPass);
    //                     // document.removeEventListener(keyName, this.eventListen);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     );
    // };

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} backdropClicked={this.props.backdropClicked}/>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default LoginModal;