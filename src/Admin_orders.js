import React, {useEffect, useState} from 'react';
import { Forbidden } from './Forbidden';
import { TableGames } from './components/TableGames';
import { LayoutAdmin } from './components/LayoutAdmin';
import {Table} from "react-bootstrap";

const orders = [
    {
        id: '2',
        timedate: '22:26 18.12.2020',
        username: 'Andrzej',
        games: [
            {name: 'Cyberpunk 2077 - PC | KLUCZ - PCXWA-2TH6M-3H53W', price: '200 zł'},
            {name: 'Wiedźmin 3 - PS4 | BOX', price: '300 zł'}
        ]
    },
    {
        id: '1',
        timedate: '10:15 11.12.2020',
        username: 'Andrzej',
        games: [
            {name: 'Cyberpunk 2077 - PC | KLUCZ - PCXWA-2TH6M-3H53W', price: '200 zł'},
            {name: 'Wiedźmin 3 - PS4 | BOX', price: '300 zł'}
        ]
    }
]

const AdminOrder = (props) => {
    return (
        <div>
            <p className="fltr">#{ props.order.id } - { props.order.timedate } - { props.order.username }</p>
            <TableGames games={props.order.games} />
        </div>  
    );
}

export const Admin_orders = (props) => {
    const [orders, setOrders] = useState();
    useEffect(() =>{
        fetch('/transhistory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            },
        }).then(r => r.json()).then(data => setOrders(data.transactions));
    }, []);

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
                            <th className="no-border-top">Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        { order.games_transactions.map((game) => <tr>
                            <td>{ game.game_name }</td>
                            <td>{ game.price }</td>
                        </tr> ) }
                        </tbody>
                    </Table>
                </div>
            )
        })
    }
    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return(
        <LayoutAdmin>
            {listToRender}
        </LayoutAdmin>
    );
}