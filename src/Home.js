import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Image, Card, Pagination } from 'react-bootstrap';
import { Search, CartPlus } from 'react-bootstrap-icons';
import bkg from './home.jpg';
import min from './min.jpg';
import './Home.css';

const Category = (props) => (   
    <Form.Check className="fbbt mt-1" type="checkbox" id={props.category} label={props.category} />
);

const Platform = (props) => (
    <Form.Check className="fbbt mt-1" type="checkbox" id={props.platform} label={props.platform} />
);

const SideBar = (props) => (
    <Form>
        <p className="fltr mb-0">Kategorie</p>
        {props.categories.map((cat) => <Category key={cat.id} category={cat.name.charAt(0).toUpperCase() + cat.name.slice(1)} /> ) }

        <p className="fltr mb-0 mt-1">Platformy</p>
        {props.platforms.map((plat) => <Platform key={plat.id} platform={plat.name.toUpperCase()} /> ) }

        <p className="fltr mb-0 mt-1">Wiek</p>
            <Form.Check className="fbbt mt-1" type="checkbox" id="7" label="7" />
            <Form.Check className="fbbt mt-1" type="checkbox" id="14" label="14" />
            <Form.Check className="fbbt mt-1" type="checkbox" id="18" label="18" />

        <Button type="submit" className="mt-4">Zastosuj filtry</Button>
    </Form>
);

const CustomCard = (props) => (
    <Col xs={12} md={6} lg={4} className="mt-3">
        <Card>
            <a href="#">
                <Card.Img variant="top" src={ min } />
            </a>
            
            <Card.Body className="p-2">
                <a href="#">
                    <Card.Title style={{ height: "40px" }} className="fbbt mb-0 pb-0">{props.title}</Card.Title>
                </a>
                
                <div className="d-flex justify-content-between align-items-center mt-0 pt-0">
                    <span className="fbbt text-black-50">{props.price}</span>
                    <div className="d-flex align-items-center mt-1">
                            <span className="fbs text-black-50">{props.platform} | {props.form}</span>
                        <Button className="p-0 ml-2 mb-1 icon" variant="Link"><CartPlus className="p-0 text-secondary" size={24} /></Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </Col>
);


export const  Home = () => {
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        fetch("/categories")
        .then(res => res.json())
        .then(data => setCategories(data.categories))
        .catch(err => console.log(err));

        fetch("/platforms")
        .then(res => res.json())
        .then(data => setPlatforms(data.platforms))
        .catch(err => console.log(err));
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
                    
                    <SideBar categories={categories} platforms={platforms} />

                </Col>
                <Col sm={9}>

                    <Row>
                        <CustomCard title="Cyberpunk 2077" price="120 zł" platform="XBOX" form="KEY" />

                            
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