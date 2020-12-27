import React from 'react';
import { Table } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';

export const Admin_orders = () => (
    <LayoutAdmin>
        <p className="fltr">#2 - 22:26 18.12.2020 - Andrzej</p>
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

        <p className="fltr">#1 - 10:15 11.12.2020 - Andrzej</p>
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
    </LayoutAdmin>
);