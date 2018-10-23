import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar/Navbar';
import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow';
import StudentLeftWindowEdit from '../../components/StudentInfoWindow/StudentLeftWindowEdit';
import StudentRightWindow from '../../components/StudentInfoWindow/StudentRightWindow';
import Spinner from '../../components/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Student.css';
import * as Sentry from '@sentry/browser';
// import studentInfo from "../../components/StudentInfo/StudentInfo";

class Student extends Component {
    state = {
        students: null,
        studentInfo: {},   
        loading: true,
        showInfo: false,
        showInfoLoading: false,
        inEditMode: false
    };

    componentDidMount () {
        axios.get('https://student-directory-uplb.firebaseio.com/.json')
            .then(response => {
                if(response.data) {
                    this.setState({
                        students: response.data,
                        loading: false
                    })
                }
            })
            .catch(error => {
                Sentry.captureException(error);
            })
    }

    componentDidCatch (error, errorInfo) {
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    handleDataClick = (stdKey) => {
        this.setState({showInfoLoading: true});
        axios.get('https://student-directory-uplb.firebaseio.com/' + stdKey + '/.json')
            .then(response => {
                if(response.data) {
                    this.setState({
                        studentInfo: response.data,
                        showInfo: true,
                        showInfoLoading: false
                    })
                }
            })
            .catch(error => {
                Sentry.captureException(error);
            })
    };

    handleEdit = (id) => {
        this.setState({
            inEditMode: true
        });
    };

    handleInfoChange = (event, id, key) => {
        const students = {...this.state.students};
        const studObject = {...this.state.studentInfo};
        studObject[key] = event.target.value;
        students[id] = studObject;

        this.setState({
            studentInfo: studObject,
            students: students
        });
    };

    submitChange = (id) => {
        axios.put('https://student-directory-uplb.firebaseio.com/' + id + '/.json', this.state.studentInfo)
            .then(res => {
                this.setState({
                    inEditMode: false
                })
            })
            .catch(error => {
                Sentry.captureException(error);
            });
    };

    render () {
        let content = null;
        let studentInfo = <StudentLeftWindow studentInfo={this.state.studentInfo} edit={(id) => this.handleEdit(id)}/>;

        if(this.state.inEditMode)
            studentInfo = (
                <StudentLeftWindowEdit studentInfo={this.state.studentInfo}
                                       done={(id) => this.submitChange(id)}
                                       changed={(event, id, key) => this.handleInfoChange(event, id, key)}/>
            );

        if(this.state.showInfoLoading) {
            studentInfo = <Spinner/>;
        }


        if (!this.state.loading) {
            content = <StudentRightWindow studentData={this.state.students}
                                          clicked={stdKey => this.handleDataClick(stdKey)}/>;
        } else {
            content = <Spinner/>;
        }

        return (
            <Aux>
                <Navbar />
                <div className={classes.Student}>
                    {studentInfo}
                    {content}
                </div>
            </Aux>
        );

    }
}

export default Student;