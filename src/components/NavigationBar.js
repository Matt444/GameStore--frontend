import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';

function isActiveNav(addr, classes) {
    if(window.location.pathname.split('/')[1] === addr) {
        return 'active ' + classes;
    } else {
        return classes;
    }
}

export const NavigationBar = (props) => {
    let navit;
    if(props.token && props.role === 'admin') {
        navit = <Nav.Link className={isActiveNav('admin','')} href="/admin/orders">Admin</Nav.Link>;
    } else if(props.token) {
        navit = <Nav.Link className={isActiveNav('myaccount','')} href="/myaccount/orders">My account</Nav.Link>;
    } else {
        navit = <Nav.Link className={isActiveNav('login','')} href="/login">Login</Nav.Link>;
    }

    return (
        <Navbar collapseOnSelect className="pl-0 pr-0">
            <Navbar.Brand className="pl-0" href='/'>Store.</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link className={isActiveNav('','')} href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item>{ navit }</Nav.Item>
                    <Nav.Item><Nav.Link className={isActiveNav('cart','pr-0')} href="/cart"><Cart size={24} /></Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}