import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { CartPlus, CartCheck, CartX } from 'react-bootstrap-icons';

import useCart from '../components/useCart';

export const GameCard = ({id, title, price, platform, quantity, form}) => {
    const { addGame, setGame, gameIndex } = useCart();
    const [inCart, setInCart] = useState(gameIndex(id) === -1 ? false : true);
    
    return (
        <Col xs={12} md={6} lg={4} className="mt-3">
            <Card>
                {/* <a href="#">
                    <Card.Img variant="top" src={ min } />
                </a> */}
                
                <Card.Body className="p-2">
                    <a href={"/game/" + id}>
                        <Card.Title style={{ height: "40px" }} className="fbbt mb-0 pb-0">{title}</Card.Title>
                    </a>
                    
                    <div className="d-flex justify-content-between align-items-center mt-0 pt-0">
                        <span className="fbbt text-black-50">{price} zł</span>
                        <div className="d-flex align-items-center mt-1">
                            <span className="fbs text-black-50">{platform} | {form}</span>
                            { quantity > 0 ? 
                                <Button className="p-0 ml-2 mb-1" onClick={() => { 
                                    if(!inCart) { 
                                        addGame(id);
                                        setInCart(true); 
                                    } else {
                                        setGame(id,0);
                                        setInCart(false);
                                    }
                                }} variant="Link">
                                    { inCart ? <CartCheck className="p-0 text-secondary icon" size={24} /> :
                                                <CartPlus className="p-0 text-secondary icon" size={24} /> } 
                                </Button> :
                                <Button className="p-0 ml-2 mb-1" variant="Link" disabled><CartX className="p-0 text-secondary" size={24} /></Button>
                            }
                            
                            
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}