import React from 'react'

import classes from './StudentInfo.css'

const studentInfo = (props) => (
    <div className={classes.StudentInfo}>
        <h3>
            Information Details
        </h3>
        <span> College: {props.studentInfo.college} </span>
        <span> Student Number: {props.studentInfo.studno} </span>
        <span> Classification: {props.studentInfo.classification} </span>
        <span> College Address: {props.studentInfo.collegeaddress} </span>
        <span> Home Address: {props.studentInfo.homeaddress} </span>
        <span> Contact Number/s: {props.studentInfo.contactno} </span>
        <span> Guardian: {props.studentInfo.guardian} </span>
        <span> Contact Number/s of Guardian: {props.studentInfo.contactno_guardian} </span>

        <button> Edit </button>
    </div>
);

export default studentInfo;