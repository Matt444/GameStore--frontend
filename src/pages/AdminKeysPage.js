import React, { useContext, useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import request from "../helpers/request";
import { AddKeyForm } from "../components/Forms/AddKeyForm";

const TableOfKeys = ({ keys }) => (
    <Table responsive>
        <thead>
            <tr>
                <th className="no-border-top">Klucz</th>
                <th className="no-border-top" style={{ width: "250px" }}>
                    Czy sprzedany?
                </th>
                {/* <th className="no-border-top" style={{ width: "60px" }}></th> */}
            </tr>
        </thead>
        <tbody>
            {keys.map((key) => (
                <tr key={key.id}>
                    <td>{key.gkey}</td>
                    <td>{key.used ? "Tak" : "Nie"}</td>
                    {/* <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td> */}
                </tr>
            ))}

            <tr>
                <td colSpan="2"></td>
            </tr>
        </tbody>
    </Table>
);

export const AdminKeysPage = () => {
    const [games, setGames] = useState([]);
    const [keys, setKeys] = useState();
    const [keyAdded, setKeyAdded] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await request.post("/games/search", {
                    is_digital: [1],
                });

                setGames(data.games);
            } catch (error) {
                console.warn(error);
            }

            try {
                const { data } = await request.get("/keys");

                setKeys(data);
            } catch (error) {
                console.warn(error);
            }
        }

        fetchData();
    }, [keyAdded]);

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj klucz</p>

            <AddKeyForm setKeyAdded={setKeyAdded} games={games} />

            {keyAdded ? <p className="text-success">Klusz został pomyślnie dodany</p> : null}

            <p className="fltr">Wszystkie klucze</p>

            {keys === undefined ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : keys.length === 0 ? (
                <p className="fbbt mb-1">Brak</p>
            ) : (
                games.map((g) => {
                    const gameKeys = keys.filter((k) => k.game.id === g.id);

                    return gameKeys.length === 0 ? null : (
                        <div key={g.id}>
                            <p className="fbbt mb-1">
                                #{g.id} - {g.name}
                            </p>
                            <TableOfKeys keys={gameKeys} />
                        </div>
                    );
                })
            )}
        </LayoutAdmin>
    );
};
