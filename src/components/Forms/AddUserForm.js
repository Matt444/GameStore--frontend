import { Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const AddUserForm = ({ setUserAdded }) => {
    const schemaUser = yup.object({
        username: yup.string().required("Username is required"),
        email: yup.string().email("Must be a valid email").required("Email is required"),
        password: yup.string().required("Password is required"),
        role: yup.string().not(["0"], "Choose role"),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                role: "",
            }}
            onSubmit={async (values, errors) => {
                setUserAdded(false);

                let url;
                if (values.role === "1") url = "/registeradmin";
                else url = "/register";

                try {
                    const { status } = await request.post(url, {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                    });

                    if (status === 201) {
                        setUserAdded(true);
                    }
                } catch (error) {
                    console.warn(error);
                    if (error.response.status === 409) {
                        errors.setFieldError(
                            "err",
                            "Użytkownik o takim loginie lub mailu już istnieje"
                        );
                    } else {
                        errors.setFieldError("err", "Server side eror");
                    }
                }
            }}
            validationSchema={schemaUser}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="mb-2" onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Col lg={3} className="mb-2">
                            <Form.Control
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={values.username}
                                onChange={handleChange}
                                isInvalid={touched.username && !!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={3} className="mb-2">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
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
                                value={values.password}
                                onChange={handleChange}
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
                                id="inlineFormCustomSelect"
                                custom
                                onChange={handleChange}
                                isInvalid={touched.role && !!errors.role}
                            >
                                <option value="0">Rola...</option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.role}
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
