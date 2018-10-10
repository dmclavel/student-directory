import React from 'react';

import classes from './Input.css';

const input = (props) => (
    <div className={classes.Input}>
        <input
            type="text"
            placeholder={props.info.value}
            value={props.info.value}
            onChange={(event) => props.changed(event, props.id, props.info.key)}
        />
    </div>
);

export default input;