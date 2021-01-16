import React, {useState, useEffect} from 'react';
import { Forbidden } from './Forbidden';
import { Table, Form, Button, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { LayoutAdmin } from './components/LayoutAdmin';
import { PencilSquare, XCircle } from 'react-bootstrap-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

const schemaUser = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().not(["0"], "Choose role"),
});

const schemaEditUser = yup.object({
    username: yup.string(),
    email: yup.string().email('Must be a valid email'),
    password: yup.string(),
    role: yup.string(),
});

export const Admin_users = (props) => {
    const [users, setUsers] = useState([]);
    const [userAdded, setUserAdded] = useState(false);
    const [userEdited, setUserEdited] = useState(false);

    const [usrid, setUsrid] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('0');

    const updateUsersList = () => {
        fetch('/allusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            },
        }).then(res => res.json())
        .then(data => setUsers(data.users));
    }

    useEffect(() => {
        updateUsersList();
    }, []);

    const handleSetUserEdit = (id) => {
        setUsrid(users[id].id);
        setUsername(users[id].username)
        setEmail(users[id].email);
        setRole(users[id].role);
    }

    if(!props.token || props.role != 'admin')
        return <Forbidden />;

    return (
        <LayoutAdmin>
            <p className="fltr">Dodaj użytkownika</p>
            <Formik 
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    role: ''

                }}
                onSubmit={(values,errors) => {  
                    setUserAdded(false);             
                    console.log(values);
                    let url, request;
                    if(values.role == '1')  // Admin
                        url = '/registeradmin';
                    else // User
                        url = '/register';
                    fetch(url, {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + props.token
                        },
                        body: JSON.stringify({"username": values.username, "email": values.email, 
                            "password": values.password})
                    }).then(res => {
                        if(res.ok) {
                            console.log("Dodano użytkownika");
                            updateUsersList();
                            setUserAdded(true);
                        } else {
                            if(res.status === 409)
                                errors.setFieldError('err', "Użytkownik o takim loginie lub mailu już istnieje");
                            else
                                errors.setFieldError('err', "Server side eror");
                        }
                    });
                    }
                }

                validationSchema={schemaUser}
            >
                {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                    <Form className="mb-2" onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col lg={3} className="mb-2" >
                                <Form.Control name="username" type="text" placeholder="Username" value={values.username} onChange={handleChange}
                                    isInvalid={touched.username && !!errors.username} />
                                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                            </Col>
                            <Col lg={3} className="mb-2">
                                <Form.Control name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange}
                                    isInvalid={touched.email && !!errors.email}/>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Form.Control name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange}
                                    isInvalid={touched.password && !!errors.password}/>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Form.Control name="role" as="select" className="mr-sm-2" id="inlineFormCustomSelect" 
                                    custom onChange={handleChange} isInvalid={touched.role && !!errors.role}>
                                    <option value="0" >Role...</option>
                                    <option value="1" >Admin</option>
                                    <option value="2" >User</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Button className="w-100" type="submit" variant="dark">Dodaj</Button>
                            </Col>
                        </Row>
                        {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                    </Form>
                )}
            </Formik>

            {userAdded ? <p className="text-success">Użytkownik został pomyślnie dodany</p> : null}

            <p className="fltr" id="edituser">Edytuj użytkownika</p>
            <Formik 
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    role: ''

                }}
                onSubmit={(values,errors) => {  
                    setUserEdited(false);             
                    console.log(password);
                    

                    fetch('/edituser', {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + props.token
                        },
                        body: JSON.stringify({"user_id": usrid, "newemail": email, "newpass": password, "newrole": role})
                    }).then(res => {
                        if(res.ok) {
                            console.log("Pomyślnie zedytowano użytkownika");
                            updateUsersList();
                            setUserEdited(true);
                        } else {
                            if(res.status === 409)
                                errors.setFieldError('err', "Użytkownik o takim loginie lub mailu już istnieje");
                            else
                                errors.setFieldError('err', "Server side eror");
                        }
                    });
                    
                }}

                validationSchema={schemaEditUser}
            >
                {({ handleSubmit, handleChange, values, isValid, errors, touched }) => (
                    <Form className="mb-2" onSubmit={handleSubmit} noValidate>
                        <Row>
                            <Col lg={3} className="mb-2">
                                <DropdownButton className="dropdown-fullw-light" id="dropdown-basic-button" 
                                        variant="outline-secondary" title={username === '' ? "Choose username" : username}>
                                    {users.map((u,index) => u.role !== 'banned' ?  
                                        <Dropdown.Item key={index} onClick={() => {handleSetUserEdit(index); setUsername(u.username); 
                                            setUsrid(u.id); values.username=username; }}>{u.username}</Dropdown.Item> : '')}
                                </DropdownButton>
                            </Col>
                            <Col lg={3} className="mb-2">
                                <Form.Control name="email" type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); values.email = e.target.value;} }
                                    isInvalid={touched.email && !!errors.email}/>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Form.Control name="password" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); values.password = e.target.value;}}
                                    isInvalid={touched.password && !!errors.password}/>
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Form.Control name="role" as="select" className="mr-sm-2"
                                    custom onChange={(e) => { setRole(e.target.value); values.role = e.target.value;}} value={role} isInvalid={touched.role && !!errors.role}>
                                    <option key="0" value="" >Role...</option>
                                    <option key="1" value="admin" >Admin</option>
                                    <option key="2" value="user" >User</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                            </Col>
                            <Col lg={2} className="mb-2">
                                <Button className="w-100" type="submit" variant="dark">Zastosuj</Button>
                            </Col>
                        </Row>
                        {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                    </Form>
                )}
            </Formik> 
            {userEdited ? <p className="text-success">Użytkownik został pomyślnie zmodyfikowany</p> : null}

            <p className="fltr">Wszyscy użytkownicy</p>

            <Table responsive>
                <thead>
                    <tr>
                        <th className="no-border-top">Username</th>
                        <th className="no-border-top">Email</th>
                        <th className="no-border-top">Role</th>
                        <th className="no-border-top">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u,index) => u.role !== 'banned' ? 
                        <tr>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td style={{ width: "120px" }}>
                                <Button className="icon p-0 mr-3" href="#edituser" variant="link" onClick={() => handleSetUserEdit(index)}> <PencilSquare className="text-black-50" size={20} /></Button>
                                <Button className="icon p-0" variant="link" onClick={() => {
                                    fetch('/ban', {
                                            method: 'PUT', 
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + props.token
                                            },
                                            body: JSON.stringify({"user_id": u.id})
                                    }).then(res => { if(res.ok) updateUsersList(); } )
                                    .catch(err => console.log(err));
                                }}> <XCircle className="text-black-50" size={20} /> </Button>
                            </td>
                        </tr> : null
                    )}

                    <tr><td colspan="4"></td></tr>
                </tbody>
            </Table>

        </LayoutAdmin>
    );
}