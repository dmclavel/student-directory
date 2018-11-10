import React from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Navbar.css'

const navbar = (props) => {
    let content = (
        <Aux>
            <span onClick={props.login}> Login </span>
            <span onClick={props.showSignUp}> Register </span>
        </Aux>
    );

    if (props.authenticated && props.isVerified)
        content = (
            <Aux>
                <span onClick={props.logout}> Logout </span>
            </Aux>
        );
    else if (props.authenticated && !props.isVerified)
        content = (
            <Aux>
                <span onClick={props.logout}> Logout </span>
                <span onClick={props.verify}> Verify Account </span>
            </Aux>
        );
            

    return (
        <nav className={classes.Navbar}>
            <div className={classes.NavLeft}>
                <span> STUDENT INFORMATION SYSTEM </span>
            </div>
            <div className={classes.NavRight}>
                <a href="#home"> Student Section </a>
                <a href="#about"> About </a>
                {content}
            </div>
        </nav>
    );
};
    

export default navbar;