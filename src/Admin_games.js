import React, { useState } from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { BoxArrowUpRight, PencilSquare, XCircle } from 'react-bootstrap-icons';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import DatePicker from 'react-date-picker';



export const Admin_games = (props) => {
    const [value, onChange] = useState(new Date());

    if(!props.token || props.role != 'admin')
        return <Forbidden />;
        
    return (
    <LayoutAdmin>
        <p className="fltr">Dodaj grę</p>
        <Form className="mb-2">
            <Row>
                <Col lg={6} className="mb-2">
                    <Form.Control type="text" placeholder="Nazwa" />
                </Col>
                <Col lg={2} className="mb-2">
                    <Form.Control type="text" placeholder="Cena (zł)" />
                </Col>
                <Col lg={4} className="mb-2">
                    <Form.Control type="text" placeholder="Ilość wersji pudełkowej" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={3}>
                    <DropdownMultiselect buttonClass="mb-2 dropdownmulti-light" placeholder="Kategorie"
                        options={["Strategiczne", "Przygodowe", "Strzelanki"]}
                        name="countries"
                    />
                    
                    <DropdownButton className="mb-2 dropdown-fullw-light" variant="outline-secondary" id="dropdown-basic-button" title="Platforma">
                        <Dropdown.Item href="#/action-1">PC</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">PS4</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={3}>
                    <Form.Control className="mb-2" type="text" placeholder="Wiek" />
                    <DatePicker
                        className="calendar mb-2"
                        onChange={onChange}
                        value={value}
                    />
                </Col>
               
                <Col lg={6} className="mb-2" >
                    <Form.Control as="textarea" style={{ height: "100%"}} rows={2} placeholder="Opis" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={2} className="offset-lg-10 mb-2">
                    <Button className="w-100" type="submit" variant="dark">Dodaj</Button>
                </Col>
            </Row>
            
        </Form>

        <p className="fltr">Edytuj grę</p>
        <Form className="mb-2">
            <Row>
                <Col lg={6} className="mb-2">
                    <DropdownButton className="dropdown-fullw-light" variant="outline-secondary" id="dropdown-basic-button" title="Nazwa">
                        <Dropdown.Item href="#/action-1">Twierdza</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={2} className="mb-2">
                    <Form.Control type="text" placeholder="Cena (zł)" />
                </Col>
                <Col lg={4} className="mb-2">
                    <Form.Control type="text" placeholder="Ilość wersji pudełkowej" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={3}>
                    <DropdownMultiselect buttonClass="mb-2 dropdownmulti-light" placeholder="Kategorie"
                        options={["Strategiczne", "Przygodowe", "Strzelanki"]}
                        name="countries"
                    />
                    
                    <DropdownButton className="mb-2 dropdown-fullw-light" variant="outline-secondary" id="dropdown-basic-button" title="Platforma">
                        <Dropdown.Item href="#/action-1">PC</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">PS4</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={3}>
                    <Form.Control className="mb-2" type="text" placeholder="Wiek" />
                    <DatePicker
                        className="calendar mb-2"
                        onChange={onChange}
                        value={value}
                    />
                </Col>
               
                <Col lg={6} className="mb-2" >
                    <Form.Control as="textarea" style={{ height: "100%"}} rows={2} placeholder="Opis" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={3} className="offset-lg-7 mb-2">
                    <Button className="w-100" type="submit" variant="outline-dark">Dodaj klucze</Button>
                </Col>
                <Col lg={2} className="mb-2">
                    <Button className="w-100" type="submit" variant="dark">Zastosuj</Button>
                </Col>
            </Row>
            
        </Form>

        <p className="fltr">Wszystkie gry</p>

        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Nazwa</th>
                    <th className="no-border-top">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Wiedźmin 3</td>
                    <td style={{ width: "120px" }}>
                        <Button className="icon p-0 mr-2 pb-1" variant="link"> <BoxArrowUpRight className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0 mr-2" variant="link"> <PencilSquare className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr>
                    <td>Twierdza</td>
                    <td style={{ width: "120px" }}>
                        <Button className="icon p-0 mr-2 pb-1" variant="link"> <BoxArrowUpRight className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0 mr-2" variant="link"> <PencilSquare className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </tbody>
        </Table>

    </LayoutAdmin>
    )
};