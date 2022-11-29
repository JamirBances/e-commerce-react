import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterDetailProductsThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [categoriesList, setCategoriesList] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  /* console.log(categoriesList); */

  return (
    <div>
      <Row>
        {/* Categories */}
        <Col lg={3}>
          <ListGroup>
            {categoriesList.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterProductsThunk(category.id))}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Products */}
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="What are you looking for ?"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterDetailProductsThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} xl={3} className="g-4">
            {products.map((productItem) => (
              <Col key={productItem.id}>
                <Card>
                  <Link
                    to={`/products/${productItem.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={productItem.productImgs[0]}
                      alt="productImg"
                    />
                    <Card.Body>
                      <Card.Title>{productItem.title}</Card.Title>
                      <Card.Text>
                        <span>Price</span> {" "}<br/>
                        <span style={{color:"red", fontWeight: "bold"}}>${productItem.price}</span>
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
