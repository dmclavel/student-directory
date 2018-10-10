import React from 'react';

import StudentInfoTop from '../StudentInfo/StudentInfoTop';
import StudentInfoEdit from '../StudentInfo/StudentInfoEdit';
import classes from './StudentLeftWindowEdit.css';

const studentLeftWindowEdit = (props) => {
    const studInfoArray = [];
    for (let info in props.studentInfo) {
        studInfoArray.push({
           key: info,
           value:  props.studentInfo[info]
        });
    }
    return (
        <div className={classes.StudentLeftWindowEdit}>
            <StudentInfoTop studentInfo={props.studentInfo}/>
            <StudentInfoEdit studentInfo={studInfoArray} id={props.studentInfo.id}
                             done={(id) => props.done(id)}
                             changed={(event, id, key) => props.changed(event, id, key)}/>
        </div>
    );
};

export default studentLeftWindowEdit;