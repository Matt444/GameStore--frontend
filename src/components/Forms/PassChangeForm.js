import { Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const PassChangeForm = ({ setIsPassChanged }) => {
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

    return (
        <Formik
            initialValues={{
                currpass: "",
                password: "",
                passwordConfirmation: "",
            }}
            onSubmit={async (values, errors) => {
                setIsPassChanged(false);
                try {
                    const { status } = await request.put("/chpass", {
                        oldpass: values.currpass,
                        newpass: values.password,
                    });

                    if (status === 200) {
                        setIsPassChanged(true);
                    }
                } catch (error) {
                    if (error.response.status === 401) {
                        errors.setFieldError("currpass", "Invalid password");
                    } else {
                        console.warn(error);
                    }
                }
            }}
            validationSchema={schemaPass}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="mb-4" onSubmit={handleSubmit} noValidate>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="currpass"
                                type="password"
                                value={values.currpass}
                                onChange={handleChange}
                                isInvalid={touched.currpass && !!errors.currpass}
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
                                isInvalid={touched.password && !!errors.password}
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
                                    touched.passwordConfirmation && !!errors.passwordConfirmation
                                }
                                placeholder="Powtórz nowe hasło"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
    );
};
