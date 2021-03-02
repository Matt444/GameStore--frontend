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
            const { data } = await request.get("/myshoppings");

            setOrders(data.transactions || []);
        };

        fetchData();
    }, []);

    const list =
        orders &&
        (orders.length === 0 ? (
            <p className="fltr">Brak zamówień</p>
        ) : (
            orders.map((order) => {
                return (
                    <div key={order.id}>
                        <p className="fltr">
                            #{order.id} - {order.date}
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
