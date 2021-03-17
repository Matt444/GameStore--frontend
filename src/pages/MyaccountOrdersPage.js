import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import { ForbiddenPage } from "./ForbiddenPage";
import { LayoutMyAccount } from "../layouts/LayoutMyAccount";
import { UserContext } from "../UserContext";
import request from "../helpers/request";
import { TableOfGames } from "../components/Tables/TableOfGames";

export const MyaccountOrdersPage = () => {
    const [orders, setOrders] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await request.get("/orders/loggeduser");

            setOrders(data || []);
        };

        fetchData();
    }, []);

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
                            #{order.id} -{" "}
                            {`${day < 10 ? `0${day}` : day}.${
                                month < 10 ? `0${month}` : month
                            }.${date.getFullYear()} ${hour}:${minute}:${second}`}
                        </p>
                        <TableOfGames order={order} />
                    </div>
                );
            })
        ));

    if (!user) return <ForbiddenPage />;

    return (
        <LayoutMyAccount>
            {orders ? (
                list
            ) : (
                <Spinner animation="border" role="status" size="sm">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </LayoutMyAccount>
    );
};
