import React from 'react';
import { connect } from 'react-redux';
import { toggleModal, deleteEmployee } from './actions';
import Button from '../../atoms/Button';

const ModalConfirmDelete = ({ employee, toggleModal, deleteEmployee }) => {
  const handleDelete = () => {
    deleteEmployee(employee.id);
    toggleModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <p>Are you sure you want to delete {employee.fullName}?</p>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={toggleModal}>Cancel</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employee: state.currentEmployee,
});

export default connect(mapStateToProps, { toggleModal, deleteEmployee })(ModalConfirmDelete);
