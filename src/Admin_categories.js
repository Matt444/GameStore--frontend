import React from 'react';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { XCircle } from 'react-bootstrap-icons';

export const Admin_categories = () => (
    <LayoutAdmin>
        <p className="fltr">Dodaj kategorię</p>
        <Form className="mb-2">
            <Row>
                <Col lg={3} className="mb-2">
                    <Form.Control type="text" placeholder="Nazwa" />
                </Col>
                <Col lg={2} className="mb-2">
                    <Button className="w-100" type="submit" variant="dark">Dodaj</Button>
                </Col>
            </Row>
            
        </Form>

        <p className="fltr">Wszystkie kategorie</p>

        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Nazwa</th>
                    <th className="no-border-top"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Strategiczne</td>
                    <td style={{ width: "60px" }}>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr>
                    <td>Przygodowe</td>
                    <td style={{ width: "60px" }}>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </tbody>
        </Table>

    </LayoutAdmin>
);