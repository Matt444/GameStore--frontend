import React from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { XCircle } from 'react-bootstrap-icons';

export const Admin_keys = (props) => {
    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj klucz</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button" variant="outline-secondary" title="Nazwa gry">
                            <Dropdown.Item href="#/action-1">...</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">...</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col lg={7} className="mb-2">
                        <Form.Control type="text" placeholder="Klucz" />
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button className="w-100" type="submit" variant="dark">Dodaj</Button>
                    </Col>
                </Row>
                
            </Form>

            <p className="fltr">Wszystkie klucze</p>

            <p className="fbbt mb-1">#1 - Wiedźmin 3</p>
            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Klucz</th>
                        <th className="no-border-top">Czy sprzedany?</th>
                        <th className="no-border-top"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Tak</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Nie</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr><td colspan="2"></td></tr>
                </tbody>
            </Table>

            <p className="fbbt mb-1">#2 - Skyrim</p>
            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Klucz</th>
                        <th className="no-border-top">Czy sprzedany?</th>
                        <th className="no-border-top"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Tak</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Nie</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr><td colspan="2"></td></tr>
                </tbody>
            </Table>

        </LayoutAdmin>
    );
}