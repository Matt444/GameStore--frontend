import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Cart } from 'react-bootstrap-icons';

export const NavigationBar = () => (
        <Navbar collapseOnSelect className="pl-0 pr-0">
            <Navbar.Brand className="pl-0" href='/'>Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/">My account</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link className="pr-0"><Cart size={24} /></Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
)