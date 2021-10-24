import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../redux/actions";
import CheckboxTree from "react-checkbox-tree";
import Input from "../../UI/Input/Input";
import Modals from "../../UI/Modal/Modal";
import Layout from "../Layout/Layout";
import { IoCheckbox } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { AiOutlineCheckSquare } from "react-icons/ai";

const Category = (props) => {
  //States
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  //

  const dispatch = useDispatch();

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

  const category = useSelector((state) => state.category);
  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, []);

  const renderCategories = (categories) => {
    console.log(categories);
    let categoryList = [];

    for (let category of categories) {
      categoryList.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categoryList;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };
  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoryModal = () => {
    return (
      <Modals
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        title={"Update Categories"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
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
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  value={item.parentId}
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
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  // value={parentId}
                  //onChange={(e) => setParentId(e.target.value)}
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
            <h6>Checked</h6>
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
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
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
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  //value={parentId}
                  // onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">Select Category</option>
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

  const renderAddCategoryModal = () => {
    return (
      <Modals show={show} handleClose={handleClose} title={"Add New Category"}>
        <Input
          type="text"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Form.Select
          aria-label="Default select example"
          className="mb-3"
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
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    dispatch(deleteCategoriesAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
        setDeleteCategoryModal(false);
      }
    });
  };

  const renderDeleteCategoryModal = () => {
    console.log("delete", checkedArray);
    return (
      <Modals
        title="Confirm? "
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("No");
            },
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}

        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modals>
    );
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
              {/* <ul>{renderCategories(category.categories)}</ul> */}
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoCheckbox />,
                  uncheck: <AiOutlineCheckSquare />,
                  halfCheck: <AiOutlineCheckSquare />,
                  expandClose: <IoIosArrowForward />,
                  expandOpen: <IoIosArrowDown />,
                }}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <button className="edit-btn  me-5" onClick={updateCategory}>
                Edit
              </button>
              <button className="delete-btn" onClick={deleteCategory}>
                Delete
              </button>
            </Col>
          </Row>
        </Container>
        {/* Add Category  */}
        {renderAddCategoryModal()}
        {/* Edit Categories */}
        {renderUpdateCategoryModal()}
        {renderDeleteCategoryModal()}
      </Layout>
    </div>
  );
};

export default Category;
