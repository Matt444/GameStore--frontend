import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';


export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <main className="ml-auto mr-auto text-center" style={{ marginTop: "17vh", width: "350px" }}>
            <h1 className="mb-4">Zaloguj się</h1>
            <Form>
                <Form.Control className="mb-3" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <Form.Control className="mb-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <Button className="w-100" type="submit" variant="dark" value="Submit" onClick={(e) => {
                    e.preventDefault();
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({"username":username,"password":password});

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    const r = fetch("/auth", requestOptions)
                        .then(response => response.json())
                        .then(result => localStorage.setItem("jwt_token",result['access_token']))
                        .catch(error => console.log('error', error));
                }}>Zaloguj się</Button>
            </Form>
        </main>
    );
};