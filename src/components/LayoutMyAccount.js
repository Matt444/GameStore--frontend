import React from 'react';
import { Row, Col } from 'react-bootstrap';

function isActiveSideNav(addr) {
    if(window.location.pathname === addr) {
        return 'active fltr';
    } else {
        return 'fltr text-black-50';
    }
}

export const LayoutMyAccount = (props, isActive) => {
    return(
        <main className="mt-5">
            <h1 className='font-weight-bold mb-4'>My account</h1>
            <Row>
                <Col sm={3}>
                    <p className="mb-2"><a className={isActiveSideNav('/myaccount/orders')} href="/myaccount/orders">Moje zamówienia</a></p>
                    <p className="mb-2"><a className={isActiveSideNav('/myaccount/edit')} href="/myaccount/edit" >Edytuj konto</a></p>
                    <p className="mb-2"><a className="fltr text-black-50" href="/" onClick={ () => localStorage.removeItem('token') }>Wyloguj się</a></p>
                    
                </Col>

                <Col sm={9}>
                    {props.children}
                </Col>
            </Row>
        </main>
    );
}