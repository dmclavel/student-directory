import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    };

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    };

    render() {
        if (this.state.hasError) {
            return <h1 style={{color: 'red', align: 'center'}}>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children;
        }
    };
}

export default ErrorBoundary;