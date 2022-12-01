import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  return (
    <div>
      <h1>Purchases</h1>
      {purchases.map((purchase) => (
        <Container key={purchase.id} className="purchases-container">
          <div className="purchases-date">{purchase.createdAt}</div>
          {purchase.cart.products.map((purchaseItem) => (
            <div key={purchaseItem.id} className="purchases-detail">
              <Row xs={1}>
                <Col md={6}>{purchaseItem.title}</Col>
                <Col md={3}>Quantity: {purchaseItem.productsInCart.quantity}</Col>
                <Col md={3}>Price: <b className="purchases-detail-price">${purchaseItem.price}</b></Col>
              </Row>
            </div>
          ))}
        </Container>
      ))}
    </div>
  );
};

export default Purchases;
/* {purchases.map((purchase) => (
          <ul key={purchase.id}>
            {purchase.cart.products.map((purchaseItem) => (
              <Link key={purchaseItem.id} to={`/products/${purchaseItem.id}`}>
                <li>
                  {purchaseItem.productsInCart.createdAt} {purchaseItem.title}{" "}
                  {`Quantity: ${purchaseItem.productsInCart.quantity}`}{" "}
                  {`Price: ${purchaseItem.price}`}{" "}
                </li>
              </Link>
            ))}
          </ul>
        ))} */
