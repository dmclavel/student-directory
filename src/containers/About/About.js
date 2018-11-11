import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Navbar/Navbar';

export class About extends Component {
    render () {
        return (
            <Aux>
                <Navbar />
                <div>
                    <h1> About Page </h1>
                    <h2> Test </h2>
                </div>
            </Aux>
        );
    }
}