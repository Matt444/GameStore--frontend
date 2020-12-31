import React from 'react';
import { TableGames } from './components/TableGames';
import { LayoutMyAccount } from './components/LayoutMyAccount';

const orders = [
    {
        id: '2',
        timedate: '22:26 18.12.2020',
        games: [
            {name: 'Cyberpunk 2077 - PC | KLUCZ - PCXWA-2TH6M-3H53W', price: '200 zł'},
            {name: 'Wiedźmin 3 - PS4 | BOX', price: '300 zł'}
        ]
    },
    {
        id: '1',
        timedate: '10:15 11.12.2020',
        games: [
            {name: 'Cyberpunk 2077 - PC | KLUCZ - PCXWA-2TH6M-3H53W', price: '200 zł'},
            {name: 'Wiedźmin 3 - PS4 | BOX', price: '300 zł'}
        ]
    }
]

const UserOrder = (props) => {
    return (
        <div>
            <p className="fltr">#{ props.order.id } - { props.order.timedate }</p>
            <TableGames games={props.order.games} />
        </div>  
    );
}

export const User_orders = () => (
    <LayoutMyAccount>
        {  orders.map( (order) => <UserOrder order={order} /> ) }
    </LayoutMyAccount>
);