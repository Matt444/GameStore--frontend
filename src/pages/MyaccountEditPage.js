import React, { useContext, useState } from "react";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutMyAccount } from "../layouts/LayoutMyAccount";
import { UserContext } from "../UserContext";
import { EmailChangeForm } from "../components/Forms/EmailChangeForm";
import { PassChangeForm } from "../components/Forms/PassChangeForm";

export const MyaccountEditPage = () => {
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [isPassChanged, setIsPassChanged] = useState(false);

    const { user } = useContext(UserContext);
    if (!user) return <ForbiddenPage />;

    return (
        <LayoutMyAccount>
            <p className="fltr">Zmień email</p>

            <EmailChangeForm setIsEmailChanged={setIsEmailChanged} />

            {isEmailChanged ? (
                <p className="mb-4 text-success">Email został pomyślnie zmieniony</p>
            ) : null}

            <p className="fltr">Zmień hasło</p>

            <PassChangeForm setIsPassChanged={setIsPassChanged} />

            {isPassChanged ? (
                <p className="mb-4 text-success">Hasło zostało pomyślnie zmienione</p>
            ) : null}
        </LayoutMyAccount>
    );
};
