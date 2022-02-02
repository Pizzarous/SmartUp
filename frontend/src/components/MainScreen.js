import React from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./MainScreen.module.css";

function MainScreen({ children, title }) {
  return (
    <div className={styles.mainPage}>
      <Container>
        <Row>
          <div className={styles.pageTitle}>
            {title && (
              <>
                <h1 className={styles.headingStyle}>{title}</h1>
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;