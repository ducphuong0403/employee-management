import React from "react";
import ContentHeader from "../../components/organisms/ContentHeader";
import MainContents from "../../components/organisms/MainContents";
import styles from "./styles.scss";
import cssModuleNameTag from "../../components/cssModuleNameTag";
import { compose, withHandlers, withStateHandlers } from "recompose";
import TableEmployee from "../../components/organisms/TableEmployee";
import EmployeeList from "./EmployeeTableRecords";
import EmployeeForm from "../../components/organisms/EmployeeForm";
import EMPLOYEES from "./EmployeeData";
import ModalConfirmDelete from "./EmployeeModal";
import { DEPARTMENTS } from "../../../data/departments";

const cssModules = new cssModuleNameTag(styles);

const Department = (id) => {
  return DEPARTMENTS.find((department) => department.departmentId === id)
    .departmentName;
};

const EmployeeManagementClient = ({
  isHiddenFormEmployee,
  isHiddenPopupConfirmDelete,
  isDisabled,
  handleActionPopup,
  handleEditEmployee,
  handleFetchEmployees,
  handleSearchEmployee,
  handleActionForm,
  handleSubmitForm,
  handleCancelForm,
  handleDelete,
  employeesData,
  employee,
  valueSearch,
  displayTotalRecord,
}) => {
  return (
    <div className={cssModules`root-client-content`}>
      <ContentHeader
        onClickAdd={handleActionForm}
        isDisabled={isDisabled}
        listEmployeeData={employeesData}
        handleSearchEmployee={handleSearchEmployee}
        valueSearch={valueSearch}
      ></ContentHeader>
      <MainContents isHiddenPopupConfirmDelete={isHiddenPopupConfirmDelete}>
        <TableEmployee
          isHiddenFormEmployee={isHiddenFormEmployee}
          displayTotalRecord={displayTotalRecord}
        >
          <EmployeeList
            listEmployeeData={employeesData}
            handleFetchEmployees={handleFetchEmployees}
            employee={employee}
            onEditEmployee={handleEditEmployee}
            onOpenPopupConfirmDelete={handleActionPopup}
          ></EmployeeList>
        </TableEmployee>
        {!isHiddenFormEmployee && (
          <EmployeeForm
            isHiddenFormEmployee={isHiddenFormEmployee}
            onClickCancel={handleCancelForm}
            listEmployeeData={employeesData}
            onDisplayData={handleFetchEmployees}
            employee={employee}
            onSubmit={handleSubmitForm}
          ></EmployeeForm>
        )}
      </MainContents>
      {!isHiddenPopupConfirmDelete && (
        <ModalConfirmDelete
          onClosePopup={handleActionPopup}
          isDisabled={isDisabled}
          employee={employee}
          onDelete={handleDelete}
        ></ModalConfirmDelete>
      )}
    </div>
  );
};

export default compose(
  withStateHandlers(
    {
      isHiddenFormEmployee: true,
      isHiddenPopupConfirmDelete: true,
      isDisabled: false,
      employeesData: EMPLOYEES,
      employee: {
        id: 0,
        fullName: "",
        deptId: 0,
        phone: "",
      },
      displayTotalRecord: {
        administrator: 0,
        customerResource: 0,
        humanResource: 0,
        totalEmployee: 0,
      },
      valueSearch: "",
    },
    {
      handleActionForm:
        ({ state, isDisabled }) =>
        () => ({
          isHiddenFormEmployee: false,
          isDisabled: !isDisabled,
          employee: {
            id: 0,
            fullName: "",
            deptId: 0,
            phone: "",
          },
        }),

      handleEditEmployee: (state) => (employee) => ({
        isHiddenFormEmployee: false,
        isDisabled: false,
        employee: { ...employee },
      }),

      handleSubmitForm: (state) => (id, employee, isUpdateEmployee) => {
        if (isUpdateEmployee) {
          const updatedEmployees = state.employeesData.map((emp) =>
            emp.id === employee.id
              ? { ...emp, ...employee }
              : emp
          );
          return {
            ...state,
            employeesData: updatedEmployees,
            isHiddenFormEmployee: true,
            employee: { id: 0, fullName: "", deptId: 0, phone: "" },
          };
        } else {
          const newEmployee = {
            id: state.employeesData.length + 1,
            ...employee,
          };
          return {
            ...state,
            employeesData: [...state.employeesData, newEmployee],
            isHiddenFormEmployee: true,
            employee: { id: 0, fullName: "", deptId: 0, phone: "" },
          };
        }
      },

      handleCancelForm: () => () => ({
        isHiddenFormEmployee: true,
        employee: { id: 0, fullName: "", deptId: 0, phone: "" },
      }),
    }
  )
)(EmployeeManagementClient);
