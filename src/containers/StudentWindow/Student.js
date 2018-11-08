import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar/Navbar';
import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow';
import StudentLeftWindowEdit from '../../components/StudentInfoWindow/StudentLeftWindowEdit';
import StudentRightWindow from '../../components/StudentInfoWindow/StudentRightWindow';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/LoginModal/LoginModal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Student.css';
import * as Sentry from '@sentry/browser';
import fire from '../../config/fire';

class Student extends Component {
    state = {
        students: null,
        studentInfo: {},
        emailUserAdd: '',
        emailUserPass: '',
        errorLoginMsg: null,
        successMessage: null,
        loading: true,
        modalLoading: false,
        showInfo: false,
        showInfoLoading: false,
        inEditMode: false,
        onShowLoginModal: false,
        onShowSignupModal: false,
        onShowSuccessModal: false
    };

    componentDidMount () {
        axios.get('https://student-directory-uplb.firebaseio.com/.json?uid=efecee9d-9962-4d37-96bd-b6338bf36bef')
            .then(response => {
                if(response.data) {
                    this.setState({
                        students: response.data,
                        loading: false
                    });
                    console.log(this.state);
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
        if (Object.keys(this.state.studentInfo).length !== 0) {
            this.setState({
                inEditMode: true
            });
        } else {
            alert('Click any student data on the right part of the screen first!');
        }
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

    cancelEdit = (id) => {
        this.setState({
            inEditMode: false
        });
    };

    showLoginModal = () => {
        this.setState({
            onShowLoginModal: true
        });
    };

    showSignUp = () => {
        this.setState({
            onShowSignupModal: true
        });
    };

    closeLoginModal = () => {
        this.setState({
            emailUserAdd: '',
            emailUserPass: '',
            onShowLoginModal: false,
            onShowSignupModal: false,
            errorLoginMsg: null
        });
    };

    closeSuccessModal = () => {
        this.setState({
            onShowSuccessModal: false,
            successMessage: null
        });
    };

    handleEmailChange = (event) => {
        this.setState({ emailUserAdd: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ emailUserPass: event.target.value });
    };

    login = (event, email, password) => {
        event.preventDefault();
        this.setState({ modalLoading: true });
        fire.auth().signInWithEmailAndPassword(email, password)
          .then(userState => {
            this.setState({ 
                modalLoading: false,
                onShowLoginModal: false,
                errorLoginMsg: null,
                emailUserAdd: '',
                emailUserPass: '' 
            });
          })
          .catch(error => {
            this.setState({
                emailUserAdd: '',
                emailUserPass: '', 
                errorLoginMsg: error.message, 
                modalLoading: false
            });
          });
      };

      signup = (event, email, password) => {
        event.preventDefault();
        this.setState({ modalLoading: true });
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then(userState => {
                this.setState({ 
                    modalLoading: false,
                    onShowSignupModal: false,
                    onShowSuccessModal: true,
                    successMessage: 'Successfully signed up!',
                    errorLoginMsg: null,
                    emailUserAdd: '',
                    emailUserPass: '' 
                });
            })
            .catch(error => {
                this.setState({
                    emailUserAdd: '',
                    emailUserPass: '', 
                    errorLoginMsg: error.message, 
                    modalLoading: false
                });
            });
      };
    
      logout = () => {
        fire.auth().signOut();
      };

    render () {
        let content = null;
        let studentInfo = <StudentLeftWindow studentInfo={this.state.studentInfo} edit={(id) => this.handleEdit(id)}/>;

        if(this.state.inEditMode)
            studentInfo = (
                <StudentLeftWindowEdit studentInfo={this.state.studentInfo}
                                       done={(id) => this.submitChange(id)}
                                       cancel={(id) => this.cancelEdit(id)}
                                       changed={(event, id, key) => this.handleInfoChange(event, id, key)}/>
            );

        if(this.state.showInfoLoading) {
            studentInfo = <Spinner/>;
        }


        if (!this.state.loading) {
            content = <StudentRightWindow  authenticated={this.props.authenticated}
                                        studentData={this.state.students}
                                          clicked={stdKey => this.handleDataClick(stdKey)}/>;
        } else {
            content = <Spinner/>;
        }
        
        return (
            <Aux>
                <Navbar login={this.showLoginModal} logout={this.logout}
                        showSignUp={this.showSignUp} 
                        signup={this.signup}
                        authenticated={this.props.authenticated}/>
                <Modal show={this.state.onShowLoginModal}
                        backdropClicked={this.closeLoginModal}>
                    {this.state.modalLoading ?
                        <Spinner modal={true}/>
                        :
                        <div className={classes.LoginModal}>
                            <input type="text" placeholder="Email-address" onChange={this.handleEmailChange} value={this.state.emailUserAdd} />
                            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.emailUserPass} />
                            {this.state.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', textAlign: 'center'}}> {this.state.errorLoginMsg} </p>}
                            <button onClick={(event) => this.login(event, this.state.emailUserAdd, this.state.emailUserPass)}> Login </button>
                            <button onClick={this.closeLoginModal}> Cancel </button>
                        </div> 
                    }
                </Modal>
                <Modal show={this.state.onShowSignupModal} backdropClicked={this.closeLoginModal} 
                        closeModal={this.closeLoginModal}>
                    {this.state.modalLoading ?
                        <Spinner modal={true}/>
                        :
                        <div className={classes.LoginModal}>
                            <input type="text" placeholder="Email-address" onChange={this.handleEmailChange} value={this.state.emailUserAdd} />
                            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.emailUserPass} />
                            {this.state.errorLoginMsg === null ? null: <p style={{color: '#CD295A', fontWeight: 'bold', textAlign: 'center'}}> {this.state.errorLoginMsg} </p>}
                            <button onClick={(event) => this.signup(event, this.state.emailUserAdd, this.state.emailUserPass)}> Sign Up </button>
                            <button onClick={this.closeLoginModal}> Cancel </button>
                        </div> 
                    }
                </Modal>
                <Modal show={this.state.onShowSuccessModal} backdropClicked={this.closeSuccessModal}
                        closeModal={this.closeSuccessModal}>
                    <div className={classes.SuccessModal}>
                        <strong style={{color: '#CD295A'}}> {this.state.successMessage} </strong>
                        <button onClick={this.closeSuccessModal}> Done </button>
                    </div>
                </Modal>
                <div className={classes.Student}>
                    {studentInfo}
                    {content}
                </div>
            </Aux>
        );

    }
}

export default Student;