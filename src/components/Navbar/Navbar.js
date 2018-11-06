import React from 'react'

import classes from './Navbar.css'

const navbar = () => (
    <nav className={classes.Navbar}>
        <section className={classes.NavLeft}>
            <span> STUDENT INFORMATION SYSTEM </span>
        </section>
        <section className={classes.NavRight}>
            <a href="#home"> Student Section </a>
            <a href="#about"> About </a>
        </section>
    </nav>
);

export default navbar;