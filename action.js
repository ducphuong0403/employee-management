export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_CURRENT_EMPLOYEE = 'SET_CURRENT_EMPLOYEE';
export const CLEAR_CURRENT_EMPLOYEE = 'CLEAR_CURRENT_EMPLOYEE';
export const SEARCH_EMPLOYEE = 'SEARCH_EMPLOYEE';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_TOTAL_EMPLOYEES = 'SET_TOTAL_EMPLOYEES';

export const addEmployee = (employee) => ({ type: ADD_EMPLOYEE, payload: employee });
export const updateEmployee = (employee) => ({ type: UPDATE_EMPLOYEE, payload: employee });
export const deleteEmployee = (id) => ({ type: DELETE_EMPLOYEE, payload: id });
export const setCurrentEmployee = (employee) => ({ type: SET_CURRENT_EMPLOYEE, payload: employee });
export const clearCurrentEmployee = () => ({ type: CLEAR_CURRENT_EMPLOYEE });
export const searchEmployee = (query) => ({ type: SEARCH_EMPLOYEE, payload: query });
export const toggleForm = () => ({ type: TOGGLE_FORM });
export const toggleModal = () => ({ type: TOGGLE_MODAL });
export const setTotalEmployees = (totalEmployees) => ({
  type: SET_TOTAL_EMPLOYEES,
  payload: totalEmployees,
});

