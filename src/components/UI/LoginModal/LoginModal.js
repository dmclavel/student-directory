import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './LoginModal.css';

const loginModal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} backdropClicked={props.backdropClicked}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux> 
    );
};

export default loginModal;