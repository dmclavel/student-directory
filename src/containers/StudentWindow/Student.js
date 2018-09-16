import React, { Component } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import StudentLeftWindow from '../../components/StudentInfoWindow/StudentLeftWindow'
import Aux from '../../hoc/Auxiliary/Auxiliary'

class Student extends Component {
    state = {
        students: []
    }

    render () {
        return (
            <Aux>
                <Navbar />
                <StudentLeftWindow />
            </Aux>
        );
    }
}

export default Student;