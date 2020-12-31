import React from 'react';
import { Table } from 'react-bootstrap';

const TableRow = (props) => {
    return (
        <tr>
            <td>{ props.game.name }</td>
            <td>{ props.game.price }</td>
        </tr>
    )   
}

export const TableGames = (props) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Gra</th>
                    <th className="no-border-top">Cena</th>
                </tr>
            </thead>
            <tbody>
                { props.games.map((game) => <TableRow game={game} /> ) }
            </tbody>
        </Table>
    );
}