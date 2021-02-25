import React, { useContext, useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";

export const AdminPlatformsPage = () => {
    const [platforms, setPlatforms] = useState([]);
    const [platform, setPlatform] = useState("");

    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch("/platforms").then((response) =>
            response.json().then((data) => {
                setPlatforms(data.platforms);
            })
        );
    }, []);
    if (!user || !user.isAdmin) return <ForbiddenPage />;

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
                            onClick={async (e) => {
                                e.preventDefault();

                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");
                                myHeaders.append("Authorization", "Bearer " + user.token);

                                var requestOptions = {
                                    method: "PUT",
                                    headers: myHeaders,
                                };
                                await fetch("/addplatform/" + platform, requestOptions).then(() => {
                                    fetch("/platforms").then((response) =>
                                        response.json().then((data) => {
                                            setPlatforms(data.platforms);
                                        })
                                    );
                                });
                            }}
                        >
                            Dodaj
                        </Button>
                    </Col>
                </Row>
            </Form>

            <p className="fltr">Wszystkie platformy</p>

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
                            <td>{platform.name}</td>
                            <td style={{ width: "60px" }}>
                                <Button className="icon p-0" variant="link">
                                    {" "}
                                    <XCircle
                                        className="text-black-50"
                                        size={20}
                                        onClick={async (e) => {
                                            e.preventDefault();

                                            var myHeaders = new Headers();
                                            myHeaders.append("Content-Type", "application/json");
                                            myHeaders.append(
                                                "Authorization",
                                                "Bearer " + user.token
                                            );

                                            var requestOptions = {
                                                method: "DELETE",
                                                headers: myHeaders,
                                            };
                                            await fetch(
                                                "/deleteplatform/" + platform.name,
                                                requestOptions
                                            ).then(() => {
                                                fetch("/platforms").then((response) =>
                                                    response.json().then((data) => {
                                                        setPlatforms(data.platforms);
                                                    })
                                                );
                                            });
                                        }}
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
        </LayoutAdmin>
    );
};
