import { Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

export const EmailChangeForm = ({ setIsEmailChanged }) => {
    const schemaEmail = yup.object({
        email: yup.string().email("Must be a valid email").required("Email is required"),
    });

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            onSubmit={async (values) => {
                setIsEmailChanged(false);
                try {
                    const { status } = await request.put("/chemail", {
                        newemail: values.email,
                    });
                    if (status === 200) {
                        setIsEmailChanged(true);
                    }
                } catch (error) {
                    console.warn(error);
                }
            }}
            validationSchema={schemaEmail}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="mb-4" onSubmit={handleSubmit} noValidate>
                    <Row>
                        <Col>
                            <Form.Control
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={touched.email && !!errors.email}
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
    );
};
