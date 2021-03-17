import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { UserContext } from "../UserContext";
import { TableOfGames } from "../components/Tables/TableOfGames";
import request from "../helpers/request";

export const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await request.get("/orders");

            setOrders(data || []);
        };
        fetchData();
    }, [user]);

    const list =
        orders &&
        (orders.length === 0 ? (
            <p className="fltr">Brak zamówień</p>
        ) : (
            orders.map((order) => {
                const date = new Date(order.date);
                const day = date.getDay();
                const month = date.getMonth();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();

                return (
                    <div key={order.id}>
                        <p className="fltr">
                            <p className="fltr">
                                #{order.id} -{" "}
                                {`${day < 10 ? `0${day}` : day}.${
                                    month < 10 ? `0${month}` : month
                                }.${date.getFullYear()} ${hour}:${minute}:${second}`}
                            </p>
                        </p>
                        <TableOfGames order={order} />
                    </div>
                );
            })
        ));

    if (!user || !user.isAdmin) return <ForbiddenPage />;

    return (
        <LayoutAdmin>
            {orders ? (
                list
            ) : (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </LayoutAdmin>
    );
};
