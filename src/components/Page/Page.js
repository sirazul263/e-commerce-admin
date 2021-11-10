import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";
import { Col, Container, Form, Row } from "react-bootstrap";
import createCategoryList from "../../helpers/linearCategoryList";
import { useSelector } from "react-redux";

const Page = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const category = useSelector((state) => state.category);
  useEffect(() => {
    setCategories(createCategoryList(category.categories));
  }, [category]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category._id == e.target.value
    );
    if (category) {
      setType(category.type);
    }

    setCategoryId(e.target.value);
  };
  const handleBannerImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImage = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type ", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    console.log({ title, desc, categoryId, type, banners, products });
    //setCreateModal(false);
  };
  const renderCreatePageModal = () => {
    return (
      <Modals
        show={createModal}
        title={"Create New Page"}
        handleClose={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <Form.Select
                aria-label="Default select example"
                value={categoryId}
                size="sm"
                onChange={onCategoryChange}
              >
                <option>Select Category</option>
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page Title"
                label="Page Title"
                type="text"
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Page Description"
                label="Page  Description"
                type="text"
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input
                name={banners}
                onChange={handleBannerImage}
                label="Banner Image"
                type="file"
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            {products.length > 0
              ? banners.map((product, index) => (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input
                name={products}
                onChange={handleProductImage}
                label="Product Image"
                type="file"
                className="form-control-sm"
              />
            </Col>
          </Row>
        </Container>
      </Modals>
    );
  };
  return (
    <div>
      <Layout sidebar>
        {renderCreatePageModal()}
        <button onClick={() => setCreateModal(true)}>Ok</button>
      </Layout>
    </div>
  );
};

export default Page;
