// import React from "react";
// import Button from "../../atoms/Button";
// import FormSelect from "../../molecules/FormSelect";
// import FormText from "../../molecules/FormText";
// import cssModuleNameTag from "../../cssModuleNameTag";
// import styles from "./styles.scss";
// import { compose, withStateHandlers } from "recompose";

// const cssModules = new cssModuleNameTag(styles);

// const EmployeeForm = ({
//   employee,
//   onSubmit,
//   onClickCancel,
//   isUpdateEmployee,
//   handleChange,
// }) => {
//   return (
//     <div className={cssModules`form-content`}>
//       <FormText
//         title={"Name"}
//         placeholder="Enter Name"
//         name={"fullName"}
//         value={employee.fullName || ""}
//         onChange={handleChange}
//       ></FormText>

//       <FormSelect
//         title={"Department"}
//         employee={employee}
//         onChange={handleChange}
//         value={employee.deptId || ""}
//         name={"deptId"}
//       ></FormSelect>

//       <FormText
//         title={"Phone"}
//         placeholder="Enter Phone"
//         value={employee.phone || ""}
//         onChange={handleChange}
//         name={"phone"}
//       ></FormText>

//       <div className={cssModules`button-container`}>
//         <Button
//           type={"button"}
//           data-size="large"
//           data-button="cancel"
//           style={{ marginRight: "5px" }}
//           action={onClickCancel}
//         >
//           Cancel
//         </Button>
//         <Button
//           type={"submit"}
//           data-size="large"
//           data-button="info"
//           onClick={() => onSubmit(employee.id, employee, isUpdateEmployee)}
//         >
//           {isUpdateEmployee ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default compose(
//   withStateHandlers(
//     (props) => ({
//       isUpdateEmployee: props.employee.id !== 0,
//     }),
//     {
//       handleChange: (state, props) => (event) => ({
//         employee: {
//           ...props.employee,
//           [event.target.name]: event.target.value,
//         },
//       }),
//     }
//   )
// )(EmployeeForm);
import React from 'react';
import { connect } from 'react-redux';
import { addEmployee, updateEmployee, clearCurrentEmployee, toggleForm } from './actions';
import FormText from './FormText';
import FormSelect from './FormSelect';
import { compose, withHandlers, withStateHandlers } from 'recompose';
const calculateTotalEmployees = (employeeList) => {
  let total = 0;
  const departmentsCount = {
    total: 0,
    administration: 0,
    customerService: 0,
    humanResource: 0,
  };

  employeeList.forEach((employee) => {
    total++;
    departmentsCount.total++;
    switch (employee.deptId) {
      case '1':
        departmentsCount.administration++;
        break;
      case '2':
        departmentsCount.customerService++;
        break;
      case '3':
        departmentsCount.humanResource++;
        break;
      default:
        break;
    }
  });

  return departmentsCount;
};
const FormEmployee = ({
  currentEmployee,
  formData,
  setFormData,
  addEmployee,
  updateEmployee,
  clearCurrentEmployee,
  toggleForm,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <FormText
      title="Full Name"
      name="fullName"
      value={formData.fullName || (currentEmployee ? currentEmployee.fullName : '')}
      onChange={(e) => setFormData({ fullName: e.target.value })}
    />
    <FormText
      title="Phone"
      name="phone"
      value={formData.phone || (currentEmployee ? currentEmployee.phone : '')}
      onChange={(e) => setFormData({ phone: e.target.value })}
    />
    <FormSelect
      title="Department"
      deptId={formData.deptId || (currentEmployee ? currentEmployee.deptId : '')}
      onChange={(e) => setFormData({ deptId: e.target.value })}
    />
    <button type="submit">Submit</button>
  </form>
);

const enhance = compose(
  connect(
    (state) => ({
      currentEmployee: state.currentEmployee,
    }),
    { addEmployee, updateEmployee, clearCurrentEmployee, toggleForm }
  ),
  withStateHandlers(
    { formData: {} },
    {
      setFormData: (state) => (newData) => ({
        formData: { ...state.formData, ...newData },
      }),
    }
  ),
  withHandlers({
    handleSubmit: ({ currentEmployee, formData, addEmployee, updateEmployee, clearCurrentEmployee, toggleForm }) => (e) => {
      e.preventDefault();
      const employeeData = {
        id: currentEmployee ? currentEmployee.id : new Date().getTime(),
        ...formData,
        deptId: formData.deptId || '', // Ensure deptId is set
      };

      if (currentEmployee) {
        updateEmployee(employeeData);
      } else {
        addEmployee(employeeData);
      }
      const updatedTotal = calculateTotalEmployees(); // Hàm này cần lấy danh sách nhân viên hiện tại
      setTotalEmployees(updatedTotal);
      clearCurrentEmployee();
      toggleForm();
    },
  })
);

export default enhance(FormEmployee);
// const mapDispatchToProps = {
//   setTotalEmployees,
// };

// export default compose(
//   connect(null, mapDispatchToProps),
// )(FormEmployee);
