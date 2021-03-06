import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { PencilSquare, XCircle } from "react-bootstrap-icons";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import request from "../helpers/request";
import { AddUserForm } from "../components/Forms/AddUserForm";
import { EditUserForm } from "../components/Forms/EditUserForm";

const TableOfAllUsers = ({ users, setIsUserEdited, setEditedUser }) => {
    const handleRemoveUser = async (id) => {
        try {
            const { status } = await request.put("/ban", { user_id: id });

            if (status === 200) {
                setIsUserEdited(true);
                setIsUserEdited(false);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Username</th>
                    <th className="no-border-top">Email</th>
                    <th className="no-border-top">Rola</th>
                    <th className="no-border-top">Akcje</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u, index) =>
                    u.role !== "banned" ? (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td style={{ width: "120px" }}>
                                <Button
                                    className="icon p-0 mr-3"
                                    href="#edituser"
                                    variant="link"
                                    onClick={() => setEditedUser(u)}
                                >
                                    {" "}
                                    <PencilSquare className="text-black-50" size={20} />
                                </Button>
                                <Button
                                    className="icon p-0"
                                    variant="link"
                                    onClick={() => handleRemoveUser(u.id)}
                                >
                                    {" "}
                                    <XCircle className="text-black-50" size={20} />{" "}
                                </Button>
                            </td>
                        </tr>
                    ) : null
                )}

                <tr>
                    <td colSpan="4"></td>
                </tr>
            </tbody>
        </Table>
    );
};

export const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [userAdded, setUserAdded] = useState(false);
    const [isUserEdited, setIsUserEdited] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, status } = await request.get("/allusers");

                if (status === 200) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        fetchData();
    }, [isUserEdited, userAdded]);

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj użytkownika</p>

            <AddUserForm setUserAdded={setUserAdded} />

            {userAdded ? <p className="text-success">Użytkownik został pomyślnie dodany</p> : null}

            <p className="fltr" id="edituser">
                Edytuj użytkownika
            </p>

            <EditUserForm
                setIsUserEdited={setIsUserEdited}
                users={users}
                editedUser={editedUser}
                setEditedUser={setEditedUser}
            />

            {isUserEdited ? (
                <p className="text-success">Użytkownik został pomyślnie zmodyfikowany</p>
            ) : null}

            <p className="fltr">Wszyscy użytkownicy</p>

            {users.length === 0 ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <TableOfAllUsers
                    users={users}
                    setIsUserEdited={setIsUserEdited}
                    setEditedUser={setEditedUser}
                />
            )}
        </LayoutAdmin>
    );
};
