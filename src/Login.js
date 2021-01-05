import React from 'react';
import { Form, Button } from 'react-bootstrap';


export const Login = () => (
    <main className="ml-auto mr-auto text-center" style={{ marginTop: "17vh", width: "350px" }}>
        <h1 className="mb-4">Zaloguj się</h1>
        <Form>
            <Form.Control className="mb-3" type="text" placeholder="Username" />
            <Form.Control className="mb-4" type="password" placeholder="Password" />
            <Button className="w-100" type="submit" variant="dark">Zaloguj się</Button>
        </Form>
    </main>
);