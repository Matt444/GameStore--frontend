import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
        <main className="ml-auto mr-auto text-center" style={{marginTop: "17vh", width: "350px"}}>
            <h1 className="mb-4">Zarejestruj się</h1>
            <Form>
                <Form.Control className="mb-3" type="text" placeholder="Username"  onChange={e => setUsername(e.target.value)}/>
                <Form.Control className="mb-3" type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
                <Form.Control className="mb-4" type="text" placeholder="Email"  onChange={e => setEmail(e.target.value)}/>
                <Button className="w-100" type="submit" variant="dark" onClick={() => {
                    var requestOptions = {
                        method: 'POST'
                    };
                    fetch("http://localhost:5000/register?username=" + username +"&password=" + password +"&email=" + email, requestOptions)
                }}
                >Zarejestruj się
                    </Button>
            </Form>
        </main>
    );
};