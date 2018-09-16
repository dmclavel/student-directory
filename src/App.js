import React, { Component } from 'react';

import StudentWindow from './containers/StudentWindow/Student';
import Aux from './hoc/Auxiliary/Auxiliary';

class App extends Component {
  render() {
    return (
      <Aux>
        <StudentWindow />
      </Aux>
    );
  }
}

export default App;
