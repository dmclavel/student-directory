import React from 'react'

import classes from './StudentRightWindow.css'

const studentRightWindow = (props) => {
    let content;
    if (props.studentData) {
        content = Object.keys(props.studentData)
        .map(stdKey => {
            return (
                <div className={classes.StudentBoxes} key={stdKey} onClick={() => props.clicked(stdKey)}>
                    <div className={classes.StudentBoxes__Left}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGpMrGyb1xLxk8XrwQpMCh1EuT7Ri8Y_fe9ZXfxRJ77EGHNgF" alt="profile-iconx"/>
                    </div>
                    <div className={classes.StudentBoxes__Right}>
                        <span>
                            {props.studentData[stdKey].fullname}
                        </span>
                        <span>
                            {props.studentData[stdKey].course}
                        </span>
                        <span>
                            {props.studentData[stdKey].studno}
                        </span>
                    </div>
                </div>
            )
        });
    }

    let message = 'Log in first to have basic permissions granted! Thank you.';

    if (props.isVerified && props.authenticated)
        message = 'You are a verified user! Read and Write access permissions are fully granted! Thank you.';
    else if (!props.isVerified && props.authenticated)
        message = 'You are logged in. Verify your email-address first to have write access permission! Thank you.';

    return (
        <div className={classes.StudentRightWindow}>
            <strong className={classes.Status}> {message} </strong>
            {content}
        </div>
    );
};

export default studentRightWindow;