import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const productList = useSelector((state) => state.products);

  const productsFound = productList.find(
    (productsItem) => productsItem.id === Number(id)
  );
  const relatedProducts = productList.filter(
    (productsItem) =>
      productsItem?.category.id === productsFound?.category.id &&
      productsItem?.id !== productsFound?.id
  );

  console.log(productsFound);

  return (
    <div>
      <h1 className="product-detail-h1">{productsFound?.title}</h1>
      <Row xs={1} xl={2}>
        <Col className="product-detail-img-container">
          <img
            src={productsFound?.productImgs[0]}
            alt="productImg"
            className="product-detail-img"
          />
        </Col>
        <Col>
          <p className="product-detail-description">
            {productsFound?.description}
          </p>
          <Row>
            <Col>
              <span>Price</span> <br />
              <span style={{ color: "red", fontWeight: "bold" }}>
                ${productsFound?.price}
              </span>
            </Col>
            <Col>Quantity</Col>
          </Row>
          <Button variant="danger" style={{ marginTop: "1rem", width: "100%" }}>
            Add to cart
          </Button>
        </Col>
      </Row>
      <Row xs={1}>
        <h3 style={{ paddingTop: "2.5rem" }}>Related Products:</h3>
        {relatedProducts.map((productsItem) => (
          <Col md={4}>
            <Card className="product-detail-card">
              <Link
                to={`/products/${productsItem.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card.Img
                  variant="top"
                  src={productsItem.productImgs[0]}
                  alt="productImg"
                  className="product-detail-card-img-top"
                />
                <Card.Body>
                  <Card.Title>{productsItem.title}</Card.Title>
                  <Card.Text>
                    <span>Price</span> <br />
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ${productsItem.price}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductDetail;