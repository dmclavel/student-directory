import React from 'react'

import StudentInfo from '../StudentInfo/StudentInfo'
import StudentInfoTop from '../StudentInfo/StudentInfoTop'
import classes from './StudentLeftWindow.css'

const studentLeftWindow = (props) => (
    <div className={classes.StudentLeftWindow}>
        <StudentInfoTop />
        <StudentInfo />
    </div>
);

export default studentLeftWindow;