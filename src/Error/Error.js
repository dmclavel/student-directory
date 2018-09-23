import React from 'react'

import classes from './Error.css'

const error = (props) => (
    <div className={classes.Error}>
        <span>
            {props.message}
        </span>
    </div>
);

export default error;