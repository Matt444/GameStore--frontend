import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const EditUserForm = ({ setIsUserEdited, users, editedUser, setEditedUser }) => {
    const [usrid, setUsrid] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("0");

    useEffect(() => {
        if (editedUser) {
            setUsrid(editedUser.id);
            setUsername(editedUser.username);
            setEmail(editedUser.email);
            setRole(editedUser.role);
        }
    }, [editedUser]);

    const schemaEditUser = yup.object({
        username: yup.string(),
        email: yup.string().email("Must be a valid email"),
        password: yup.string().min(6),
        role: yup.string(),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                role: "",
            }}
            onSubmit={async (errors) => {
                setIsUserEdited(false);

                if (usrid === "") {
                    errors.setFieldError("err", "Wybierz użytkownika...");
                } else {
                    try {
                        const { status } = await request.patch(`/users/${usrid}`, {
                            email: email || undefined,
                            password: password || undefined,
                            role: role || undefined,
                        });

                        if (status === 200) {
                            setIsUserEdited(true);
                        }
                    } catch (error) {
                        if (error.response.status === 409) {
                            errors.setFieldError(
                                "err",
                                "Użytkownik o takim loginie lub mailu już istnieje"
                            );
                        } else {
                            errors.setFieldError("err", "Server side eror");
                        }
                    }
                }
            }}
            validationSchema={schemaEditUser}
        >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form className="mb-2" onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Col lg={3} className="mb-2">
                            <DropdownButton
                                className="dropdown-fullw-light"
                                id="dropdown-basic-button"
                                variant="outline-secondary"
                                title={username === "" ? "Wybierz użytkownika" : username}
                            >
                                {users &&
                                    users.map((u, index) =>
                                        u.role !== "banned" ? (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={() => {
                                                    setEditedUser(u);
                                                    setUsername(u.username);
                                                    setUsrid(u.id);
                                                    values.username = username;
                                                }}
                                            >
                                                {u.username}
                                            </Dropdown.Item>
                                        ) : (
                                            ""
                                        )
                                    )}
                            </DropdownButton>
                        </Col>
                        <Col lg={3} className="mb-2">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    values.email = e.target.value;
                                }}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    values.password = e.target.value;
                                }}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Form.Control
                                name="role"
                                as="select"
                                className="mr-sm-2"
                                custom
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    values.role = e.target.value;
                                }}
                                value={role}
                                isInvalid={touched.role && !!errors.role}
                            >
                                <option key="0" value="">
                                    Rola...
                                </option>
                                <option key="1" value="admin">
                                    Admin
                                </option>
                                <option key="2" value="user">
                                    User
                                </option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.role}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Button className="w-100" type="submit" variant="dark">
                                Zastosuj
                            </Button>
                        </Col>
                    </Row>
                    {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                </Form>
            )}
        </Formik>
    );
};
