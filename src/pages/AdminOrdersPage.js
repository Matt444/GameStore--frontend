import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";

import { ForbiddenPage } from './ForbiddenPage';
import { LayoutAdmin } from '../layouts/LayoutAdmin';

export const AdminOrdersPage = (props) => {
    const [orders, setOrders] = useState();
    
    useEffect(() => {
        fetch('/transhistory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            },
        })
        .then(res => res.json())
        .then(data => setOrders(data.transactions));
    }, [props.token]);

    let listToRender;
    if (orders) {
        listToRender = orders.map(order => {
            return(
                <div>
                    <p className="fltr">#{ order.id } - { order.username } - { order.date }</p>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th className="no-border-top">Gra</th>
                            <th className="no-border-top" style={{ width: "140px" }}>Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        { order.games_transactions.map((game) => <tr>
                            <td>{ game.game_name }</td>
                            <td>{ game.price } zł</td>
                        </tr> ) }
                        </tbody>
                    </Table>
                </div>
            )
        })
    }
    if(!props.token || props.role !== 'admin')
        return <ForbiddenPage />;

    return(
        <LayoutAdmin>
            {listToRender}
        </LayoutAdmin>
    );
}