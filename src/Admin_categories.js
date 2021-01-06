import React, {useEffect, useState} from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { XCircle } from 'react-bootstrap-icons';


export const Admin_categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(() => {
        fetch("/categories").then(response =>
            response.json().then(data => {
                setCategories(data.categories);
            })
        );
    }, []);

    if(!props.token || props.role != 'admin')
        return <Forbidden />;
        
    return (

        <LayoutAdmin>
            <p className="fltr">Dodaj kategorię</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <Form.Control type="text" placeholder="Nazwa" onChange={e => setCategory(e.target.value)}/>
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button className="w-100" type="submit" variant="dark" onClick={async () => {
                            var requestOptions = {
                                method: 'POST'
                            };
                            fetch("/addcategory?name=" + category, requestOptions)

                        }}>Dodaj</Button>
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

                {categories.map(category =>
                    <tr>
                        <td>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</td>
                        <td style={{width: "60px"}}>
                            <Button className="icon p-0" variant="link" onClick={async () => {
                                var requestOptions = {
                                    method: 'POST'
                                };
                                fetch("/delcategory?name=" + category.name, requestOptions)
                                window.location.reload()
                            }}><XCircle className="text-black-50" size={20}/>
                            </Button>
                        </td>
                    </tr>)}

                <tr>
                    <td colspan="2"></td>
                </tr>
                </tbody>
            </Table>

        </LayoutAdmin>
    );
};