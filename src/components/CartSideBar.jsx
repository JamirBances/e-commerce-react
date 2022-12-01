import React, { useEffect } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutCartThunk,
  getCartThunk,
} from "../store/slices/cartSideBar.slice";

const CartSideBar = ({ handleClose, show }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const carts = useSelector((state) => state.cart);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-side-bar-body">
        {carts.map((cart) => (
          <Container className="cart-side-bar-body-container">
            <Row>
              <Col sm={8}>{cart.title}</Col>
              <Col sm={4}>Delete</Col>
            </Row>
            <Row>
              <Col sm={8}>Quantity: {cart.productsInCart.quantity}</Col>
            </Row>
            <Row>
              <Col sm={12}>Total: <b>${cart.productsInCart.quantity * cart.price}</b></Col>
            </Row>
          </Container>
        ))}
        <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSideBar;

{
  /* <div key={cart.id}>
      {cart.title}{" - "}
      {cart.productsInCart.quantity}{" - "}
      {cart.productsInCart.quantity * cart.price}
    </div> */
}
