import React from 'react'
import {NavLink} from 'react-router-dom'

const  Navbar = ()  => (
    <nav>
        <NavbarUnAuth />
    </nav>
)

const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to='/'> HOME</NavLink>
        </li>
        <li>
            <NavLink to='/search'> SEARCH</NavLink> 
        </li>
        <li>
            <NavLink to='/signin'> SIGN IN</NavLink>
        </li>
        <li>
            <NavLink to='/signup'> SIGN UP</NavLink>
        </li>
    </ul>
)

export default Navbar

