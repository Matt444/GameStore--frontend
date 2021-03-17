import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const RegisterUserForm = ({ setUser }) => {
    const schema = yup.object({
        username: yup.string().min(2).max(15).required(),
        email: yup.string().min(2).max(45).email().required(),
        password: yup.string().min(8).max(50).required(),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
            }}
            onSubmit={async (values, errors) => {
                try {
                    const { status } = await request.post("/auth/register", values);

                    if (status === 201) {
                        const { data } = await request.post("/auth/login", {
                            username: values.username,
                            password: values.password,
                        });

                        const user = {
                            token: data.token,
                            isAdmin: data.role === "admin",
                        };
                        setUser(user);

                        window.location.replace("/");
                    }
                } catch (error) {
                    if (error.response.status === 409) {
                        errors.setFieldError("err", "Username or email already taken");
                    } else {
                        console.warn(error);
                    }
                }
            }}
            validationSchema={schema}
        >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="pr-1">
                            <Form.Control
                                name="username"
                                value={values.username}
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                isInvalid={touched.username && !!errors.username}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                            <p className="mb-3"></p>
                        </Col>

                        <Col className="pl-1">
                            <Form.Control
                                name="email"
                                value={values.email}
                                type="text"
                                placeholder="Email"
                                onChange={handleChange}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                            <p className="mb-3"></p>
                        </Col>
                    </Row>

                    <Form.Control
                        name="password"
                        value={values.password}
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <p className="mb-4 text-danger">{errors.err}</p>
                    <p className="mb-4"></p>
                    <Button className="w-100" type="submit" variant="dark">
                        Zarejestruj się
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
