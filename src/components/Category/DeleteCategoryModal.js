import React from "react";
import Modals from "../../UI/Modal/Modal";

const DeleteCategoryModal = (props) => {
  const {
    title,
    show,
    handleClose,
    deleteCategories,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <Modals
      title={title}
      show={show}
      handleClose={handleClose}
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
      <div className="mb-3">
        <h5 className="text-center  fw-bold">Expanded</h5>
        {expandedArray.map((item, index) => (
          <span
            key={index}
            className="d-block text-center"
            style={{ fontSize: 12 }}
          >
            {item.name}
          </span>
        ))}
      </div>

      <h5 className="text-center fw-bold">Checked</h5>
      {checkedArray.map((item, index) => (
        <span
          key={index}
          className="d-block text-center"
          style={{ fontSize: 12 }}
        >
          {index + 1}. {item.name}
        </span>
      ))}
    </Modals>
  );
};

export default DeleteCategoryModal;
