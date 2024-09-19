export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const TOGGLE_FORM = "TOGGLE_FORM";
export const SEARCH_EMPLOYEE = "SEARCH_EMPLOYEE";

// Action creators
export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const editEmployee = (employee) => ({
  type: EDIT_EMPLOYEE,
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const toggleForm = (isUpdateEmployee = false, employee = {}) => ({
  type: TOGGLE_FORM,
  payload: { isUpdateEmployee, employee },
});

export const searchEmployee = (value) => ({
  type: SEARCH_EMPLOYEE,
  payload: value,
});
//actions.js

import {
    ADD_EMPLOYEE,
    EDIT_EMPLOYEE,
    DELETE_EMPLOYEE,
    TOGGLE_FORM,
    SEARCH_EMPLOYEE,
  } from "./actions";
  
  const initialState = {
    employees: [], // Employee list
    formVisible: false, // Form visibility toggle
    isUpdateEmployee: false, // If we're updating or adding
    employeeToEdit: {}, // The employee being edited
    searchValue: "", // Search input value
  };
  
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EMPLOYEE:
        return {
          ...state,
          employees: [action.payload, ...state.employees],
          formVisible: false,
        };
      case EDIT_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.map((emp) =>
            emp.id === action.payload.id ? action.payload : emp
          ),
          formVisible: false,
        };
      case DELETE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.filter((emp) => emp.id !== action.payload),
        };
      case TOGGLE_FORM:
        return {
          ...state,
          formVisible: !state.formVisible,
          isUpdateEmployee: action.payload.isUpdateEmployee,
          employeeToEdit: action.payload.employee,
        };
      case SEARCH_EMPLOYEE:
        const searchValue = action.payload.toLowerCase();
        const filteredEmployees = state.employees.filter(
          (employee) =>
            employee.fullName.toLowerCase().includes(searchValue) ||
            employee.phone.includes(searchValue)
        );
        return {
          ...state,
          employees: filteredEmployees,
          searchValue: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default employeeReducer;
//reducers.js

import { createStore } from "redux";
import employeeReducer from "./reducers";

const store = createStore(
  employeeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
//store.js

import { connect } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { compose, withHandlers, lifecycle } from "recompose";
import {
  addEmployee,
  editEmployee,
  deleteEmployee,
  toggleForm,
  searchEmployee,
} from "../../redux/actions";
import EmployeeForm from "../../components/organisms/EmployeeForm";
import EmployeeList from "./EmployeeTableRecords";
import ModalConfirmDelete from "./EmployeeModal";
import ContentHeader from "../../components/organisms/ContentHeader";
import MainContents from "../../components/organisms/MainContents";
import TableEmployee from "../../components/organisms/TableEmployee";

const EmployeeManagementClient = ({
  employees,
  formVisible,
  isUpdateEmployee,
  employeeToEdit,
  searchValue,
  toggleForm,
  handleAddEmployee,
  handleEditEmployee,
  handleDeleteEmployee,
  handleSearch,
}) => {
  return (
    <div>
      <ToastContainer transition={Zoom} autoClose={3000} />
      <ContentHeader
        onClickAdd={() => toggleForm(false)}
        searchValue={searchValue}
        onSearch={handleSearch}
      />
      <MainContents>
        <TableEmployee totalRecords={employees.length}>
          <EmployeeList
            employees={employees}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={toggleForm}
          />
        </TableEmployee>
        {formVisible && (
          <EmployeeForm
            employee={employeeToEdit}
            isUpdate={isUpdateEmployee}
            onSubmit={isUpdateEmployee ? handleEditEmployee : handleAddEmployee}
          />
        )}
      </MainContents>
      <ModalConfirmDelete />
    </div>
  );
};

export default compose(
  connect(
    (state) => ({
      employees: state.employees,
      formVisible: state.formVisible,
      isUpdateEmployee: state.isUpdateEmployee,
      employeeToEdit: state.employeeToEdit,
      searchValue: state.searchValue,
    }),
    {
      addEmployee,
      editEmployee,
      deleteEmployee,
      toggleForm,
      searchEmployee,
    }
  ),
  withHandlers({
    handleAddEmployee: (props) => (employee) => {
      props.addEmployee(employee);
      toast.success("Employee Added Successfully!");
    },
    handleEditEmployee: (props) => (employee) => {
      props.editEmployee(employee);
      toast.success("Employee Updated Successfully!");
    },
    handleDeleteEmployee: (props) => (id) => {
      props.deleteEmployee(id);
      toast.success("Employee Deleted Successfully!");
    },
    handleSearch: (props) => (value) => {
      props.searchEmployee(value);
    },
  }),
  lifecycle({
    componentDidMount() {
      // Fetch employee data if needed
    },
  })
)(EmployeeManagementClient);
//client

import {
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    FETCH_EMPLOYEES,
    SEARCH_EMPLOYEE,
  } from "./actions";
  
  const initialState = {
    employeesData: [], // Initial employee data
    totalRecords: {
      administrator: 0,
      customerService: 0,
      humanResource: 0,
      totalEmployee: 0,
    },
  };
  
  const Department = (id) => {
    switch (id) {
      case 1:
        return "Administrator";
      case 2:
        return "Customer Service";
      default:
        return "Human Resources";
    }
  };
  
  const calculateTotalRecords = (employeesData) => {
    let administratorCount = 0;
    let customerServiceCount = 0;
    let humanResourceCount = 0;
  
    employeesData.forEach((employee) => {
      switch (employee.deptId) {
        case 1:
          administratorCount++;
          break;
        case 2:
          customerServiceCount++;
          break;
        default:
          humanResourceCount++;
      }
    });
  
    return {
      administrator: administratorCount,
      customerService: customerServiceCount,
      humanResource: humanResourceCount,
      totalEmployee: administratorCount + customerServiceCount + humanResourceCount,
    };
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES:
        return {
          ...state,
          employeesData: action.payload,
          totalRecords: calculateTotalRecords(action.payload),
        };
  
      case ADD_EMPLOYEE:
        const newEmployees = [action.payload, ...state.employeesData];
        return {
          ...state,
          employeesData: newEmployees,
          totalRecords: calculateTotalRecords(newEmployees),
        };
  
      case UPDATE_EMPLOYEE:
        const updatedEmployees = state.employeesData.map((employee) =>
          employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
        );
        return {
          ...state,
          employeesData: updatedEmployees,
          totalRecords: calculateTotalRecords(updatedEmployees),
        };
  
      case DELETE_EMPLOYEE:
        const remainingEmployees = state.employeesData.filter(
          (employee) => employee.id !== action.payload
        );
        return {
          ...state,
          employeesData: remainingEmployees,
          totalRecords: calculateTotalRecords(remainingEmployees),
        };
  
      case SEARCH_EMPLOYEE:
        const filteredEmployees = state.employeesData.filter((employee) =>
          employee.fullName.toLowerCase().includes(action.payload.toLowerCase()) ||
          Department(employee.deptId).toLowerCase().includes(action.payload.toLowerCase()) ||
          employee.phone.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          employeesData: filteredEmployees,
          totalRecords: calculateTotalRecords(filteredEmployees),
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
//client

import {
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    FETCH_EMPLOYEES,
    SEARCH_EMPLOYEE,
  } from "./actions";
  
  const initialState = {
    employeesData: [], // Initial employee data
    totalRecords: {
      administrator: 0,
      customerService: 0,
      humanResource: 0,
      totalEmployee: 0,
    },
  };
  
  const Department = (id) => {
    switch (id) {
      case 1:
        return "Administrator";
      case 2:
        return "Customer Service";
      default:
        return "Human Resources";
    }
  };
  
  const calculateTotalRecords = (employeesData) => {
    let administratorCount = 0;
    let customerServiceCount = 0;
    let humanResourceCount = 0;
  
    employeesData.forEach((employee) => {
      switch (employee.deptId) {
        case 1:
          administratorCount++;
          break;
        case 2:
          customerServiceCount++;
          break;
        default:
          humanResourceCount++;
      }
    });
  
    return {
      administrator: administratorCount,
      customerService: customerServiceCount,
      humanResource: humanResourceCount,
      totalEmployee: administratorCount + customerServiceCount + humanResourceCount,
    };
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES:
        return {
          ...state,
          employeesData: action.payload,
          totalRecords: calculateTotalRecords(action.payload),
        };
  
      case ADD_EMPLOYEE:
        const newEmployees = [action.payload, ...state.employeesData];
        return {
          ...state,
          employeesData: newEmployees,
          totalRecords: calculateTotalRecords(newEmployees),
        };
  
      case UPDATE_EMPLOYEE:
        const updatedEmployees = state.employeesData.map((employee) =>
          employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
        );
        return {
          ...state,
          employeesData: updatedEmployees,
          totalRecords: calculateTotalRecords(updatedEmployees),
        };
  
      case DELETE_EMPLOYEE:
        const remainingEmployees = state.employeesData.filter(
          (employee) => employee.id !== action.payload
        );
        return {
          ...state,
          employeesData: remainingEmployees,
          totalRecords: calculateTotalRecords(remainingEmployees),
        };
  
      case SEARCH_EMPLOYEE:
        const filteredEmployees = state.employeesData.filter((employee) =>
          employee.fullName.toLowerCase().includes(action.payload.toLowerCase()) ||
          Department(employee.deptId).toLowerCase().includes(action.payload.toLowerCase()) ||
          employee.phone.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          employeesData: filteredEmployees,
          totalRecords: calculateTotalRecords(filteredEmployees),
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
//reducer 2

//fetch
export const fetchEmployeesSuccess = (employees) => ({
    type: 'FETCH_EMPLOYEES_SUCCESS',
    payload: employees
  });
  
  export const fetchEmployees = () => {
    return (dispatch) => {
      // Simulate fetching data from an API
      const fetchedEmployees = [
        { id: 1, fullName: "John Doe", deptId: 1, phone: "123456789" },
        { id: 2, fullName: "Jane Smith", deptId: 2, phone: "987654321" },
        // Add more employees
      ];
  
      dispatch(fetchEmployeesSuccess(fetchedEmployees));
    };
  };
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_EMPLOYEES_SUCCESS':
        return {
          ...state,
          employeesData: action.payload,
        };
      // Other cases (ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE)
      default:
        return state;
    }
  };
  //
  
  