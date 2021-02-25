import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";

import { UserContext } from "../UserContext";

const LoginStateDependentLinks = ({ user }) => {
    let links;

    if (user && user.isAdmin) {
        links = (
            <Nav.Item>
                <NavLink className="nav-link" to="/admin">
                    Admin
                </NavLink>
            </Nav.Item>
        );
    } else if (user) {
        links = (
            <Nav.Item>
                <NavLink className="nav-link" to="/myaccount">
                    My account
                </NavLink>
            </Nav.Item>
        );
    } else {
        links = (
            <>
                <Nav.Item>
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" to="/register">
                        Register
                    </NavLink>
                </Nav.Item>
            </>
        );
    }

    return <>{links}</>;
};

export const NavigationBar = () => {
    const { user } = useContext(UserContext);

    return (
        <Navbar collapseOnSelect className="pl-0 pr-0">
            <Navbar.Brand className="pl-0" href="/">
                Store.
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <NavLink exact to="/" className="nav-link" activeClassName="active">
                            Home
                        </NavLink>
                    </Nav.Item>
                    <LoginStateDependentLinks user={user} />
                    <NavLink to="/cart" className="nav-link pr-0" activeClassName="active">
                        <Cart size={24} />
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
