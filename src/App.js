import React, { Component } from 'react';

import fire from './config/fire';
import StudentWindow from './containers/StudentWindow/Student';
import Aux from './hoc/Auxiliary/Auxiliary';
import * as Sentry from '@sentry/browser';
class App extends Component {
  state = {
    user: {},
    authenticated: false
  }

  componentDidMount () {
    this.authListener();
  }

  authListener () {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({user});
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    })
  };

  login = async (event, email, password) => {
    event.preventDefault();
    await this.setState({user: {email, password}});
    fire.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password)
      .then(userState => {

      })
      .catch(error => {
        Sentry.captureException(error);
      });
  };

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <Aux>
        {
          this.state.user ?
          <StudentWindow authenticated={true} />
          :
          <StudentWindow authenticated={false} />
        }
      </Aux>
    );
  }
}

export default App;
