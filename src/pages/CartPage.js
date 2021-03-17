import React, { useState, useEffect, useContext } from "react";
import { Table, Button, ButtonGroup, Row, Col, Alert } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import useCart from "../hooks/useCart";
import useAlerts from "../hooks/useAlerts";
import { UserContext } from "../UserContext";
import request from "../helpers/request";
import "../styles/Cart.css";

const GameRow = (props) => {
    return (
        <tr>
            <td>{props.title}</td>
            <td>
                {props.platform} | {props.form}
            </td>
            <td>
                <ButtonGroup size="sm">
                    {props.inCartQuantity > 1 ? (
                        <Button
                            variant="outline-dark"
                            onClick={() => props.handleDelGame(props.id)}
                        >
                            -
                        </Button>
                    ) : (
                        <Button variant="outline-dark" disabled>
                            -
                        </Button>
                    )}
                    <Button variant="Link">{props.inCartQuantity}</Button>
                    {props.inCartQuantity < props.quantity ? (
                        <Button
                            variant="outline-dark"
                            onClick={() => props.handleAddGame(props.id)}
                        >
                            +
                        </Button>
                    ) : (
                        <Button variant="outline-dark" disabled>
                            +
                        </Button>
                    )}
                </ButtonGroup>
            </td>
            <td>{props.price} zł</td>
            <td>
                <Button
                    className="p-0 m-0 icon"
                    style={{ border: "0px", lineHeight: "20px" }}
                    variant="link"
                >
                    <XCircle
                        className="text-black-50"
                        onClick={() => props.handleRemoveFromCart(props.id)}
                        size={20}
                    />
                </Button>
            </td>
        </tr>
    );
};

const SummaryRow = (props) => {
    return (
        <tr>
            <td>
                {props.inCartQuantity} x {props.name} - {props.platform} | {props.form}
            </td>
            <td>{props.inCartQuantity * props.price} zł</td>
        </tr>
    );
};

export const CartPage = () => {
    const { cart, addGame, delGame, gameIndex, setGame, clearCart } = useCart();
    const { alerts, addAlert, delAlert } = useAlerts([]);
    const [games, setGames] = useState([]);

    const handleRemoveFromCart = (id) => {
        const index = games.map((i) => i.id).indexOf(id);
        games.splice(index, 1);
        setGame(id, 0);
    };

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            await Promise.all(
                cart.map(async (g) => {
                    const { data } = await request.get(`/games/${g.game_id}`);
                    setGames((prev) => [...prev, data]);
                })
            );
        }
        if (games.length === 0) {
            fetchData();
        }
    }, [cart, games.length]);

    if (cart.length === 0) {
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
                    <h1 className="font-weight-bold mb-2">Koszyk jest pusty</h1>
                    <Button href="/" className="p-0 mb-1" variant="link">
                        Back to home
                    </Button>
                </main>
            </div>
        );
    } else
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
                    <h1 className="font-weight-bold mb-4">Koszyk</h1>

                    <Table responsive className="mb-3">
                        <thead>
                            <tr className="no-border-top">
                                <th className="no-border-top">Gra</th>
                                <th className="no-border-top">Szczegóły</th>
                                <th className="no-border-top" style={{ paddingLeft: "30px" }}>
                                    Ilość
                                </th>
                                <th className="no-border-top">Cena</th>
                                <th className="no-border-top" style={{ width: "50px" }}></th>
                            </tr>
                        </thead>
                        <tbody style={{ position: "relative" }}>
                            {games.map((g) => (
                                <GameRow
                                    id={g.id}
                                    key={g.id}
                                    title={g.name.charAt(0).toUpperCase() + g.name.slice(1)}
                                    platform={g.platform.name.toUpperCase()}
                                    form={g.is_digital ? "KEY" : "BOX"}
                                    quantity={g.quantity}
                                    price={g.price}
                                    inCartQuantity={cart[gameIndex(g.id)].quantity}
                                    handleDelGame={delGame}
                                    handleAddGame={addGame}
                                    handleRemoveFromCart={handleRemoveFromCart}
                                />
                            ))}

                            <tr style={{ height: "0px", position: "relative" }}>
                                <td colSpan="5" style={{ position: "relative" }}></td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row>
                        <Col sm={6}></Col>
                        <Col sm={6}>
                            <Table className="mb-0">
                                <thead>
                                    <tr>
                                        <th className="no-border-top" colSpan="2">
                                            <h5 className="font-weight-bold mb-0">Podsumowanie</h5>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((g) => (
                                        <SummaryRow
                                            id={g.id}
                                            key={g.id}
                                            name={g.name.charAt(0).toUpperCase() + g.name.slice(1)}
                                            platform={g.platform.name.toUpperCase()}
                                            form={g.is_digital ? "KEY" : "BOX"}
                                            price={g.price}
                                            inCartQuantity={cart[gameIndex(g.id)].quantity}
                                        />
                                    ))}

                                    <tr>
                                        <td>Łącznie</td>
                                        <td>
                                            {cart
                                                .map((g) => {
                                                    const index = games
                                                        .map((i) => i.id)
                                                        .indexOf(g.game_id);
                                                    if (index === -1) return 0;
                                                    return g.quantity * games[index].price;
                                                })
                                                .reduce((a, b) => a + b, 0)}{" "}
                                            zł
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan="2"></th>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button
                                variant="dark"
                                className="w-100"
                                onClick={async () => {
                                    if (user) {
                                        try {
                                            const { status } = await request.post(
                                                "/orders/loggeduser",
                                                cart
                                            );

                                            if (status === 201) {
                                                clearCart();
                                                addAlert(
                                                    "success",
                                                    "Pomyślnie zakupiono wybrane gry"
                                                );
                                            }
                                        } catch (error) {
                                            addAlert("danger", "Wystąpił błąd");
                                            console.warn(error);
                                        }
                                    } else {
                                        addAlert(
                                            "warning",
                                            "Musisz być zalogowany aby wykonać zakupy"
                                        );
                                    }
                                }}
                            >
                                Kup teraz
                            </Button>
                        </Col>
                    </Row>
                </main>
            </div>
        );
};
