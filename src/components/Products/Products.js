import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";
import Layout from "../Layout/Layout";

const Products = (props) => {
  //Product
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const dispatch = useDispatch();

  //

  const [show, setShow] = useState(false);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //handle productpictures
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Pictures</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>--</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between">
                <h3>Product</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add Product
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={12}>{renderProducts()}</Col>
          </Row>
        </Container>

        <Modals show={show} handleClose={handleClose} title={"Add New Product"}>
          <Input
            label="Name"
            type="text"
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Price"
            type="text"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Quantity"
            type="text"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Description"
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Select
            aria-label="Default select example"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>

          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <Input
            label="Product Images"
            type="file"
            placeholder="Product Image"
            name="productPicture"
            onChange={handleProductPictures}
          />
        </Modals>
      </Layout>
    </div>
  );
};

export default Products;
