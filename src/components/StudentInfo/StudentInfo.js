import React from 'react'

import classes from './StudentInfo.css'

const studentInfo = (props) => (
    <div className={classes.StudentInfo}>
        <h3>
            Information Details
        </h3>
        <span> College: CAS </span>
        <span> Student Number: 2015-05455 </span>
        <span> Classification: Senior </span>
        <span> College Address: Tribelli Dormitory, UPLB </span>
        <span> Home Address: Sanggalang Stree, Daan Bilolo, Orion, Bataan </span>
        <span> Contact Number/s: (+63)998-5321-695, (+63)915-4981-903 </span>
        <span> Guardian: Rodelio Clavel </span>
        <span> Contact Number/s of Guardian: (+63)939-3748-619 </span>

        <button> Edit </button>
    </div>
);

export default studentInfo;