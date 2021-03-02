import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { UserContext } from "../UserContext";

export const LayoutAdmin = (props) => {
    const { setUser } = useContext(UserContext);

    return (
        <main className="mt-5">
            <h1 className="font-weight-bold mb-4">Hello Admin</h1>
            <Row>
                <Col sm={3}>
                    <p className="mb-2">
                        <NavLink to="/admin/orders" className="fltr lgray">
                            Zamówienia
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/admin/users" className="fltr lgray">
                            Użytkownicy
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/admin/games" className="fltr lgray">
                            Gry
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/admin/categories" className="fltr lgray">
                            Kategorie
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/admin/platforms" className="fltr lgray">
                            Platformy
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/admin/keys" className="fltr lgray">
                            Klucze
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <a href="/" className="fltr lgray" onClick={() => setUser(null)}>
                            Wyloguj się
                        </a>
                    </p>
                </Col>

                <Col sm={9}>{props.children}</Col>
            </Row>
        </main>
    );
};
