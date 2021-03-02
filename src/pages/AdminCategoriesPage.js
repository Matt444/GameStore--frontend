import React, { useContext, useEffect, useState } from "react";
import { Table, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import request from "../helpers/request";

const TableOfCategories = ({ categories, onRemoveCategory }) => (
    <Table responsive>
        <thead>
            <tr>
                <th className="no-border-top">Nazwa</th>
                <th className="no-border-top"></th>
            </tr>
        </thead>
        <tbody>
            {categories.map((category) => (
                <tr key={category.id}>
                    <td>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</td>
                    <td style={{ width: "60px" }}>
                        <Button
                            className="icon p-0"
                            variant="link"
                            onClick={(event) => onRemoveCategory(event, category.name)}
                        >
                            <XCircle className="text-black-50" size={20} />
                        </Button>
                    </td>
                </tr>
            ))}

            <tr>
                <td colSpan="2"></td>
            </tr>
        </tbody>
    </Table>
);

export const AdminCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await request("/categories");
            setCategories(data.categories || []);
        };
        fetchData();
    }, []);

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    const handleAddCategory = async (event) => {
        event.preventDefault();

        try {
            const { status } = await request.put(`/addcategory/${category}`);

            if (status === 201) {
                const { data } = await request("/categories");
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const handleRemoveCategory = async (event, category) => {
        event.preventDefault();

        try {
            const { status } = await request.delete(`/deletecategory/${category}`);

            if (status === 201) {
                const { data } = await request("/categories");
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj kategorię</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Nazwa"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button
                            className="w-100"
                            type="submit"
                            variant="dark"
                            onClick={(event) => handleAddCategory(event)}
                        >
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>

            <p className="fltr">Wszystkie kategorie</p>

            {categories.length === 0 ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <TableOfCategories
                    categories={categories}
                    onRemoveCategory={handleRemoveCategory}
                />
            )}
        </LayoutAdmin>
    );
};
