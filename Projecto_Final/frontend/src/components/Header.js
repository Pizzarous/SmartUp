import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { } from "react-router-dom";
import { logout } from "../redux/actions/userActions";


const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => { }, [userInfo]);

  return (
    <Navbar >
      <Container>
        <>
          <Navbar.Brand href="/">&lt; SMART^UP /&gt;</Navbar.Brand>
          <Nav.Link href="/games">All Games</Nav.Link>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`${userInfo.name}`}
                    id="collapsible-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </>
      </Container>
    </Navbar>
  );
}

export default Header;