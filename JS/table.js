import React from 'react';
import { connect } from 'react-redux';
import { deleteEmployee, setCurrentEmployee, toggleModal } from './actions';
import EmployeeTableHeader from './EmployeeTableHeader';
import EmployeeTableRecord from './EmployeeTableRecord';
import ContentFooter from '../ContentFooter';

const EmployeeTable = ({ employees, deleteEmployee, setCurrentEmployee, toggleModal }) => {
  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
  };

  return (
    <div className="table-content">
      <table>
        <EmployeeTableHeader />
        <tbody>
          {employees.map((employee) => (
            <EmployeeTableRecord key={employee.id} employee={employee} onEdit={handleEdit} onDelete={() => deleteEmployee(employee.id)} />
          ))}
        </tbody>
      </table>
      <ContentFooter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
});

export default connect(mapStateToProps, { deleteEmployee, setCurrentEmployee, toggleModal })(EmployeeTable);
