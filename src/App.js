import React, { Component } from 'react';

import fire from './config/fire';
import StudentWindow from './containers/StudentWindow/Student';
import Aux from './hoc/Auxiliary/Auxiliary';
class App extends Component {
  state = {
    user: {},
    isVerified: false
  }

  componentDidMount() {
    this.authListener();
  }

  authListener () {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified){
          this.setState({ user, isVerified: true });
          fire.database().ref('users/' + user.uid).set({
            email: user.email
          })
          .then(res => {

          })
          .catch(err => {
            console.log(err);
          });
        }
        else 
          this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  };

  logout = async () => {
    await this.setState({ isVerified: false });
    await fire.database().ref('users/' + this.state.user.uid).set({
      email: null
    })
    .then(res => {

    })
    .catch(err => {
      console.log(err);
    });
    await fire.auth().signOut();
    window.location.reload(false);
  };

  render() {
    return (
      <Aux>
        {
          this.state.user ?
          <StudentWindow authenticated={true} isVerified={this.state.isVerified} 
          logout={this.logout}/>
          :
          <StudentWindow authenticated={false} isVerified={this.state.isVerified} 
          logout={this.logout}/>
        }
      </Aux>
    );
  }
}

export default App;
