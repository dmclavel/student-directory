import React, { Component } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow';
import StudentLeftWindowEdit from '../../components/StudentInfoWindow/StudentLeftWindowEdit';
import StudentRightWindow from '../../components/StudentInfoWindow/StudentRightWindow';
import Spinner from '../../components/UI/Spinner/Spinner';
import MainSpinner from '../../components/UI/Spinner/MainSpinner';
import Modal from '../../components/UI/LoginModal/LoginModal';
import SpinnerModal from '../../components/UI/SpinnerModal/SpinnerModal';
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
        spinnerModalLoading: false,
        showInfo: false,
        showInfoLoading: false,
        inEditMode: false,
        onShowLoginModal: false,
        onShowSignupModal: false,
        onShowSuccessModal: false,
    };

    componentDidMount () {
        fire.database().ref('studentsData').on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    students: snapshot.val(),
                    loading: false
                });
            }
        }, 
        () => {
            this.setState({ loading: false });
        });
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
        fire.database().ref('studentsData/' + stdKey).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({
                    studentInfo: snapshot.val(),
                    showInfo: true,
                    showInfoLoading: false
                });
            }
        },
        (error) => {
            console.log(error);
        });
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
        if (fire.auth().currentUser !== null && this.props.isVerified) {
            fire.database().ref('studentsData/' + id).set({
                ...this.state.studentInfo
            })
            .then(res => {
                this.setState({ inEditMode: false })
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            alert('Verified users can only edit data.');
        }
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

    closeSpinnerModal = () => {
        this.setState({
            spinnerModalLoading: false
        });
    };

    handleEmailChange = (event) => {
        this.setState({ emailUserAdd: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ emailUserPass: event.target.value });
    };

    login = async (event, email, password) => {
        event.preventDefault();
        await this.setState({ modalLoading: true });
        await fire.auth().signInWithEmailAndPassword(email, password)
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
        window.location.reload(false);
      };

      signup = async (event, email, password) => {
        event.preventDefault();
        await this.setState({ modalLoading: true });
        await fire.auth().createUserWithEmailAndPassword(email, password)
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
        setTimeout(() => {
            window.location.reload(false);
        }, 4000);
      };

      verify = () => {
        const user = fire.auth().currentUser;

        this.setState({ spinnerModalLoading: true });
        user.sendEmailVerification()
            .then(res => {

            })
            .catch(err => {

            });
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
                                            isVerified={this.props.isVerified}
                                            studentData={this.state.students}
                                          clicked={stdKey => this.handleDataClick(stdKey)}/>;
        } else {
            content = <Spinner/>;
        }
        
        return (
            <Aux>
                <Navbar login={this.showLoginModal} logout={this.props.logout}
                        showSignUp={this.showSignUp} 
                        signup={this.signup}
                        verify={this.verify}
                        authenticated={this.props.authenticated}
                        isVerified={this.props.isVerified}/>
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
                <SpinnerModal show={this.state.spinnerModalLoading} backdropClicked={this.closeSpinnerModal}>
                    <MainSpinner />
                    <strong style={{display: 'block', color: '#ccc', textAlign: 'center', fontWeight: 'bolder'}}> The verification e-mail has been sent! </strong>
                </SpinnerModal>
                <div className={classes.Student}>
                    {studentInfo}
                    {content}
                </div>
            </Aux>
        );

    }
}

export default Student;