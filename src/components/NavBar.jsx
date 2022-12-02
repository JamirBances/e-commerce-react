import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartSideBar from "./CartSideBar";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShow(true);
    }else{
      navigate("/login")
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            E-Commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                <i className="fa-solid fa-user"></i>{" "}Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                <i className="fa-solid fa-basket-shopping"></i>{" "}Purchases
              </Nav.Link>
              <Nav.Link onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i>{" "}Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;
