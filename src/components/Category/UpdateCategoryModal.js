import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";

const UpdateCategoryModal = (props) => {
  const {
    show,
    handleClose,
    title,
    size,
    expandedArray,
    checkedArray,
    categoryList,
    handleCategoryInput,
  } = props;
  return (
    <Modals
      show={show}
      handleClose={handleClose}
      title={title}
      size={size}
      handleCategoryInput={handleCategoryInput}
    >
      <Row>
        <Col>
          <h6 className="fw-bold">Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                type="text"
                value={item.name}
                placeholder="Category Name"
                className="form-control-sm"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                value={item.parentId}
                size="sm"
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select Category</option>
                <option value="page">Page</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
              </Form.Select>
            </Col>
          </Row>
        ))}

      <Row>
        <Col>
          <h6 className="fw-bold">Checked</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                type="text"
                value={item.name}
                placeholder="Category Name"
                className="form-control-sm"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select Type</option>
                <option value="page">Page</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
              </Form.Select>
            </Col>
          </Row>
        ))}
    </Modals>
  );
};

export default UpdateCategoryModal;
