import React, {useEffect, useState} from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    game: yup.string().required('Choose game...'),
    key: yup.string().required(),
});

export const Admin_keys = (props) => {
    const [game, setGame] = useState("Choose game...");
    const [games, setGames] = useState([]);
    const [id, setId] = useState();
    const [keyAdded, setKeyAdded] = useState(false);

    const updateGames = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let i = 1;
        let totalPages = 1;
        let arr = [];

        while (i <= totalPages) {
            const res = await fetch("/games", {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({"search_filter":{
                    "digital": 1,
                    "page_number": i
                }}),
                redirect: 'follow'
            });
            const data = await res.json();
            totalPages = Math.ceil(data.total_number / data.results_per_page);
            
            arr = await arr.concat(data.games);
            i++;
        }

        myHeaders.append("Authorization", "Bearer " + props.token);
        await Promise.all(arr.map(async(g, index) => {
            const res = await fetch('/keys?game_id=' + g.id, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                },
            });
            const data = await res.json();
            arr[index].keys = data.keys ? data.keys : [];

        }))

        setGames(arr);
    }

    useEffect(async () => {
        updateGames();
        
    }, []);


    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj klucz</p>
            <Formik 
                initialValues={{
                    game: '',
                    key: ''
                }}
                onSubmit={(values,errors) => {  
                    setKeyAdded(false);
                    fetch("/addkey", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.token
                        },
                        body: JSON.stringify({"game_id": id, "key": values.key})
                    })
                    .then(res => { if(res.ok) {setKeyAdded(true);  updateGames(); } else errors.setFieldError('err', 'Key already exists') })
                    .catch(err => console.log(err));
                }}

                validationSchema={schema}
            >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form className="mb-2" onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4} className="mb-2">
                            <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button"
                                            variant="outline-secondary" title={game}>
                                {games.map(g => 
                                    <Dropdown.Item key={g.id} onClick={e => { setGame(g.name); setId(g.id); values.game=game; } } >{g.id}: {g.name} - {g.price} zł</Dropdown.Item> )}
                            </DropdownButton>
                            {errors.game ? <p className="text-danger">{errors.game}</p> : null}
                            
                        </Col>
                        <Col lg={6} className="mb-2">
                            <Form.Control name="key" value={values.key} type="text" placeholder="Klucz" onChange={handleChange}
                                isInvalid={touched.key && !!errors.key}/>
                            <Form.Control.Feedback type="invalid">{errors.key}</Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Button className="w-100" type="submit" variant="dark" >Dodaj</Button>
                        </Col>
                    </Row>
                    
                    {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                </Form>
                
            )}
            </Formik>
            {keyAdded ? <p className="text-success">Klusz został pomyślnie dodany</p> : null}

            <p className="fltr">Wszystkie klucze</p>
            
            {games.map(g => <div><p className="fbbt mb-1">#{g.id} - {g.name}</p>
            
            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Klucz</th>
                        <th className="no-border-top" style={{ width: "250px" }}>Czy sprzedany?</th>
                        {/* <th className="no-border-top" style={{ width: "60px" }}></th> */}
                    </tr>
                </thead>
                <tbody>
                    {g.keys.map(k => <tr>
                        <td>{k.key}</td>
                        <td>{k.used ? "Tak" : "Nie"}</td>
                        {/* <td style={{ width: "60px" }}>
                            <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                        </td> */}
                    </tr>)}
                    
                    <tr><td colspan="2"></td></tr>
                </tbody>
            </Table>
            
            </div>)}


        </LayoutAdmin>
    );
}