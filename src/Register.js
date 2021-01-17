import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    username: yup.string().min(2).max(15).required(),
    email: yup.string().min(2).max(45).email().required(),
    password: yup.string().min(8).max(50).required(),
});

export const Register = () => {

    return (
        <main className="ml-auto mr-auto text-center" style={{marginTop: "17vh", width: "350px"}}>
            <h1 className="mb-4">Zarejestruj się</h1>
            <Formik 
                initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                onSubmit={(values, errors) => {     
                    fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                    })
                    .then(res => {
                        if(res.ok) {
                            window.location.replace("/");
                        } else {
                            errors.setFieldError('err', 'Username or email already taken');
                        }
                    })
                    .catch(error => console.log('error', error));       
                }}
                validationSchema={schema}
            >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Control name="username" value={values.username} type="text" placeholder="Username"
                        onChange={handleChange} isInvalid={touched.username && !!errors.username}/>
                    <Form.Control.Feedback  type="invalid">{errors.username}</Form.Control.Feedback>
                    <p className="mb-3"></p>
                    
                    <Form.Control name="email" value={values.email} type="text" placeholder="Email"
                        onChange={handleChange} isInvalid={touched.email && !!errors.email}/>
                    <Form.Control.Feedback  type="invalid">{errors.email}</Form.Control.Feedback>
                    <p className="mb-3"></p>
                    
                    <Form.Control name="password" value={values.password} type="password" placeholder="Password"
                        onChange={handleChange} isInvalid={touched.password && !!errors.password}/>
                    <Form.Control.Feedback  type="invalid">{errors.password}</Form.Control.Feedback>
                    <p className="mb-4 text-danger">{errors.err}</p>
                    <p className="mb-4"></p>
                    <Button className="w-100" type="submit" variant="dark">Zarejestruj się</Button>
                </Form>
            )}
            </Formik>

        </main>
    );
};