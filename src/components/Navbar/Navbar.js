import React from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Navbar.css'

const navbar = (props) => (
    <nav className={classes.Navbar}>
        <div className={classes.NavLeft}>
            <span> STUDENT INFORMATION SYSTEM </span>
        </div>
        <div className={classes.NavRight}>
            <a href="#home"> Student Section </a>
            <a href="#about"> About </a>
            {!props.authenticated ?
                <Aux>
                    <span onClick={props.login}> Login </span>
                    <span onClick={props.showSignUp}> Register </span>
                </Aux>
                :
                <span onClick={props.logout}> Logout </span>
            }
        </div>
    </nav>
);

export default navbar;