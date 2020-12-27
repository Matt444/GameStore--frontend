import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const LayoutMyAccount = (props, isActive) => (
    <main className="mt-5">
        <h1 className='font-weight-bold mb-4'>My account</h1>
        <Row>
            <Col sm={3}>
                <p className="mb-2"><a className="fltr text-black-50">Moje zamówienia</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Edytuj konto</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Wyloguj się</a></p>
                
            </Col>

            <Col sm={9}>
                {props.children}
            </Col>
        </Row>
    </main>
)