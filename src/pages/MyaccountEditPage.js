import React, { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutMyAccount } from "../layouts/LayoutMyAccount";
import { UserContext } from "../UserContext";

const schemaEmail = yup.object({
    email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
});

const schemaPass = yup.object({
    currpass: yup
        .string()
        .min(2, "Password is too short")
        .max(15, "Password is too long")
        .required("Enter your current password"),
    password: yup
        .string()
        .min(2, "Password is too short")
        .max(15, "Password is too long")
        .required("Enter your new password"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const MyaccountEditPage = () => {
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [isPassChanged, setIsPassChanged] = useState(false);

    const { user } = useContext(UserContext);
    if (!user) return <ForbiddenPage />;

    return (
        <LayoutMyAccount>
            <p className="fltr">Zmień email</p>

            {isEmailChanged === false ? (
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        fetch("/chemail", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + user.token,
                            },
                            body: JSON.stringify({ newemail: values.email }),
                        }).then((res) => {
                            if (res.ok) {
                                console.log("Zmieniono emial");
                                setIsEmailChanged(true);
                            } else {
                                throw Error("Wystąpił błąd");
                            }
                        });
                    }}
                    validationSchema={schemaEmail}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        isValid,
                        errors,
                        touched,
                    }) => (
                        <Form
                            className="mb-4"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <Row>
                                <Col>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.email && !!errors.email
                                        }
                                        placeholder="Wpisz nowy email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col>
                                    <Button variant="dark" type="submit">
                                        Zastosuj
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p className="mb-4 text-success">
                    Email został pomyślnie zmieniony
                </p>
            )}

            <p className="fltr">Zmień hasło</p>

            {isPassChanged === false ? (
                <Formik
                    initialValues={{
                        currpass: "",
                        password: "",
                        passwordConfirmation: "",
                    }}
                    onSubmit={(values, errors) => {
                        console.log(values);
                        fetch("/chpass", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + user.token,
                            },
                            body: JSON.stringify({
                                oldpass: values.currpass,
                                newpass: values.password,
                            }),
                        }).then((res) => {
                            if (res.ok) {
                                console.log("Zmieniono hasło");
                                setIsPassChanged(true);
                            } else {
                                errors.setFieldError(
                                    "currpass",
                                    "Invalid password"
                                );
                            }
                        });
                    }}
                    validationSchema={schemaPass}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        isValid,
                        errors,
                        touched,
                    }) => (
                        <Form onSubmit={handleSubmit} noValidate>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Control
                                        name="currpass"
                                        type="password"
                                        value={values.currpass}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.currpass &&
                                            !!errors.currpass
                                        }
                                        placeholder="Wpisz aktualne hasło"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.currpass}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.password &&
                                            !!errors.password
                                        }
                                        placeholder="Wpisz nowe hasło"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        name="passwordConfirmation"
                                        type="password"
                                        value={values.passwordConfirmation}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.passwordConfirmation &&
                                            !!errors.passwordConfirmation
                                        }
                                        placeholder="Powtórz nowe hasło"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordConfirmation}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks good!
                                    </Form.Control.Feedback>
                                </Col>
                                <Col>
                                    <Button variant="dark" type="submit">
                                        Zastosuj
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p className="mb-4 text-success">
                    Hasło zostało pomyślnie zmienione
                </p>
            )}
        </LayoutMyAccount>
    );
};
