import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Alert } from "react-bootstrap";

import useCart from "../hooks/useCart";
import useAlerts from "../hooks/useAlerts";
import request from "../helpers/request";

export const GamePage = (props) => {
    const [game, setGame] = useState();
    const { addGame, gameIndex } = useCart();
    const { alerts, addAlert, delAlert } = useAlerts();

    useEffect(() => {
        request
            .get(`/games/${props.match.params.id}`)
            .then(({ data }) => setGame(data))
            .catch((err) => console.warn(err));
    }, [props.match.params.id]);

    return (
        <div>
            {alerts.map((alert) => (
                <Alert
                    key={alert.message}
                    variant={alert.variant}
                    onClose={() => delAlert(alert.message)}
                    dismissible
                >
                    {alert.message}
                </Alert>
            ))}

            <main className={alerts.length === 0 ? "mt-5" : ""}>
                <Row>
                    <Col md={8}>
                        <h1 className="font-weight-bold mb-4">
                            {game && game.name.charAt(0).toUpperCase() + game.name.slice(1)}
                        </h1>
                        <p>{game && game.description}</p>
                    </Col>

                    <Col md={4}>
                        <h1 className="mb-4">Specyfikacja</h1>
                        <Table>
                            <tr>
                                <td className="clear-borders pl-0 pt-0">Kategorie</td>
                                <td className="clear-borders pt-0" clear-borders>
                                    {game &&
                                        game.categories.map((cat) => cat.name.toUpperCase() + " ")}
                                </td>
                            </tr>
                            <tr>
                                <td className="clear-borders pl-0 pt-0">Wiek</td>
                                <td className="clear-borders pt-0">{game && game.age_category}</td>
                            </tr>
                            <tr>
                                <td className="clear-borders pl-0 pt-0">Platforma</td>
                                <td className="clear-borders pt-0">
                                    {game && game.platform.name.toUpperCase()}
                                </td>
                            </tr>
                            <tr>
                                <td className="clear-borders pl-0 pt-0">Forma</td>
                                <td className="clear-borders pt-0">
                                    {game && game.is_digital ? "KEY" : "BOX"}
                                </td>
                            </tr>
                        </Table>

                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => {
                                if (gameIndex(game.id) !== -1) {
                                    addAlert("info", "Gra jest już w koszyku");
                                } else if (game.quantity === 0) {
                                    addAlert("warning", "Gra nie jest aktualnie dostępna");
                                } else {
                                    addGame(game.id);
                                    addAlert("success", "Pomyślnie dodano do koszyka");
                                }
                            }}
                        >
                            Dodaj do koszyka
                        </Button>
                    </Col>
                </Row>
            </main>
        </div>
    );
};
