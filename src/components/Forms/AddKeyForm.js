import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const AddKeyForm = ({ setKeyAdded, games }) => {
    const [game, setGame] = useState("Choose game...");
    const [id, setId] = useState();

    const schema = yup.object({
        game: yup.string().required("Choose game..."),
        key: yup.string().required(),
    });

    return (
        <Formik
            initialValues={{
                game: "",
                key: "",
            }}
            onSubmit={async (values, errors) => {
                setKeyAdded(false);

                try {
                    const { status } = await request.post("/addkey", {
                        game_id: id,
                        key: values.key,
                    });

                    if (status === 201) {
                        setKeyAdded(true);
                    }
                } catch (error) {
                    console.warn(error);
                    errors.setFieldError("err", "Key already exists");
                }
            }}
            validationSchema={schema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="mb-2" onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4} className="mb-2">
                            <DropdownButton
                                className="dropdown-fullw-light"
                                id="dropdown-basic-button"
                                variant="outline-secondary"
                                title={game}
                            >
                                {games.map((g) => (
                                    <Dropdown.Item
                                        key={g.id}
                                        onClick={(e) => {
                                            setGame(g.name);
                                            setId(g.id);
                                            values.game = game;
                                        }}
                                    >
                                        {g.id}: {g.name} - {g.price} zł
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            {errors.game ? <p className="text-danger">{errors.game}</p> : null}
                        </Col>
                        <Col lg={6} className="mb-2">
                            <Form.Control
                                name="key"
                                value={values.key}
                                type="text"
                                placeholder="Klucz"
                                onChange={handleChange}
                                isInvalid={touched.key && !!errors.key}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.key}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Button className="w-100" type="submit" variant="dark">
                                Dodaj
                            </Button>
                        </Col>
                    </Row>

                    {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                </Form>
            )}
        </Formik>
    );
};
