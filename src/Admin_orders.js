import React from 'react';
import { Forbidden } from './Forbidden';
import { TableGames } from './components/TableGames';
import { LayoutAdmin } from './components/LayoutAdmin';

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
    console.log(props.token);
    console.log(props.role);
    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return(
        <LayoutAdmin>
            { orders.map( (order) => <AdminOrder order={order} /> ) }
        </LayoutAdmin>
    );
}