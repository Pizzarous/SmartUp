// const LoginScreen = () => {
//     return <div>LOGIN</div>
// };

// export default LoginScreen;
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../redux/actions/userActions";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import styles from "./LoginScreen.module.css";

// O useDispatch hook é usado para fazer dispatch numa action enquanto o useSelector hook é usado para obter o state através do redux.
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)

  // A dispatch function chama o nosso reducer e passa o current state e o action object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setSubmitted(true)
  };

  useEffect(() => {
    if (!loading && !error && submitted)
      navigate(`/`);
  }, [loading, error, submitted, navigate]);

  return (
    <MainScreen title="LOGIN">
      <div className={styles.loginContainer}>

        <Form onSubmit={submitHandler}>
          <Form.Group className={styles.inputField} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className={styles.inputField} controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className={styles.login}>
            <Button className={styles.submitButton} type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <Row className={styles.newAccount}>
          <Col>
            <br />
            Don't have an account yet? <Link to="/register">Register Here!</Link>
          </Col>
        </Row>
        <div className={styles.formErrorError}>
          <Row>
            <Col className={styles.inputError}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </Col>
          </Row>
          {loading && <Loading />}
        </div>
      </div>
    </MainScreen >
  );
}

export default LoginScreen;