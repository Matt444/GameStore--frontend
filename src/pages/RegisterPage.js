import React, { useContext } from "react";

import { UserContext } from "../UserContext";
import { RegisterUserForm } from "../components/Forms/RegisterUserForm";

export const RegisterPage = () => {
    const { setUser } = useContext(UserContext);

    return (
        <main className="ml-auto mr-auto text-center" style={{ marginTop: "17vh", width: "450px" }}>
            <h1 className="mb-4">Zarejestruj się</h1>
            <RegisterUserForm setUser={setUser} />
        </main>
    );
};
