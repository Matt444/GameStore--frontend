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
            format="y-MM-dd"
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
            selected={field.categories}
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
    const [image, setImage] = useState("");

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
            setImage(editedGame.image_url);
        }
    }, [editedGame]);

    const schema = yup.object({
        quantity: yup.number().moreThan(-0.0000000001),
        price: yup.number().moreThan(-0.0000000001),
        age: yup.string(),
        categories: yup.array(),
        platform: yup.string(),
        date: yup.date().required("Date is required"),
        image_url: yup.string(),
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
                image_url: "",
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

                    console.log("image", image);

                    try {
                        const { status } = await request.patch(`/games/${gameId}`, {
                            price: price || undefined,
                            quantity: values.quantity || undefined,
                            description: description || undefined,
                            platform_id: platform || undefined,
                            age_category: values.age || undefined,
                            categories_id: categories_id || undefined,
                            release_date: `${values.date.getFullYear()}-${values.date.getMonth()}-${values.date.getDay()}`,
                            image_url: image || undefined,
                        });

                        if (status === 200) {
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
                                {allGames &&
                                    allGames.map((g) => (
                                        <Dropdown.Item
                                            key={g.id}
                                            onClick={() => {
                                                setEditedGame(g);
                                                values.name = g.name;
                                            }}
                                        >
                                            {g.name}
                                        </Dropdown.Item>
                                    ))}
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
                                    categories={categories}
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
                                <option value="PEGI 3">PEGI 3</option>
                                <option value="PEGI 7">PEGI 7</option>
                                <option value="PEGI 12">PEGI 12</option>
                                <option value="PEGI 16">PEGI 16</option>
                                <option value="PEGI 18">PEGI 18</option>
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
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    values.description = e.target.value;
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} className="mb-2">
                            <Form.Control
                                name="image_url"
                                type="text"
                                value={image}
                                placeholder="Image URL"
                                onChange={(e) => {
                                    setImage(e.target.value);
                                    values.image_url = e.target.value;
                                }}
                                isInvalid={touched.image_url && !!errors.image_url}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image_url}
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
