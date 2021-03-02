import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import request from "../helpers/request";
import { AddGameForm } from "../components/Forms/AddGameForm";
import { EditGameForm } from "../components/Forms/EditGameForm";

const TableOfAllGames = ({ allGames, setEditedGame }) => (
    <Table responsive>
        <thead>
            <tr>
                <th className="no-border-top">Nazwa</th>
                <th className="no-border-top">Platforma</th>
                <th className="no-border-top">Forma</th>
                <th className="no-border-top">Wiek</th>
                <th className="no-border-top">Ilość</th>
                <th className="no-border-top">Cena</th>
                <th className="no-border-top" style={{ width: "60px" }}></th>
            </tr>
        </thead>
        <tbody>
            {allGames
                ? allGames.map((g, index) => (
                      <tr key={g.id}>
                          <td>{g.name}</td>
                          <td>{g.platform.name.toUpperCase()}</td>
                          <td>{g.is_digital ? "KEY" : "BOX"}</td>
                          <td>{g.age_category}</td>
                          <td>{g.quantity}</td>
                          <td>{g.price} zł</td>

                          <td>
                              {/* <Button className="icon p-0 mr-2 pb-1" variant="link"> <BoxArrowUpRight className="text-black-50" size={20} /> </Button> */}
                              <Button className="icon p-0 mr-2" href="#edit" variant="link">
                                  {" "}
                                  <PencilSquare
                                      className="text-black-50"
                                      size={20}
                                      onClick={() => setEditedGame(g)}
                                  />{" "}
                              </Button>
                              {/* <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button> */}
                          </td>
                      </tr>
                  ))
                : null}
            <tr>
                <td colSpan="2"></td>
            </tr>
        </tbody>
    </Table>
);

export const AdminGamesPage = () => {
    const [allGames, setAllGames] = useState([]);
    const [editedGame, setEditedGame] = useState();

    const [allPlatforms, setAllPlatforms] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [isGameAdded, setIsGameAdded] = useState(false);
    const [isGameEdited, setIsGameEdited] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            let i = 1;
            let totalPages = 1;
            let arr = [];

            while (i <= totalPages) {
                try {
                    const { data, status } = await request.post("/games", {
                        search_filter: {
                            digital: -1,
                            page_number: i,
                        },
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
            setAllGames(arr);
        };
        fetchData();
    }, [isGameAdded, isGameEdited]);

    useEffect(() => {
        request.get("/categories").then(({ data }) => {
            setAllCategories(data.categories || []);
        });

        request.get("/platforms").then(({ data }) => {
            setAllPlatforms(data.platforms || []);
        });
    }, []);

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj grę</p>

            <AddGameForm
                setGameAdded={setIsGameAdded}
                allCategories={allCategories}
                allPlatforms={allPlatforms}
                updateGames
            />

            {isGameAdded ? <p className="text-success">Gra została pomyślnie dodana</p> : null}

            <p className="fltr" id="edit">
                Edytuj grę
            </p>

            <EditGameForm
                allGames={allGames}
                allPlatforms={allPlatforms}
                allCategories={allCategories}
                editedGame={editedGame}
                setEditedGame={setEditedGame}
                setIsGameEdited={setIsGameEdited}
            />

            {isGameEdited ? (
                <p className="text-success">Gra została pomyślnie zmodyfikowana</p>
            ) : null}

            <p className="fltr">Wszystkie gry</p>

            {allGames.length === 0 ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <TableOfAllGames allGames={allGames} setEditedGame={setEditedGame} />
            )}
        </LayoutAdmin>
    );
};
