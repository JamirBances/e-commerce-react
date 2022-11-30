import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cartSideBar.slice';

const CartSideBar = ({ handleClose, show }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [])

  const carts = useSelector((state) => state.cart);

  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {carts.map((cart) => (
            <div key={cart.id}>
              {cart.title}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default CartSideBar;