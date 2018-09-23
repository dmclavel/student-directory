import React from 'react'

import classes from './StudentRightWindow.css'

const studentRightWindow = (props) => {
    const content = Object.keys(props.studentData)
    .map(stdKey => {
        return (
            <div className={classes.StudentBoxes} key={stdKey} onClick={() => props.clicked(stdKey)}>
                <div className={classes.StudentBoxesLeft}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGpMrGyb1xLxk8XrwQpMCh1EuT7Ri8Y_fe9ZXfxRJ77EGHNgF" alt="profile-iconx"/>
                </div>
                <div className={classes.StudentBoxesRight}>
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
    })

    return (
        <div className={classes.StudentRightWindow}>
            {content}
        </div>
    )
}

export default studentRightWindow;