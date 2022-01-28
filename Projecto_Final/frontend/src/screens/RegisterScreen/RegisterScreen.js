import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../redux/actions/userActions";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterScreen.module.css";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [acceptsTerms, setAcceptsTerms] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password, passwordConfirmation, acceptsTerms));
        setSubmitted(true)
    };

    useEffect(() => {
        if(!loading && !error && submitted)
        navigate(`/login`);
    }, [loading, error, submitted, navigate]);

    return (
        <MainScreen title="REGISTER">
        <div className={styles.registerContainer}>
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
            <Form.Group className={styles.formFields} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                value={name}
                placeholder="Enter your name..."
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className={styles.formFields} controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                value={email}
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className={styles.formFields} controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={password}
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className={styles.formFields} controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                value={passwordConfirmation}
                placeholder="Confirm your password..."
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </Form.Group>

            <Form.Group className={styles.checkboxTerms} controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" 
                label="Terms and Conditions" 
                onChange={(e) => setAcceptsTerms(e.target.checked)}
                />
            </Form.Group>

            <Col className={styles.formError}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            </Col>

            <Button className={styles.buttonRegister} type="submit" >
                Register
            </Button>
            </Form>
            <Row className={styles.rowRegister}>
            <Col>
                Have an Account already? <Link to="/login">Login here!</Link>
            </Col>
            </Row>
        </div>
        </MainScreen>
      );
    }

export default RegisterScreen;