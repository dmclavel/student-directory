import React, { Component } from 'react';

import StudentInfo from '../StudentInfo/StudentInfo';
import StudentInfoTop from '../StudentInfo/StudentInfoTop';
import classes from './StudentLeftWindow.css';

class StudentLeftWindow extends Component {
    render () {
        return (
            <div className={classes.StudentLeftWindow}>
                <StudentInfoTop studentInfo={this.props.studentInfo}/>
                <StudentInfo studentInfo={this.props.studentInfo} edit={(id) => this.props.edit(id)}/>
            </div>
        );
    }
}

export default StudentLeftWindow;