import React from "react";
import { EmployeeTableRecord } from "../../../components/organisms/TableEmployee";
import cssModuleNameTag from "../../../components/cssModuleNameTag";
import styles from "./styles.scss";
import { DEPARTMENTS } from "../../../../data/departments";

const cssModules = new cssModuleNameTag(styles);

const Department = (id) => {
  return DEPARTMENTS.find((department) => department.departmentId === id)
    .departmentName;
};

const EmployeeList = ({ onOpenPopupConfirmDelete, listEmployeeData, onEditEmployee }) => {
  return (
    <>
      {listEmployeeData.map((employee) => (
        <EmployeeTableRecord key={employee.id}>
          <p>{employee.fullName}</p>
          <p>{Department(employee.deptId)}</p>
          <p>{employee.phone}</p>
          <div className={cssModules`container-icon`}>
            <button
              className={cssModules`edit`}
              onClick={() => onEditEmployee(employee)}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button
              className={cssModules`remove`}
              onClick={onOpenPopupConfirmDelete}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </EmployeeTableRecord>
      ))}
    </>
  );
};

export default EmployeeList;
