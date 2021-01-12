import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Table, Alert } from 'react-bootstrap';
import useCart from './components/useCart';
import useAlerts from './components/useAlerts';

export const Game = (props) => {
    const id = props.match.params.id;
    const [game, setGame] = useState();
    const { addGame, gameIndex } = useCart();
    const { alerts, addAlert, delAlert } = useAlerts();

    useEffect(() => {
        fetch('/game/' + id)
        .then(res => res.json())
        .then(data => setGame(data.game))
        .catch(err => console.log('err', err));
    }, []);

    return (
        <div>
        {alerts.map((alert) => <Alert key={alert.message} variant={alert.variant}
            onClose={() => delAlert(alert.message)} dismissible>{alert.message}</Alert> )}
        
        <main className={alerts.length === 0 ? 'mt-5' : ''}>
            <Row>
                <Col md={8}>
                    <h1 className="font-weight-bold mb-4">{game === undefined ? null : game.name.charAt(0).toUpperCase() + game.name.slice(1)}</h1>
                    <p>{game === undefined ? null : game.description}</p>
                </Col>

                <Col md={4}>
                    <h1 className="mb-4">Specyfikacja</h1>
                    <Table>
                        <tr>
                            <td className="clear-borders pl-0 pt-0">Kategorie</td>
                            <td className="clear-borders pt-0" clear-borders>
                                {game === undefined ? null : game.categories.map((cat) => cat.category_name.toUpperCase() + " ")}</td>
                        </tr>
                        <tr>
                            <td className="clear-borders pl-0 pt-0">Wiek</td>
                            <td className="clear-borders pt-0">{game === undefined ? null : game.age_category }</td>
                        </tr>
                        <tr>
                            <td className="clear-borders pl-0 pt-0">Platforma</td>
                            <td className="clear-borders pt-0">{game === undefined ? null : game.platform.name.toUpperCase()}
                                {/* <DropdownButton size="sm"  variant="outline-secondary" id="dropdown-basic-button" title="PC">
                                    <Dropdown.Item href="#/action-1">PC</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">PS4</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">XBOX</Dropdown.Item>
                                </DropdownButton> */}
                            </td>
                        </tr>
                        <tr>
                            <td className="clear-borders pl-0 pt-0">Forma</td>
                            <td className="clear-borders pt-0">{game === undefined ? null : (game.is_digital ? "KEY" : "BOX")}
                                {/* <DropdownButton size="sm" variant="outline-secondary" id="dropdown-basic-button" title="KLUCZ STEAM">
                                    <Dropdown.Item href="#/action-1">KLUCZ STEAM</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">BOX</Dropdown.Item>
                                </DropdownButton> */}
                            </td>
                        </tr>
                    </Table>

                    <Button variant='dark' className="w-100" onClick={() => {
                        if(gameIndex(game.id) !== -1) {
                            addAlert('info', 'Gra jest już w koszyku');
                        } else if(game.quantity === 0) {
                            addAlert('warning', 'Gra nie jest aktualnie dostępna');
                        } else {
                            addGame(game.id);
                            addAlert('success', 'Pomyślnie dodano do koszyka');
                        }
                    }}>Dodaj do koszyka</Button>
                </Col>
            </Row>
            
        </main>
        </div>
    );
}