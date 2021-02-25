import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { UserContext } from "../UserContext";

export const LayoutMyAccount = (props) => {
    const { setUser } = useContext(UserContext);

    return (
        <main className="mt-5">
            <h1 className="font-weight-bold mb-4">My account</h1>
            <Row>
                <Col sm={3}>
                    <p className="mb-2">
                        <NavLink to="/myaccount/orders" className="fltr lgray">
                            Moje zamówienia
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink to="/myaccount/edit" className="fltr lgray">
                            Edytuj konto
                        </NavLink>
                    </p>
                    <p className="mb-2">
                        <NavLink exact to="/" className="fltr lgray" onClick={() => setUser(null)}>
                            Wyloguj się
                        </NavLink>
                    </p>
                </Col>

                <Col sm={9}>{props.children}</Col>
            </Row>
        </main>
    );
};
