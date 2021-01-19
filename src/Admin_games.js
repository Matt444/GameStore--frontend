import React, {useEffect, useState} from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { BoxArrowUpRight, PencilSquare, XCircle } from 'react-bootstrap-icons';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import DatePicker from 'react-date-picker';
import { Formik, useField, useFormikContext } from 'formik';
import * as yup from 'yup';

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
    );
  };

const DropdownMultiselectField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DropdownMultiselect
        {...field}
        {...props}
        
        handleOnChange={val => {
          setFieldValue(field.name, val);
        }}
      />
    );
  };

  
export const Admin_games = (props) => {
    const [value, onChange] = useState(new Date());
    const [allGames, setAllGames] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [descr, setDesscr] = useState("");
    const [categories, setCategories] = useState([]);
    const [age, setAge] = useState();
    const [platform, setPlatform] = useState();
    const [allPlatforms, setAllPlatforms] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [gameAdded, setGameAdded] = useState(false);
    const [adding, setAdding] = useState(true);
    

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

        setAllGames(arr);
    }

    useEffect(() => {
        fetch("/categories").then(response =>
            response.json().then(data => {
                setAllCategories(data.categories);
            })
        );

        fetch("/platforms").then(response =>
            response.json().then(data => {
                setAllPlatforms(data.platforms);
            })
        );

        updateGames();

    }, []);


    if(!props.token || props.role != 'admin')
        return <Forbidden />;
        
    return (
    <LayoutAdmin>
        <p className="fltr">Dodaj grę</p>
        <Formik 
                initialValues={{
                    name: '',
                    quantity: '',
                    price: '',
                    description: '',
                    age: '',
                    categories: [],
                    platform: '',
                    date: new Date(),

                }}
                onSubmit={(values,errors) => {  
                    console.log(values);
                    setGameAdded(false);

                    let categories_id = [];
                    values.categories.map(name => categories_id = categories_id.concat( allCategories.map(cat => cat.name === name ? cat.id : undefined )) );
                    categories_id = categories_id.filter(x => x !== undefined);
                    console.log(categories_id);

                    let is_digital = 1;
                    if (quantity && quantity > 0){
                            is_digital = 0;
                    }

                    fetch("/addgame", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.token
                        },
                        body: JSON.stringify({"name": values.name, "price" : values.price, "quantity" : values.quantity,
                        "description" : values.description, "release_date" : "default", "is_digital" : is_digital,
                        "platform_id" : values.platform, "age_category" : values.age, 
                        "categories" : categories_id , "release-date": values.date.toString() }),
                        redirect: 'follow'
                    }).then(res => { if(res.ok) { setGameAdded(true); updateGames(); } else {errors.setFieldError('err', 'Wystąpił błąd'); } })
                    .catch(err => console.log(err));
                }}

                validationSchema={yup.object({
                    name: yup.string().required('Name is required'),
                    quantity: yup.number().required('Quantity is required').moreThan(-0.0000000001),
                    price: yup.number().required('Price is required').moreThan(-0.0000000001),
                    age: yup.string().required('Age is required'),
                    categories: yup.array().min(1).required('Categories are required'),
                    platform: yup.string().required('Platform is required'),
                    date: yup.date().required('Date is required')
                })}
            >
            {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                <Form className="mb-2" onSubmit={e => e.preventDefault()}>
                    <Row>
                        <Col lg={6} className="mb-2">
                            <Form.Control name="name" type="text" placeholder="Nazwa" value={values.name} onChange={handleChange}
                                    isInvalid={touched.name && !!errors.name}/>
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Form.Control name="price" type="text" placeholder="Cena (zł)" value={values.price} onChange={handleChange}
                                    isInvalid={touched.price && !!errors.price}/>
                            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                        </Col>
                        <Col lg={4} className="mb-2">
                            <Form.Control name="quantity" type="text" placeholder="Ilość wersji pudełkowej" value={values.quantity} onChange={handleChange}
                                    isInvalid={touched.quantity && !!errors.quantity}/>
                            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col lg={3}>
                            {allCategories.length === 0 ? null :
                            <DropdownMultiselectField name="categories" buttonClass="mb-2 dropdownmulti-light" placeholder="Kategorie"
                                options={allCategories.map(i => i.name)} 
                            /> }
                            {touched.categories && errors.categories ? <p className="text-danger" style={{fontSize: "80%"}}>{errors.categories}</p> : null}
                            

                            <Form.Control name="platform" as="select" className="mr-sm-2 mb-2"
                                    custom onChange={handleChange} >
                                    <option value="" >Platforma</option>
                                    {allPlatforms.map(p => <option value={p.id} >{p.name.toUpperCase()}</option>)}
                            </Form.Control>
                            {touched.platform && errors.platform ? <p className="text-danger" style={{fontSize: "80%"}}>{errors.platform}</p> : null}
                                
                        </Col>
                        <Col lg={3}>
                            <Form.Control name="age" as="select" className="mr-sm-2 mb-2"
                                    custom onChange={handleChange} >
                                    <option value="" >Wiek</option>
                                    <option value="PEGI7">PEGI7</option>
                                    <option value="PEGI14">PEGI14</option>
                                    <option value="PEGI16">PEGI16</option>
                                    <option value="PEGI18">PEGI18</option>
                            </Form.Control>
                            {touched.age && errors.age ? <p className="text-danger" style={{fontSize: "80%"}}>{errors.age}</p> : null}
                            

                            <DatePickerField className="calendar mb-2" name="date" 
                                value={values.date} />
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                        </Col>
                    
                        <Col lg={6} className="mb-2" >
                            <Form.Control as="textarea" style={{ height: "100%"}} rows={2} name="description" 
                                placeholder="Opis" value={values.description} onChange={handleChange} />
                            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col lg={2} className="offset-lg-10 mb-2">
                            <Button className="w-100" type="submit" variant="dark" onClick={handleSubmit}>Dodaj</Button>
                        </Col>
                    </Row>
                    {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                </Form>
            )}
        </Formik>
        {gameAdded ? <p className="text-success">Gra została pomyślnie dodana</p> : null}

        <p className="fltr">Edytuj grę</p>
        <Form className="mb-2">
            <Row>
                <Col lg={6} className="mb-2">
                    <DropdownButton className="dropdown-fullw-light" variant="outline-secondary" id="dropdown-basic-button" title="Nazwa">
                        <Dropdown.Item href="#/action-1">Twierdza</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={2} className="mb-2">
                    <Form.Control type="text" placeholder="Cena (zł)" />
                </Col>
                <Col lg={4} className="mb-2">
                    <Form.Control type="text" placeholder="Ilość wersji pudełkowej" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={3}>
                    {allCategories.length === 0 ? null : 
                    <DropdownMultiselect buttonClass="mb-2 dropdownmulti-light" placeholder="Kategorie" id="multi2"
                        options={allCategories.map(i => i.name)}
                        name="countries"
                    />
                    }
                    
                    <DropdownButton className="mb-2 dropdown-fullw-light" variant="outline-secondary" id="dropdown-basic-button" title="Platforma">
                        <Dropdown.Item href="#/action-1">PC</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">PS4</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col lg={3}>
                    <Form.Control className="mb-2" type="text" placeholder="Wiek" />
                    <DatePicker
                        className="calendar mb-2"
                        onChange={onChange}
                        value={value}
                    />
                </Col>
               
                <Col lg={6} className="mb-2" >
                    <Form.Control as="textarea" style={{ height: "100%"}} rows={2} placeholder="Opis" />
                </Col>
                
            </Row>
            <Row>
                <Col lg={3} className="offset-lg-7 mb-2">
                    <Button className="w-100" type="submit" variant="outline-dark">Dodaj klucze</Button>
                </Col>
                <Col lg={2} className="mb-2">
                    <Button className="w-100" type="submit" variant="dark">Zastosuj</Button>
                </Col>
            </Row>
            
        </Form>

        <p className="fltr">Wszystkie gry</p>

        <Table responsive>
            <thead>
                <tr>
                    <th className="no-border-top">Nazwa</th>
                    <th className="no-border-top" style={{ width: "120px" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allGames ? allGames.map(g => <tr>
                    <td>{g.name}</td>
                    <td>
                        <Button className="icon p-0 mr-2 pb-1" variant="link"> <BoxArrowUpRight className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0 mr-2" variant="link"> <PencilSquare className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr> ) : null}
                <tr>
                    <td>Wiedźmin 3</td>
                    <td>
                        <Button className="icon p-0 mr-2 pb-1" variant="link"> <BoxArrowUpRight className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0 mr-2" variant="link"> <PencilSquare className="text-black-50" size={20} /> </Button>
                        <Button className="icon p-0" variant="link"> <XCircle className="text-black-50" size={20} /> </Button>
                    </td>
                </tr>
                <tr><td colSpan="2"></td></tr>
            </tbody>
        </Table>

    </LayoutAdmin>
    )
};