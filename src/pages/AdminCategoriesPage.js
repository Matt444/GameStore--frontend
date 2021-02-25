import React, {useEffect, useState} from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

import { ForbiddenPage } from './ForbiddenPage';
import { LayoutAdmin } from '../layouts/LayoutAdmin';

export const AdminCategoriesPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(() => {
        fetch("/categories").then(response =>
            response.json().then(data => {
                setCategories(data.categories);
            })
        );
    }, []);

    if(!props.token || props.role !== 'admin')
        return <ForbiddenPage />;
        
    return (

        <LayoutAdmin>
            <p className="fltr">Dodaj kategorię</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <Form.Control type="text" placeholder="Nazwa" onChange={e => setCategory(e.target.value)}/>
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button className="w-100" type="submit" variant="dark" onClick={ (e) => {
                            e.preventDefault();

                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer " + props.token);

                            fetch("/addcategory/" + category, {
                                method: 'PUT',
                                headers: myHeaders
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                })
                                .then(() => {
                                    fetch("/categories").then(response =>
                                        response.json().then(data => {
                                            setCategories(data.categories);
                                        })
                                    );
                                });
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
                            <Button className="icon p-0" variant="link" onClick={ async (e) => {
                                e.preventDefault();

                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");
                                myHeaders.append("Authorization", "Bearer " + props.token);

                                var requestOptions = {
                                    method: 'DELETE',
                                    headers: myHeaders
                                };
                                await fetch("/deletecategory/" + category.name, requestOptions)
                                    .then(() => {
                                        fetch("/categories").then(response =>
                                            response.json().then(data => {
                                                setCategories(data.categories);
                                            })
                                        );
                                    });
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
}