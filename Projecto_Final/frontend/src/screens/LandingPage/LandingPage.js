import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./LandingPage.module.css";

function LandingPage() {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className={styles.mainDiv}>
      <Container>
        <Row>
          <div className={styles.divIntro}>
            <div>
              <h1 className={styles.title}>Welcome to</h1>
              <p className={styles.catchyP}>The Leader in Educational Games for Kids!</p>
              <img className={styles.logo} src="https://i.imgur.com/2Gor0cm.png" />
              <p className={styles.catchyP}>Have Fun while you learn!<br />
                Let's get started by getting in to your account!</p>
            </div>
            <div className={styles.buttonContainer}>
              {userInfo ? (
                <>
                  <Link to="/games">
                    <Button className={styles.sendButtonP}>PLAY HERE!</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button className={styles.sendButton}>Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className={styles.sendButton}>Sign-Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;