import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    categoryName,
    parentId,
    categoryList,
    handleCategoryImage,
    setParentId,
    setCategoryName,
    title,
  } = props;
  return (
    <Modals show={show} handleClose={handleClose} title={title}>
      <Container>
        <Row>
          <Col>
            <Input
              type="text"
              value={categoryName}
              placeholder="Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
              className="form-control-sm"
            />
          </Col>
          <Col>
            <Form.Select
              size="sm"
              className="mb-3"
              aria-label="Default select example"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option>Select Category</option>
              {categoryList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Input
            type="file"
            placeholder="Category Image"
            size="sm"
            className="form-control-sm"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Row>
      </Container>
    </Modals>
  );
};

export default AddCategoryModal;
