import React from "react";
import styles from "./styles.scss";
import cssModuleNameTag from "../../components/cssModuleNameTag";
import Button from "../../components/atoms/Button";

const cssModules = new cssModuleNameTag(styles);

const ModalConfirmDelete = ({ onClosePopup, employee, onDelete }) => {
  const handleDelete = () => {
    onDelete(employee.id, employee); // Xóa nhân viên dựa trên employee được truyền vào
    onClosePopup();
  };

  return (
    <div id="myModal" className={cssModules`modal`}>
      <div className={cssModules`modal-content`}>
        <div className={cssModules`modal-header`}>
          <span
            style={{ color: "#666666", paddingRight: "10px" }}
            id="spanClose"
            class="close"
            dismiss={"modal"}
            onClick={onClosePopup}
          >
            &times;
          </span>
          <span style={{ padding: "10px" }}>Delete Employee</span>
        </div>
        <div className={cssModules`modal-body`}>
          <p
            className={cssModules`modal-body-contents`}
            style={{ fontSize: "1.3rem", color: "#666666" }}
          >
            Are you sure you want to delete {employee.fullName}'s record?
          </p>
          <small
            className={cssModules`modal-body-contents`}
            style={{ color: "orange", fontSize: "1rem" }}
          >
            This action cannot be undone
          </small>
        </div>
        <div className={cssModules`modal-footer`}>
          <div class="modal-footer-content">
            <Button
              data-size="large"
              data-button="cancel"
              style={{ marginRight: "10px", border: "none" }}
              dismiss={"modal"}
              action={onClosePopup}
            >
              Cancel
            </Button>
            <Button
              data-size="large"
              data-button="danger"
              style={{ border: "none" }}
              action={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
