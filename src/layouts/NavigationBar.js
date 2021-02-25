import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Cart } from 'react-bootstrap-icons';


const LoginStateDependentLinks = ({token, role}) => {
    let links;

    if(token && role === 'admin') {
        links = <Nav.Item><NavLink className="nav-link" to="/admin/orders">Admin</NavLink></Nav.Item>;
    } else if(token) {
        links = <Nav.Item><NavLink className="nav-link" to="/myaccount/orders">My account</NavLink></Nav.Item>;
    } else {
        links = <><Nav.Item><NavLink className="nav-link" to="/login">Login</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" to="/register">Register</NavLink></Nav.Item></>;
    }

    return (
        <>
        {links}
        </>
    )
}

export const NavigationBar = (props) => (
    <Navbar collapseOnSelect className="pl-0 pr-0">
        <Navbar.Brand className="pl-0" href='/'>Store.</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="ml-auto">
                <Nav.Item><NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink></Nav.Item>
                {/* <Nav.Item><Nav.Link className={isActiveNav('','')} href="/">Home</Nav.Link></Nav.Item> */}
                <LoginStateDependentLinks token={props.token} role={props.role} />
                <NavLink to="/cart" className="nav-link pr-0" activeClassName="active"><Cart size={24} /></NavLink>
                {/* <Nav.Item><Nav.Link className={isActiveNav('cart','pr-0')} href="/cart"><Cart size={24} /></Nav.Link></Nav.Item> */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
        
);
