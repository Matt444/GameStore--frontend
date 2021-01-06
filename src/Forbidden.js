import React from 'react';
import { Button } from 'react-bootstrap';

export const Forbidden = () => (
    <div className="mt-5">
        <h1 className="font-weight-bold">403 Forbidden</h1>
        <h2>Sorry, you have no power here ;)</h2>
        <Button href="/login" className="p-0 mb-1" variant="link" >Login</Button>
        <span className="fbbt"> or </span>
        <Button href="/" className="p-0 mb-1" variant="link">back to home</Button>
    </div>
);