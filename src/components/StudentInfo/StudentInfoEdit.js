import React from 'react'

import Input from '../Input/Input';
import classes from './StudentInfoEdit.css'

const studentInfoEdit = (props) => {
    let inputFields;

    inputFields = props.studentInfo.map(info => {
       return (
           <div className={classes.AlignInputField} key={info.key}>
               <span> {info.key} </span>
               <Input info={info} id={props.id} changed={(event, id, key) => props.changed(event, id, key)}/>
           </div>
       );
    });
    return (
        <div className={classes.StudentInfoEdit}>
            <h3>
                Information Details
            </h3>
            {inputFields}
            <button onClick={() => props.done(props.id)}> Submit to Database </button>
        </div>
    );

};

export default studentInfoEdit;