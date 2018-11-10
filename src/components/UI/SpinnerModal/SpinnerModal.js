import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './SpinnerModal.css';

const spinnerModal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
            <div className={classes.SpinnerModal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-10vh)',
                display: props.show ? 'inherit' : 'none',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>
        </Aux>
        
    );
};

export default spinnerModal;