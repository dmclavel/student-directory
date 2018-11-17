import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let disabled = false;
    if (props.info.key === 'id') {
        disabled = true;
    }

    return (
        <div className={classes.Input}>
            <input
                type="text"
                placeholder={props.info.value}
                value={props.info.value}
                onChange={(event) => props.changed(event, props.id, props.info.key)}
                disabled={disabled}
            />
        </div>
    );
    
};

export default input;