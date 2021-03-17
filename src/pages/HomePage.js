import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Image, Pagination } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

import { GameCard } from "../components/GameCard";
import request from "../helpers/request";
import bkg from "../images/home.jpg";
import "../styles/Home.css";

const Category = (props) => (
    <Form.Check
        className="fbbt mt-1"
        type="checkbox"
        id={`cat${props.id}`}
        label={props.name}
        onClick={() => props.handleCategorySelect(props.id)}
    />
);

const Platform = (props) => (
    <Form.Check
        className="fbbt mt-1"
        type="checkbox"
        id={`plat${props.id}`}
        label={props.name}
        onClick={() => props.handlePlatformSelect(props.id)}
    />
);

const SideBar = (props) => (
    <Form>
        <p className="fltr mb-0">Kategorie</p>
        {props.categories.map((cat) => (
            <Category
                key={cat.id}
                id={cat.id}
                name={cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                handleCategorySelect={props.handleCategorySelect}
            />
        ))}

        <p className="fltr mb-0 mt-1">Platformy</p>
        {props.platforms.map((plat) => (
            <Platform
                key={plat.id}
                id={plat.id}
                name={plat.name.toUpperCase()}
                handlePlatformSelect={props.handlePlatformSelect}
            />
        ))}

        <p className="fltr mb-0 mt-1">Wiek</p>
        {props.ageCategories.map((name) => (
            <Form.Check
                className="fbbt mt-1"
                type="checkbox"
                key={name}
                id={name}
                label={name}
                onClick={() => props.handleAgeCategorySelect(name)}
            />
        ))}

        <p className="fltr mb-0 mt-1">Forma</p>
        <Form.Check
            className="fbbt mt-1"
            type="checkbox"
            id="BOX"
            label="BOX"
            onClick={() => props.handleFormSelect(0)}
        />
        <Form.Check
            className="fbbt mt-1"
            type="checkbox"
            id="KEY"
            label="KEY"
            onClick={() => props.handleFormSelect(1)}
        />
    </Form>
);

export const GamePagination = (props) => {
    const neighbors = 1;
    const totalPages = props.totalPages;
    const currPage = props.currPage;
    let pages = [];
    for (let i = currPage - neighbors; i < currPage; i++) if (i > 0) pages.push(i);
    for (let i = currPage; i <= currPage + neighbors; i++) if (i <= totalPages) pages.push(i);
    const prevPage = currPage - 1 > 0 ? currPage - 1 : 0;
    const nextPage = currPage + 1 <= totalPages ? currPage + 1 : 0;

    return (
        <Col xl={12} className="mt-3 d-flex justify-content-center">
            <Pagination>
                {prevPage === 0 ? (
                    <Pagination.Prev key={-1} disabled />
                ) : (
                    <Pagination.Prev key={-1} onClick={() => props.handlePageChange(prevPage)} />
                )}
                {pages.map((p) => {
                    if (p === currPage)
                        return (
                            <Pagination.Item key={p} active>
                                {p}
                            </Pagination.Item>
                        );
                    else
                        return (
                            <Pagination.Item key={p} onClick={() => props.handlePageChange(p)}>
                                {p}
                            </Pagination.Item>
                        );
                })}
                {nextPage === 0 ? (
                    <Pagination.Next key={-2} disabled />
                ) : (
                    <Pagination.Next key={-2} onClick={() => props.handlePageChange(nextPage)} />
                )}
            </Pagination>
        </Col>
    );
};

export const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);
    const [ageCategories] = useState(["PEGI 3", "PEGI 7", "PEGI 12", "PEGI 16", "PEGI 18"]);
    const [totalPages, setTotalPages] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [resultsPerPage] = useState(12);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedAgeCategories, setSelectedAgeCategories] = useState([]);
    const [selectedForms, setSelectedForms] = useState([]);

    const handlePageChange = (nr) => {
        setCurrPage(nr);
    };

    const handleCategorySelect = (id) => {
        const index = selectedCategories.indexOf(id);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, id]);
        } else {
            setSelectedCategories(selectedCategories.filter((cid) => cid !== id));
        }

        setCurrPage(1);
    };

    const handlePlatformSelect = (id) => {
        const index = selectedPlatforms.indexOf(id);
        if (index === -1) {
            setSelectedPlatforms([...selectedPlatforms, id]);
        } else {
            setSelectedPlatforms(selectedPlatforms.filter((pid) => pid !== id));
        }

        setCurrPage(1);
    };

    const handleAgeCategorySelect = (id) => {
        const index = selectedAgeCategories.indexOf(id);
        if (index === -1) {
            setSelectedAgeCategories([...selectedAgeCategories, id]);
        } else {
            setSelectedAgeCategories(selectedAgeCategories.filter((agcid) => agcid !== id));
        }

        setCurrPage(1);
    };

    const handleFormSelect = (id) => {
        const index = selectedForms.indexOf(id);
        if (index === -1) {
            setSelectedForms([...selectedForms, id]);
        } else {
            setSelectedForms(selectedForms.filter((fid) => fid !== id));
        }

        setCurrPage(1);
    };

    const handleQueryChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.gameInput.value);
    };

    useEffect(() => {
        request
            .get("/categories")
            .then(({ data }) => setCategories(data))
            .catch((err) => console.log(err));

        request
            .get("/platforms")
            .then(({ data }) => setPlatforms(data))
            .catch((err) => console.log(err));

        // request
        //     .get("/agecategories")
        //     .then((data) => setAgeCategories(data.age_categories.map((a) => a[0])))
        //     .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { status, data } = await request.post(
                    `/games/search?limit=${resultsPerPage}&offset=${
                        (currPage - 1) * resultsPerPage
                    }`,
                    {
                        name: searchQuery,
                        is_digital: selectedForms,
                        age_categories: selectedAgeCategories,
                        categories_id: selectedCategories,
                        platforms_id: selectedPlatforms,
                    }
                );

                if (status === 200) {
                    setGames(data.games);
                    setTotalPages(Math.ceil(data.totalGamesNumber / resultsPerPage));
                }
            } catch (error) {
                console.warn(error);
            }
        };
        fetchData();
    }, [
        currPage,
        selectedCategories,
        selectedAgeCategories,
        selectedPlatforms,
        selectedForms,
        searchQuery,
        resultsPerPage,
    ]);

    return (
        <div>
            <Row>
                <Image
                    src={bkg}
                    style={{
                        position: "absolute",
                        left: "0px",
                        top: "58px",
                        width: "100%",
                        minHeight: "80px",
                    }}
                />
            </Row>
            <Row
                style={{
                    marginTop: "5vw",
                    marginBottom: "4vw",
                }}
            >
                <Col sm={3}></Col>
                <Col
                    sm={9}
                    style={{
                        position: "relative",
                    }}
                >
                    <Form onSubmit={(e) => handleQueryChange(e)}>
                        <Form.Control id="gameInput" type="text" placeholder="Wyszukaj grę..." />
                        <Button className="icon" variant="Link" type="submit">
                            <Search
                                className="text-black-50"
                                Size={24}
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "30px",
                                }}
                            />
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    <SideBar
                        categories={categories}
                        platforms={platforms}
                        ageCategories={ageCategories}
                        handleCategorySelect={handleCategorySelect}
                        handlePlatformSelect={handlePlatformSelect}
                        handleAgeCategorySelect={handleAgeCategorySelect}
                        handleFormSelect={handleFormSelect}
                    />
                </Col>
                <Col sm={9}>
                    <Row>
                        {games.map((g) => {
                            return (
                                <GameCard
                                    key={g.id}
                                    id={g.id}
                                    title={g.name.charAt(0).toUpperCase() + g.name.slice(1)}
                                    quantity={g.quantity}
                                    price={g.price}
                                    platform={g.platform.name.toUpperCase()}
                                    form={g.is_digital ? "KEY" : "BOX"}
                                    image_url={g.image_url}
                                />
                            );
                        })}

                        <GamePagination
                            currPage={currPage}
                            totalPages={totalPages}
                            resultsPerPage={resultsPerPage}
                            handlePageChange={handlePageChange}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
