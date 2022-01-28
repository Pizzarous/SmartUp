import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <Container>
        <Row>
          <Col className={styles.websiteRights}>Copyright &copy; &lt; SMART^UP /&gt;</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;