import { useState, useEffect } from "react";
import { Button, DropdownButton, Dropdown, Form, Row, Col } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import DatePicker from "react-date-picker";
import { Formik, useFormikContext, useField } from "formik";
import * as yup from "yup";

import request from "../../helpers/request";

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
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
            handleOnChange={(val) => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

export const EditGameForm = ({
    editedGame,
    setEditedGame,
    setIsGameEdited,
    allGames,
    allCategories,
    allPlatforms,
}) => {
    const [gameId, setGameId] = useState();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [age, setAge] = useState("");
    const [platform, setPlatform] = useState("");

    useEffect(() => {
        if (editedGame) {
            setGameId(editedGame.id);
            setName(editedGame.name);
            setPrice(editedGame.price);
            setQuantity(editedGame.quantity);
            setDescription(editedGame.description);
            setCategories(editedGame.categories.map((c) => c.name));
            setAge(editedGame.age_category);
            setPlatform(editedGame.platform.id);
        }
    }, [editedGame]);

    const schema = yup.object({
        quantity: yup.number().moreThan(-0.0000000001),
        price: yup.number().moreThan(-0.0000000001),
        age: yup.string(),
        categories: yup.array(),
        platform: yup.string(),
        date: yup.date().required("Date is required"),
    });

    return (
        <Formik
            initialValues={{
                name: "",
                quantity: "",
                price: "",
                description: "",
                age: "",
                categories: [],
                platform: "",
                date: new Date(),
            }}
            onSubmit={async (values, errors) => {
                setIsGameEdited(false);
                if (gameId !== undefined) {
                    let categories_id = [];
                    values.categories.map(
                        (name) =>
                            (categories_id = categories_id.concat(
                                allCategories.map((cat) => (cat.name === name ? cat.id : undefined))
                            ))
                    );
                    categories_id = categories_id.filter((x) => x !== undefined);
                    console.log(categories_id);

                    try {
                        const { status } = await request.post("/editgame", {
                            game_id: gameId,
                            price: price,
                            quantity: values.quantity,
                            description: description,
                            release_date: "default",
                            platform_id: platform,
                            age_category: values.age,
                            categories: categories_id,
                            "release-date": values.date.toString(),
                        });

                        if (status === 201) {
                            setIsGameEdited(true);
                        }
                    } catch (error) {
                        errors.setFieldError("err", "Wystąpił błąd");
                        console.warn(error);
                    }
                }
            }}
            validationSchema={schema}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="mb-2" onSubmit={(e) => e.preventDefault()}>
                    <Row>
                        <Col lg={6} className="mb-2">
                            <DropdownButton
                                name="name"
                                className="dropdown-fullw-light"
                                variant="outline-secondary"
                                title={name === "" ? "Wybierz grę..." : name}
                            >
                                {allGames
                                    ? allGames.map((g) => (
                                          <Dropdown.Item
                                              key={g.id}
                                              onClick={() => {
                                                  setEditedGame(g);
                                                  values.name = g.name;
                                              }}
                                          >
                                              {g.name}
                                          </Dropdown.Item>
                                      ))
                                    : null}
                            </DropdownButton>
                            {touched.name && gameId === undefined ? (
                                <p className="text-danger" style={{ fontSize: "80%" }}>
                                    Choose game...
                                </p>
                            ) : null}
                        </Col>
                        <Col lg={2} className="mb-2">
                            <Form.Control
                                name="price"
                                type="text"
                                placeholder="Cena (zł)"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    values.price = e.target.value;
                                }}
                                isInvalid={touched.price && !!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Col>
                        <Col lg={4} className="mb-2">
                            <Form.Control
                                name="quantity"
                                type="text"
                                placeholder="Ilość wersji pudełkowej"
                                value={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                    values.quantity = e.target.value;
                                }}
                                isInvalid={touched.quantity && !!errors.quantity}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.quantity}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            {allCategories.length === 0 ? null : (
                                <DropdownMultiselectField
                                    name="categories"
                                    buttonClass="mb-2 dropdownmulti-light"
                                    placeholder="Kategorie"
                                    options={allCategories.map((i) => i.name)}
                                    selected={categories}
                                    handleOnChange={(s) => setCategories(s)}
                                />
                            )}
                            {touched.categories && errors.categories ? (
                                <p className="text-danger" style={{ fontSize: "80%" }}>
                                    {errors.categories}
                                </p>
                            ) : null}

                            <Form.Control
                                name="platform"
                                as="select"
                                className="mr-sm-2 mb-2"
                                custom
                                onChange={(e) => {
                                    setPlatform(e.target.value);
                                    values.platform = e.target.value;
                                }}
                                value={platform}
                            >
                                <option value="">Platforma</option>
                                {allPlatforms.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name.toUpperCase()}
                                    </option>
                                ))}
                            </Form.Control>
                            {touched.platform && errors.platform ? (
                                <p className="text-danger" style={{ fontSize: "80%" }}>
                                    {errors.platform}
                                </p>
                            ) : null}
                        </Col>
                        <Col lg={3}>
                            <Form.Control
                                name="age"
                                as="select"
                                className="mr-sm-2 mb-2"
                                value={age}
                                custom
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    values.age = e.target.value;
                                }}
                            >
                                <option value="">Wiek</option>
                                <option value="PEGI3">PEGI3</option>
                                <option value="PEGI4">PEGI4</option>
                                <option value="PEGI6">PEGI6</option>
                                <option value="PEGI7">PEGI7</option>
                                <option value="PEGI11">PEGI11</option>
                                <option value="PEGI12">PEGI12</option>
                                <option value="PEGI15">PEGI15</option>
                                <option value="PEGI14">PEGI14</option>
                                <option value="PEGI16">PEGI16</option>
                                <option value="PEGI18">PEGI18</option>
                            </Form.Control>
                            {touched.age && errors.age ? (
                                <p className="text-danger" style={{ fontSize: "80%" }}>
                                    {errors.age}
                                </p>
                            ) : null}

                            <DatePickerField
                                className="calendar mb-2"
                                name="date"
                                value={values.date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Col>

                        <Col lg={6} className="mb-2">
                            <Form.Control
                                as="textarea"
                                style={{ height: "100%" }}
                                rows={2}
                                name="description"
                                placeholder="Opis"
                                value={description}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2} className="offset-lg-10 mb-2">
                            <Button
                                className="w-100"
                                type="submit"
                                variant="dark"
                                onClick={handleSubmit}
                            >
                                Zastosuj
                            </Button>
                        </Col>
                    </Row>
                    {errors.err ? <p className="text-danger">{errors.err}</p> : null}
                </Form>
            )}
        </Formik>
    );
};
