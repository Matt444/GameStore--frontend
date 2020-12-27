import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { LayoutMyAccount } from './components/LayoutMyAccount';

export const User_edit = () => (
    <LayoutMyAccount>
        <p className="fltr">Zmień email</p>

        <Form className="mb-4">
            <Row>
                <Col>
                    <Form.Control type="email" placeholder="Wpisz nowy email" />
                </Col>
                <Col>
                    <Button variant="dark" type="submit">
                        Zastosuj
                    </Button>
                </Col>
            </Row>
        </Form>

        <p className="fltr">Zmień hasło</p>

        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Control type="password" placeholder="Wpisz nowe hasło" />
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control type="password" placeholder="Wpisz ponownie nowe hasło" />
                </Col>
                <Col>
                    <Button variant="dark" type="submit">
                        Zastosuj
                    </Button>
                </Col>
            </Row>
        </Form>

    </LayoutMyAccount>
);