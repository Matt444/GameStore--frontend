import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const LoginForm = ({ setUser }) => {
    const schema = yup.object({
        username: yup.string().min(2).max(15).required(),
        password: yup.string().min(2).max(15).required(),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={async (values, errors) => {
                try {
                    const { status, data } = await request.post("/auth/login", values);

                    if (status === 200) {
                        const user = {
                            token: data.token,
                            isAdmin: data.role === "admin",
                        };
                        setUser(user);
                        window.location = "/";
                    }
                } catch (error) {
                    if (error.response.status === 404) {
                        errors.setFieldError("all", "Invalid username or password");
                    } else {
                        console.warn(error);
                    }
                }
            }}
            validationSchema={schema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        placeholder="Username"
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    <p className="mb-3"></p>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <p className="mb-4 text-danger">{errors.all}</p>
                    <Button className="w-100" type="submit" variant="dark">
                        Zaloguj się
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
