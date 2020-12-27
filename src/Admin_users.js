import React from 'react';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { PencilSquare, XCircle } from 'react-bootstrap-icons';

export const Admin_users = () => (
    <LayoutAdmin>
        <p className="fltr">Dodaj użytkownika</p>
        <Form className="mb-2">
            <Row>
                <Col lg={3} className="mb-2">
                    <Form.Control type="text" placeholder="Username" />
                </Col>
                <Col lg={3} className="mb-2">
                    <Form.Control type="email" placeholder="Email" />
                </Col>
                <Col lg={2} className="mb-2">
                    <Form.Control type="password" placeholder="Password" />
                </Col>
                <Col lg={2} className="mb-2">
                    <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button" variant="outline-secondary" title="Role">
                        <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">User</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={2} className="mb-2">
                    <Button className="w-100" type="submit" variant="dark">Dodaj</Button>
                </Col>
            </Row>
            
        </Form>

        <p className="fltr">Edytuj użytkownika</p>
        <Form className="mb-2">
            <Row>
                <Col lg={3} className="mb-2">
                    <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button" variant="outline-secondary" title="Choose username">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={3} className="mb-2">
                    <Form.Control type="email" placeholder="Email" />
                </Col>
                <Col lg={2} className="mb-2">
                    <Form.Control type="password" placeholder="Password" />
                </Col>
                <Col lg={2} className="mb-2">
                    <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button" variant="outline-secondary" title="Role">
                        <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">User</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={2} className="mb-2">
                    <Button className="w-100" type="submit" variant="dark">Zastosuj</Button>
                </Col>
            </Row>
        </Form>

        <p className="fltr">Wszyscy użytkownicy</p>

        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Username</th>
                    <th className="no-border-top">Email</th>
                    <th className="no-border-top">Role</th>
                    <th className="no-border-top">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Admin</td>
                    <td>admin@mail.com</td>
                    <td>Admin</td>
                    <td style={{ width: "120px" }}>
                        <Button className="icon p-0 mr-3" variant="link"> <PencilSquare className="text-black-50" size={20} /></Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr>
                    <td>Andrzej</td>
                    <td>andrzej@mail.com</td>
                    <td>User</td>
                    <td style={{ width: "120px" }}>
                        <Button className="icon p-0 mr-3" variant="link"> <PencilSquare className="text-black-50" size={20} /></Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </tbody>
        </Table>

    </LayoutAdmin>
);