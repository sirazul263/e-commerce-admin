import React from "react";
import { Modal, Button } from "react-bootstrap";

const Modals = (props) => {
  return (
    <div>
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {props.buttons ? (
            props.buttons.map((btn, index) => (
              <Button
                key={index}
                variant={btn.color}
                className="btn-sm"
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))
          ) : (
            <Button
              variant="primary"
              {...props}
              className="btn-sm"
              onClick={props.handleClose}
              style={{ backgroundColor: "#333" }}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
