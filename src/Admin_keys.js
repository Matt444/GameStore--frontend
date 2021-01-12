import React, {useEffect, useState} from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { XCircle } from 'react-bootstrap-icons';

export const Admin_keys = (props) => {
    const [game, setGame] = useState("default");
    const [games, setGames] = useState(["ok"]);
    const [key, setKey] = useState("");
    const [id, setId] = useState();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const name='';
    const nr = 2;
    useEffect(() => {
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
            })
            .catch(err => console.log(err));
    }, []);

    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj klucz</p>
            <Form className="mb-2">
                <Row>
                    <Col lg={3} className="mb-2">
                        <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button"
                                        variant="outline-secondary" title={game} onChange={e => setGame(e.target.value)}>
                            {games.map(game => {
                                if (game.is_digital)
                                    return <Dropdown.Item onClick={e => {
                                        setGame(game.name);
                                        setId(game.id);
                                    }}>{game.name}</Dropdown.Item>
                                }
                            )
                            }
                        </DropdownButton>
                    </Col>
                    <Col lg={7} className="mb-2">
                        <Form.Control type="text" placeholder="Klucz" onChange={e => setKey(e.target.value)}/>
                    </Col>
                    <Col lg={2} className="mb-2">
                        <Button className="w-100" type="submit" variant="dark" onClick={e => {
                            e.preventDefault();

                            var raw = JSON.stringify({"game_id": id, "key": key});
                            console.log(raw)
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            myHeaders.append("Authorization", "Bearer " + props.token);

                            fetch("/addkey", {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                }
                                );

                        }}>Dodaj</Button>
                    </Col>
                </Row>
            </Form>

            <p className="fltr">Wszystkie klucze</p>
            <p className="fbbt mb-1">#1 - Wiedźmin 3</p>

            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Klucz</th>
                        <th className="no-border-top">Czy sprzedany?</th>
                        <th className="no-border-top"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Tak</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Nie</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr><td colspan="2"></td></tr>
                </tbody>
            </Table>

            <p className="fbbt mb-1">#2 - Skyrim</p>
            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Klucz</th>
                        <th className="no-border-top">Czy sprzedany?</th>
                        <th className="no-border-top"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Tak</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>7EY04-J6046-8FTHH</td>
                        <td>Nie</td>
                        <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td>
                    </tr>
                    <tr><td colspan="2"></td></tr>
                </tbody>
            </Table>

        </LayoutAdmin>
    );
}