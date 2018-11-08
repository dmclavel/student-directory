import React from 'react'

import classes from './Navbar.css'

const navbar = () => (
    <nav className={classes.Navbar}>
        <div className={classes.NavLeft}>
            <span> STUDENT INFORMATION SYSTEM </span>
        </div>
        <div className={classes.NavRight}>
            <a href="#home"> Student Section </a>
            <a href="#about"> About </a>
        </div>
    </nav>
);

export default navbar;