import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";

export const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.isAdmin) {
            fetch("/transhistory", {
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

    const listToRender = orders.map((order) => {
        return (
            <div key={order.id}>
                <p className="fltr">
                    #{order.id} - {order.username} - {order.date}
                </p>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="no-border-top">Gra</th>
                            <th className="no-border-top" style={{ width: "140px" }}>
                                Cena
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.games_transactions.map((game) => (
                            <tr key={game.id}>
                                <td>{game.game_name}</td>
                                <td>{game.price} zł</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    });

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return <LayoutAdmin>{listToRender}</LayoutAdmin>;
};
