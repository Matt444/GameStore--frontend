import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { UserContext } from "../UserContext";
import { LoginForm } from "../components/Forms/LoginForm";

export const LoginPage = () => {
    const { setUser } = useContext(UserContext);

    return (
        <main className="ml-auto mr-auto text-center" style={{ marginTop: "17vh", width: "350px" }}>
            <h1 className="mb-4">Zaloguj się</h1>

            <LoginForm setUser={setUser} />

            <div className="mt-2">
                <span className="fbbt">Nie masz konta? </span>
                <Button href="/register" className="p-0 mb-1" variant="link">
                    Zarejestruj się
                </Button>
            </div>
        </main>
    );
};
