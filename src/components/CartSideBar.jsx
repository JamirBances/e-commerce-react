import React, { useEffect, useState } from "react";
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

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    carts.forEach((cartProduct) => {
      total += cartProduct.price * cartProduct.productsInCart.quantity;
    });
    setTotalPrice(total);
  }, [carts]);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <i className="fa-solid fa-cart-shopping"></i> Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-side-bar-body">
        <div className="cart-side-bar-body-container">
          {carts.map((cart) => (
            <Container key={cart.id} className="cart-side-bar-body-products">
              <Row>
                <Col sm={8}>{cart.title}</Col>
                <Col sm={4}>Delete</Col>
              </Row>
              <Row>
                <Col sm={12}>
                  Quantity: {cart.productsInCart.quantity}
                  <b>Total: ${cart.productsInCart.quantity * cart.price}</b>
                </Col>
              </Row>
            </Container>
          ))}
        </div>
        <div className="cart-side-bar-body-button">
          <p>
            Total: $<span>{totalPrice}</span>
          </p>
          <Button onClick={() => dispatch(checkoutCartThunk())}>
            Checkout <i className="fa-solid fa-receipt"></i>
          </Button>
        </div>
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
