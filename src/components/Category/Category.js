import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../redux/actions";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";

import Layout from "../Layout/Layout";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    // const cat = {
    //   categoryName,
    //   parentId,
    //   categoryImage,
    // };
    // console.log(cat);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  const renderCategories = (categories) => {
    console.log(categories);
    let categoryList = [];

    for (let category of categories) {
      categoryList.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between">
                <h3>Category</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add Category
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ul>{renderCategories(category.categories)}</ul>
            </Col>
          </Row>
        </Container>
        <Modals
          show={show}
          handleClose={handleClose}
          title={"Add New Category"}
        >
          <Input
            type="text"
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Form.Select
            aria-label="Default select example"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
          <Input
            type="file"
            placeholder="Category Image"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Modals>
      </Layout>
    </div>
  );
};

export default Category;
