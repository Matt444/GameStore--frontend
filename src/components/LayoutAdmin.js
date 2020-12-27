import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const LayoutAdmin = (props, isActive) => (
    <main className="mt-5">
        <h1 className='font-weight-bold mb-4'>Hello Admin</h1>
        <Row>
            <Col sm={3}>
                <p className="mb-2"><a className="fltr text-black-50">Zamówienia</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Użytkownicy</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Gry</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Kategorie</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Platformy</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Klucze</a></p>
                <p className="mb-2"><a className="fltr text-black-50">Wyloguj się</a></p>
                
            </Col>

            <Col sm={9}>
                {props.children}
            </Col>
        </Row>
    </main>
)