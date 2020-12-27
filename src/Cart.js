import React from 'react';
import { Table, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import './Cart.css';

export const Cart = () => (
    <main className="mt-5">
        <h1 className='font-weight-bold mb-4'>Koszyk</h1>
        <Table responsive className="mb-5">
            <thead>
                <tr className="no-border-top">
                    <th className="no-border-top">Gra</th>
                    <th className="no-border-top">Szczegóły</th>
                    <th className="no-border-top" style={{ paddingLeft: "30px" }}>Ilość</th>
                    <th className="no-border-top">Cena</th>
                    <th className="no-border-top" style={{ width: "50px" }}></th>
                </tr>
            </thead>
            <tbody style={{ position: "relative" }}>
                <tr>
                    <td>Cyberpunk 2077</td>
                    <td>PC | KLUCZ STEAM</td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button variant='outline-dark'>-</Button>
                            <Button variant='Link'>1</Button>
                            <Button variant='outline-dark'>+</Button>
                        </ButtonGroup>
                    </td>
                    <td>200 zł</td>
                    <td>
                        <a href="#" className="icon">
                            <XCircle className="text-black-50" size={20} />
                        </a>    
                    </td>
                </tr>
                <tr>
                    <td>Wiedźmin 3</td>
                    <td>PS4 | BOX</td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button variant='outline-dark'>-</Button>
                            <Button variant='Link'>1</Button>
                            <Button variant='outline-dark'>+</Button>
                        </ButtonGroup>
                    </td>
                    <td>300 zł</td>
                    <td>
                        <a href="#" className="icon">
                            <XCircle className="text-black-50" size={20} />
                        </a>
                    </td>
                </tr>
                <tr style={{ height: "0px", position: "relative" }}>
                    <td colspan="5" style={{ position: "relative" }}>
                        <Button variant="outline-dark" style={{ position: "absolute", right: "0px" }}>Zaktualizuj koszyk</Button>
                    </td> 
                    
                </tr>
                
            </tbody>
            
        </Table>
        
        <Row>
            <Col sm={7}></Col>
            <Col sm={5}>
            <Table className="mb-0">
                <thead>
                    <tr>
                    <th className="no-border-top" colspan="2"><h5 className="font-weight-bold mb-0">Podsumowanie</h5></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1x Cyberpunk 2077 - PC | KLUCZ STEAM</td>
                        <td>200 zł</td>
                    </tr>
                    <tr>
                        <td>2x Wiedźmin 3 - PS4 | BOX</td>
                        <td>300 zł</td>
                    </tr>
                    <tr>
                        <td>Łącznie</td>
                        <td >500 zł</td>
                    </tr>
                    <tr><th colspan="2"></th></tr>
                </tbody>
                </Table>
                <Button variant="dark" className="w-100">Kup teraz</Button>
            </Col>
        </Row>

    </main>
);