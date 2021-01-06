import React from 'react';
import { Forbidden } from './Forbidden';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { LayoutMyAccount } from './components/LayoutMyAccount';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(2).max(15).required(),
    password2: yup.string().min(2).max(15).required(),
});

export const User_edit = (props) => {
    if(!props.token)
        return <Forbidden />;

    return (
        <LayoutMyAccount>
            <p className="fltr">Zmień email</p>

            <Formik 
                initialValues={{
                    email: '',
                }}
                onSubmit={values => {                
                    console.log(values);
                }}
                validationSchema={schema}
            >
                {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (

                    <Form className="mb-4" onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col>
                                <Form.Control name="email" type="email" value={values.email} onChange={handleChange}
                                    isInvalid={touched.email && !!errors.email} isValid={touched.email && !errors.email} placeholder="Wpisz nowy email" />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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

            <p className="fltr">Zmień hasło</p>

            <Formik 
                initialValues={{
                    password: '',
                    password2: ''
                }}
                onSubmit={values => {
                    console.log(values);
                }}
                validationSchema={schema}
            >

            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form onSubmit={handleSubmit} noValidate>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control name="password" type="password" value={values.password} onChange={handleChange}
                                isInvalid={touched.password && !!errors.password} isValid={touched.password && !errors.password} 
                                placeholder="Wpisz nowe hasło" />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control name="password2" type="password" value={values.password2} onChange={handleChange}
                                isInvalid={touched.password2 && !!errors.password2} isValid={touched.password2 && !errors.password2} 
                                placeholder="Powtórz nowe hasło" />
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

        </LayoutMyAccount>
    );
}