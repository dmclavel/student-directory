import React, { Component } from 'react'
import axios from 'axios'

import Navbar from '../../components/Navbar/Navbar'
import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow'
import StudentRightWindow from '../../components/StudentInfoWindow/StudentRightWindow'
import Spinner from '../../components/Spinner/Spinner'
import Error from '../../Error/Error'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import classes from './Student.css'

class Student extends Component {
    state = {
        students: null,
        studentInfo: {},   
        loading: true,
        showInfo: false,
        showInfoLoading: false,
        isError: false,
        errorMsg: ''
    }

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
                this.setState({isError: true,
                errorMsg: error.message});
            })
    }

    handleDataClick = (stdKey) => {
        this.setState({showInfoLoading: true})
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
                this.setState({isError: true,
                    errorMsg:error.message});
            })
    }

    handleEdit = (id) => {
        // console.log(id);
    }

    render () {
        let content = null;
        let studentInfo = <StudentLeftWindow studentInfo={this.state.studentInfo} edit={(id) => this.handleEdit(id)}/>;

        if(this.state.showInfo)
            studentInfo = <StudentLeftWindow studentInfo={this.state.studentInfo} edit={(id) => this.handleEdit(id)}/>
        
        if(this.state.showInfoLoading)
            studentInfo = <Spinner />

        if (!this.state.loading) 
            content = <StudentRightWindow studentData={this.state.students} clicked={stdKey => this.handleDataClick(stdKey)}/>
        else 
            content = <Spinner />

        return (
            <Aux>
                {
                    !this.state.isError ?
                        <Aux>
                            <Navbar />
                            <div className={classes.Student}>
                                {studentInfo}
                                {content}
                            </div>
                        </Aux>
                        :
                        <Aux>
                            <Error message={this.state.errorMsg}/>
                        </Aux>
                }
            </Aux>
        )
    }
}

export default Student;