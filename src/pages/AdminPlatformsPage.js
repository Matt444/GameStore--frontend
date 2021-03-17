import React, { useContext, useEffect, useState } from "react";
import { Table, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import request from "../helpers/request";

const TableOfPlatforms = ({ platforms, onRemovePlatform }) => (
    <Table responsive>
        <thead>
            <tr>
                <th className="no-border-top">Nazwa</th>
                <th className="no-border-top"></th>
            </tr>
        </thead>
        <tbody>
            {platforms.map((platform) => (
                <tr key={platform.id}>
                    <td>{platform.name.toUpperCase()}</td>
                    <td style={{ width: "60px" }}>
                        <Button className="icon p-0" variant="link">
                            {" "}
                            <XCircle
                                className="text-black-50"
                                size={20}
                                onClick={(event) => onRemovePlatform(event, platform.id)}
                            />{" "}
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

export const AdminPlatformsPage = () => {
    const [platforms, setPlatforms] = useState();
    const [platform, setPlatform] = useState("");

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await request.get("/platforms");
            setPlatforms(data || []);
        };
        fetchData();
    }, []);
    if (!user || !user.isAdmin) return <ForbiddenPage />;

    const handleAddPlatform = async (event) => {
        event.preventDefault();

        try {
            const { status } = await request.post(`/platforms/`, { name: platform });

            if (status === 201) {
                const { data } = await request.get("/platforms");
                setPlatforms(data || []);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const handleRemovePlatform = async (event, id) => {
        event.preventDefault();

        try {
            const { status } = await request.delete(`/platforms/${id}`);

            if (status === 200) {
                const { data } = await request.get("/platforms");
                setPlatforms(data);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj platformę</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Nazwa"
                            onChange={(e) => setPlatform(e.target.value)}
                        />
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button
                            className="w-100"
                            type="submit"
                            variant="dark"
                            onClick={(event) => handleAddPlatform(event)}
                        >
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>

            <p className="fltr">Wszystkie platformy</p>

            {platforms === undefined ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : platforms.length === 0 ? (
                <p className="fbbt mb-1">Brak</p>
            ) : (
                <TableOfPlatforms platforms={platforms} onRemovePlatform={handleRemovePlatform} />
            )}
        </LayoutAdmin>
    );
};
