import React from 'react';
import { Table } from 'react-bootstrap';
import { LayoutMyAccount } from './components/LayoutMyAccount';

export const User_orders = () => (
    <LayoutMyAccount>
        <p className="fltr">#2 - 22:26 18.12.2020</p>
        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Gra</th>
                    <th className="no-border-top">Cena</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cyberpunk 2077 - PC | KLUCZ STEAM - PCXWA-2TH6M-3H53W</td>
                    <td>200 zł</td>
                </tr>
                <tr>
                    <td>Wiedźmin 3 - PS4 | BOX</td>
                    <td>300 zł</td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </tbody>
        </Table>

        <p className="fltr">#1 - 10:15 11.12.2020</p>
        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Gra</th>
                    <th className="no-border-top">Cena</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cyberpunk 2077 - PC | KLUCZ STEAM - PCXWA-2TH6M-3H53W</td>
                    <td>200 zł</td>
                </tr>
                <tr>
                    <td>Wiedźmin 3 - PS4 | BOX</td>
                    <td>300 zł</td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </tbody>
        </Table>
    </LayoutMyAccount>
);