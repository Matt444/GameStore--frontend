import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import { TableOfGames } from "../components/Tables/TableOfGames";

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
                <TableOfGames order={order} />
            </div>
        );
    });

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return (
        <LayoutAdmin>
            {orders.length === 0 ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                listToRender
            )}
        </LayoutAdmin>
    );
};
