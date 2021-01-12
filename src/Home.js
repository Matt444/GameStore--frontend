import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Image, Card, Pagination } from 'react-bootstrap';
import { Search, CartPlus, CartCheck, CartX } from 'react-bootstrap-icons';
import bkg from './home.jpg';
import min from './min.jpg';
import useCart from './components/useCart';
import './Home.css';

const Category = (props) => (   
    <Form.Check className="fbbt mt-1" type="checkbox" id={props.category} label={props.category} onClick={() => props.handleCategorySelect(props.id)}/>
);

const Platform = (props) => (
    <Form.Check className="fbbt mt-1" type="checkbox" id={props.platform} label={props.platform} onClick={() => props.handlePlatformSelect(props.id)}/>
);

const SideBar = (props) => (
    <Form>
        <p className="fltr mb-0">Kategorie</p>
        {props.categories.map((cat) => <Category key={cat.id} id={cat.id} category={cat.name.charAt(0).toUpperCase() + cat.name.slice(1)} 
                                            handleCategorySelect={props.handleCategorySelect}/> ) }

        <p className="fltr mb-0 mt-1">Platformy</p>
        {props.platforms.map((plat) => <Platform key={plat.id} id={plat.id} platform={plat.name.toUpperCase()} 
                                            handlePlatformSelect={props.handlePlatformSelect}/> ) }

        <p className="fltr mb-0 mt-1">Wiek</p>
        <Form.Check className="fbbt mt-1" type="checkbox" id="7" label="7" />
        <Form.Check className="fbbt mt-1" type="checkbox" id="14" label="14" />
        <Form.Check className="fbbt mt-1" type="checkbox" id="18" label="18" />

    </Form>
);

const GameCard = (props) => {
    const { addGame, setGame, gameIndex } = useCart();
    const [inCart, setInCart] = useState(gameIndex(props.id) === -1 ? false : true);
    

    return (
        <Col xs={12} md={6} lg={4} className="mt-3">
            <Card>
                <a href="#">
                    {/* <Card.Img variant="top" src={ min } /> */}
                </a>
                
                <Card.Body className="p-2">
                    <a href={"/game/" + props.id}>
                        <Card.Title style={{ height: "40px" }} className="fbbt mb-0 pb-0">{props.title}</Card.Title>
                    </a>
                    
                    <div className="d-flex justify-content-between align-items-center mt-0 pt-0">
                        <span className="fbbt text-black-50">{props.price} zł</span>
                        <div className="d-flex align-items-center mt-1">
                            <span className="fbs text-black-50">{props.platform} | {props.form}</span>
                            { props.quantity > 0 ? 
                                <Button className="p-0 ml-2 mb-1" onClick={() => { 
                                    if(!inCart) { 
                                        addGame(props.id);
                                        setInCart(true); 
                                    } else {
                                        setGame(props.id,0);
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

export const GamesPagination = (props) => {
    const neighbors = 1;
    const totalPages = props.totalPages;
    const currPage = props.currPage;
    let pages = [];
    for(let i = currPage - neighbors;i < currPage;i++)
        if(i > 0)
            pages.push(i);
    for(let i = currPage;i <= currPage + neighbors;i++)
        if(i <= totalPages)
            pages.push(i);
    const prevPage = currPage - 1 > 0 ? currPage - 1 : 0;
    const nextPage = currPage + 1 <= totalPages ? (currPage + 1) : 0;

    return (
        <Col xl={12} className="mt-3 d-flex justify-content-center">
            <Pagination >
                {prevPage === 0 ? <Pagination.Prev key={-1} disabled /> : <Pagination.Prev key={-1} onClick={() => props.handlePageChange(prevPage)}/>}
                {pages.map(p => {
                    if(p === currPage)
                        return <Pagination.Item key={p} active>{p}</Pagination.Item>
                    else
                        return <Pagination.Item key={p} onClick={() => props.handlePageChange(p)}>{p}</Pagination.Item>
                })}
                {nextPage === 0 ? <Pagination.Next key={-2} disabled /> : <Pagination.Next key={-2} onClick={() => props.handlePageChange(nextPage)}/>}
            </Pagination>
        </Col>
    );
}

export const  Home = () => {
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);


    const updateGamesList =(nr, name='') => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"search_filter":{
            "page_number": nr, 
            "categories_id": selectedCategories,
            "platforms_id": selectedPlatforms,
            "name": name
        }});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/games", requestOptions)
        .then(res => res.json())
        .then(data => {
            setGames(data.games);
            setTotalPages(Math.ceil(data.total_number / data.results_per_page));
        })
        .catch(err => console.log(err));
    }

    const handlePageChange = (nr) => {
        console.log(nr);
        setCurrPage(nr);
        updateGamesList(nr);
    };

    const handleCategorySelect = (id) => {
        const index = selectedCategories.indexOf(id);
        console.log(index);
        if(index !== -1) {
            selectedCategories.splice(index,1)
            setSelectedCategories(selectedCategories)
        } else {
            selectedCategories.push(id)
            setSelectedCategories(selectedCategories);
        }
        
        setCurrPage(1);
        updateGamesList(1);
    }

    const handlePlatformSelect = (id) => {
        const index = selectedPlatforms.indexOf(id);
        console.log(index);
        if(index !== -1) {
            selectedPlatforms.splice(index,1)
            setSelectedPlatforms(selectedPlatforms)
        } else {
            selectedPlatforms.push(id)
            setSelectedPlatforms(selectedPlatforms);
        }
        
        setCurrPage(1);
        updateGamesList(1);
    }

    useEffect(() => {
        fetch("/categories")
        .then(res => res.json())
        .then(data => setCategories(data.categories))
        .catch(err => console.log(err));

        fetch("/platforms")
        .then(res => res.json())
        .then(data => setPlatforms(data.platforms))
        .catch(err => console.log(err));

        updateGamesList(1);

    }, []);

        
    return (
        <div>
            <Row>
                <Image src={ bkg } style={{ position: 'absolute', left: "0px", top: "58px", width: "100%", minHeight: "80px" }} />
            </Row>
            <Row style={{ marginTop: "5vw", marginBottom: "4vw" }}>
                
                <Col sm={3}></Col>
                <Col sm={9} style={{ position: "relative" }}>
                    <Form onSubmit={(e) => { 
                        e.preventDefault();
                        updateGamesList(1, document.getElementById("gameInput").value)
                         }}>
                        
                            <Form.Control id="gameInput" type="text" placeholder="Wyszukaj grę..." />
                            <Button className="icon" variant="Link" type="submit" >
                                <Search className="text-black-50" Size={24} style={{ position: "absolute", top: "12px", right: "30px" }} />
                            </Button>
                        
                    </Form>
   
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    
                    <SideBar categories={categories} platforms={platforms} 
                        handleCategorySelect={handleCategorySelect} handlePlatformSelect={handlePlatformSelect} />

                </Col>
                <Col sm={9}>

                    <Row>
                        {games.map((g) => { 
                            return <GameCard key={g.id} id={g.id} title={g.name.charAt(0).toUpperCase() + g.name.slice(1)} 
                                quantity={g.quantity} price={g.price} platform={g.platform.name.toUpperCase()} form={g.is_digital ? "KEY": "BOX"} /> 
                        })}

                        <GamesPagination currPage={currPage} totalPages={totalPages} handlePageChange={handlePageChange} />

                    </Row>

                </Col>

            </Row>
        </div>
            
    );
    
};