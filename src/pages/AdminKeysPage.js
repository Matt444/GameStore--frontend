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
                    <td>{key.key}</td>
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
    const [keyAdded, setKeyAdded] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let i = 1;
            let totalPages = 1;
            let arr = [];

            while (i <= totalPages) {
                try {
                    const { data, status } = await request.post("/games", {
                        search_filter: { digital: 1, page_number: i },
                    });

                    if (status === 200) {
                        totalPages = Math.ceil(data.total_number / data.results_per_page);
                        arr = await arr.concat(data.games);
                    }
                } catch (error) {
                    console.warn(error);
                }

                i++;
            }
            await Promise.all(
                arr.map(async (g, index) => {
                    try {
                        const { data, status } = await request.get(`/keys?game_id=${g.id}`);

                        if (status === 200) {
                            arr[index].keys = data.keys;
                        }
                    } catch (error) {
                        console.warn(error);
                    }
                })
            );

            setGames(arr);
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

            {games.length === 0 ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                games.map((g) =>
                    g.keys.length > 0 ? (
                        <div key={g.id}>
                            <p className="fbbt mb-1">
                                #{g.id} - {g.name}
                            </p>
                            <TableOfKeys keys={g.keys} />
                        </div>
                    ) : null
                )
            )}
        </LayoutAdmin>
    );
};
