import React from 'react';
import { Button, Row, Col, Dropdown, DropdownButton, Table } from 'react-bootstrap';

export const Game = () => (
    <main className="mt-5">
        <Row>
            <Col md={8}>
                <h1 className="font-weight-bold mb-4">Cyberpunk 2077</h1>
                <p>Cyberpunk 2077 to rozgrywająca się w otwartym świecie przygoda, której akcja toczy się w Night City,
                    megalopolis rządzonym przez obsesyjną pogoń za władzą, sławą i przerabianiem własnego ciała. 
                    Nazywasz się V i musisz zdobyć jedyny w swoim rodzaju implant — klucz do nieśmiertelności. 
                    Stwórz własny styl gry i ruszaj na podbój potężnego miasta przyszłości, którego historię kształtują twoje decyzje.
                </p>
            </Col>

            <Col md={4}>
                <h1 className="mb-4">Specyfikacja</h1>
                <Table>
                    <tr>
                        <td className="clear-borders pl-0 pt-0">Kategoria</td>
                        <td className="clear-borders pt-0" clear-borders>RPG</td>
                    </tr>
                    <tr>
                        <td className="clear-borders pl-0 pt-0">Wiek</td>
                        <td className="clear-borders pt-0">18</td>
                    </tr>
                    <tr>
                        <td className="clear-borders pl-0 pt-0">Platforma</td>
                        <td className="clear-borders pt-0">
                            <DropdownButton size="sm"  variant="outline-secondary" id="dropdown-basic-button" title="PC">
                                <Dropdown.Item href="#/action-1">PC</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">PS4</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">XBOX</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                    <tr>
                        <td className="clear-borders pl-0 pt-0">Forma</td>
                        <td className="clear-borders pt-0">
                            <DropdownButton size="sm" variant="outline-secondary" id="dropdown-basic-button" title="KLUCZ STEAM">
                                <Dropdown.Item href="#/action-1">KLUCZ STEAM</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">BOX</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                </Table>

                <Button variant='dark' className="w-100">Dodaj do koszyka</Button>
            </Col>
        </Row>
        
    </main>
);