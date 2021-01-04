import React, {useEffect} from 'react';
import { Row, Col, Form, Button, Image, Card, Pagination } from 'react-bootstrap';
import { Search, CartPlus } from 'react-bootstrap-icons';
import bkg from './home.jpg';
import min from './min.jpg';
import './Home.css';

export const Home = () => {
    useEffect(() => {
        fetch("/categories").then(response =>
            response.json().then(data => {
                console.log(data)
            })
        );
    }, []);
    return (
        <div>
            <Row>
                <Image src={ bkg } style={{ position: 'absolute', left: "0px", top: "58px", width: "100%", minHeight: "80px" }} />
            </Row>

            <Row style={{ marginTop: "5vw", marginBottom: "4vw" }}>
                
                <Col sm={3}></Col>
                <Col sm={9} style={{ position: "relative" }}>
                    <Form>
                        
                            <Form.Control id="gameInput" type="text" placeholder="Wyszukaj grę..." />
                            <Button className="icon" variant="Link" type="submit">
                                <Search className="text-black-50" Size={24} style={{ position: "absolute", top: "12px", right: "30px" }} />
                            </Button>
                        
                    </Form>
                    
                    
                    
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    
                    <Form>
                        <p className="fltr mb-0">Kategorie</p>
                        <Form.Check className="fbbt mt-1" type="checkbox" id="Strategiczne" label="Strategiczne" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="Strzelanki" label="Strzelanki" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="RPG" label="RPG" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="Przygodowe" label="Przygodowe" />
                    
                        <p className="fltr mb-0 mt-1">Platformy</p>
                        <Form.Check className="fbbt mt-1" type="checkbox" id="PC" label="PC" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="PS4" label="PS4" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="XBOX" label="XBOX" />

                        <p className="fltr mb-0 mt-1">Wiek</p>
                        <Form.Check className="fbbt mt-1" type="checkbox" id="7" label="7" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="14" label="14" />
                        <Form.Check className="fbbt mt-1" type="checkbox" id="18" label="18" />
                        
                        <Button type="submit" className="mt-4">Zastosuj filtry</Button>
                    </Form>
                </Col>
                <Col sm={9}>

                    <Row>
                        <Col xs={12} md={6} lg={4} className="mt-3">
                            <Card>
                                <a href="#">
                                    <Card.Img variant="top" src={ min } />
                                </a>
                                
                                <Card.Body className="p-2">
                                    <a href="#">
                                        <Card.Title style={{ height: "40px" }} className="fbbt mb-0 pb-0">Cyberpunk 2077</Card.Title>
                                    </a>
                                    
                                    <div className="d-flex justify-content-between align-items-center mt-0 pt-0">
                                        <span className="fbbt text-black-50">120zł</span>
                                        <div className="d-flex align-items-center mt-1">
                                            <span className="fbs text-black-50">XBOX | KEY</span>
                                            <Button className="p-0 ml-2 mb-1 icon" variant="Link"><CartPlus className="p-0 text-secondary" size={24} /></Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        

                        <Col xl={12} className="mt-3 d-flex justify-content-center">
                            <Pagination >
                                <Pagination.Prev disabled />
                                <Pagination.Item active>{1}</Pagination.Item>
                                <Pagination.Item>{2}</Pagination.Item>
                                <Pagination.Item>{3}</Pagination.Item>
                                <Pagination.Next />
                            </Pagination>
                        </Col>

                    </Row>
  
                </Col>

            </Row>
        </div>
        
    );
    
};