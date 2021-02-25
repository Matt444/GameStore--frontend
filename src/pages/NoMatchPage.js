import React from 'react';
import { Button } from 'react-bootstrap';

export const NoMatchPage = () => (
    <div className="mt-5">
        <h1 className="font-weight-bold">404 Not found</h1>
        <h2>Nothing to see here ;)</h2>
        <Button href="/" className="p-0 mb-1" variant="link">Back to home</Button>
    </div>
)