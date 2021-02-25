import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutMyAccount } from "../layouts/LayoutMyAccount";
import { UserContext } from "../UserContext";

export const MyaccountOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            fetch("/myshoppings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
            })
                .then((res) => res.json())
                .then((data) => setOrders(data.transactions));
        }
    }, [user]);

    const list = orders.map((order) => {
        return (
            <div>
                <p className="fltr">
                    #{order.id} - {order.date}
                </p>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="no-border-top">Gra</th>
                            <th
                                className="no-border-top"
                                style={{ width: "140px" }}
                            >
                                Cena
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.games_transactions.map((game) => (
                            <tr>
                                <td>{game.game_name}</td>
                                <td>{game.price} zł</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    });

    if (!user) return <ForbiddenPage />;

    return <LayoutMyAccount>{list}</LayoutMyAccount>;
};
