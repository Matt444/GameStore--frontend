import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    username: yup.string().min(2).max(15).required(),
    password: yup.string().min(2).max(15).required(),
});

export const Login = ({ setToken, setRole }) => {


    return (
        
        <main className="ml-auto mr-auto text-center" style={{ marginTop: "17vh", width: "350px" }}>
            <h1 className="mb-4">Zaloguj się</h1>
            <Formik 
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values, errors) => {     
                    fetch('/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                    })
                    .then(res => {
                        if(res.ok) {
                            return res.json();
                        } else {
                            errors.setFieldError('all', 'Invalid username or password');
                        }
                    })
                    .then(data => {
                        setToken(data.access_token);
                        setRole(data.user.role);
                        window.location.replace("/");
                    })
                    .catch(error => console.log('error', error));       
                }}
                validationSchema={schema}
            >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (

                <Form onSubmit={handleSubmit}>
                    <Form.Control  type="text" name="username" value={values.username} placeholder="Username" onChange={handleChange}
                        isInvalid={touched.username && !!errors.username} />
                    <Form.Control.Feedback  type="invalid">{errors.username}</Form.Control.Feedback>
                    <p className="mb-3"></p>
                    <Form.Control type="password" name="password" value={values.password} placeholder="Password" onChange={handleChange} 
                        isInvalid={touched.password && !!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <p className="mb-4 text-danger">{errors.all}</p>
                    <Button className="w-100" type="submit" variant="dark">Zaloguj się</Button>
                </Form>

            )}
            </Formik>
            <div className="mt-2">
                <span className="fbbt">Nie masz konta? </span>
                <Button href="/register" className="p-0 mb-1" variant="link">Zarejestruj się</Button>
            </div>
            
        </main>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}