import React from 'react';
import { Row, Col } from 'react-bootstrap';

function isActiveSideNav(addr) {
    if(window.location.pathname === addr) {
        return 'active fltr';
    } else {
        return 'fltr text-black-50';
    }
}

export const LayoutAdmin = (props) => {
    return (
        <main className="mt-5">
            <h1 className='font-weight-bold mb-4'>Hello Admin</h1>
            <Row>
                <Col sm={3}>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/orders')} href="/admin/orders">Zamówienia</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/users')} href="/admin/users">Użytkownicy</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/games')} href="/admin/games">Gry</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/categories')} href="/admin/categories">Kategorie</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/platforms')} href="/admin/platforms">Platformy</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/admin/keys')} href="/admin/keys">Klucze</a></p>
                    <p className="mb-2"><a href="/" className="fltr text-black-50" onClick={ () => localStorage.clear() }>Wyloguj się</a></p>
                    
                </Col>

                <Col sm={9}>
                    {props.children}
                </Col>
            </Row>
        </main>
    );
}