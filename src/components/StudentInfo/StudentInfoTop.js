import React from 'react'

import classes from './StudentInfoTop.css'

const studentInfoTop = (props) => {
    return (
        <div className={classes.StudentInfoTop}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGpMrGyb1xLxk8XrwQpMCh1EuT7Ri8Y_fe9ZXfxRJ77EGHNgF" alt="profile-iconx"/>
            <div className={classes.Info}>
                <span> {props.studentInfo.fullname} </span>
                <span> {props.studentInfo.course} </span>
            </div>
        </div>
    )
};

export default studentInfoTop;