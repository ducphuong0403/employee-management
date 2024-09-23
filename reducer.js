import {
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    SET_CURRENT_EMPLOYEE,
    CLEAR_CURRENT_EMPLOYEE,
    SEARCH_EMPLOYEE,
    TOGGLE_FORM,
    TOGGLE_MODAL,
    SET_TOTAL_EMPLOYEES
  } from './actions';
  
  const initialState = {
    employees: [],
    currentEmployee: null,
    searchQuery: '',
    isFormOpen: false,
    isModalOpen: false,
    totalEmployees: {
    total: 0,
    administration: 0,
    customerService: 0,
    humanResource: 0,
  },    
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_EMPLOYEE:
        return { ...state, employees: [...state.employees, action.payload] };
      case UPDATE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.map((emp) =>
            emp.id === action.payload.id ? action.payload : emp
          ),
        };
      case DELETE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.filter((emp) => emp.id !== action.payload),
        };
      case SET_CURRENT_EMPLOYEE:
        return { ...state, currentEmployee: action.payload };
      case CLEAR_CURRENT_EMPLOYEE:
        return { ...state, currentEmployee: null };
      case SEARCH_EMPLOYEE:
        return { ...state, searchQuery: action.payload };
      case TOGGLE_FORM:
        return { ...state, isFormOpen: !state.isFormOpen };
      case TOGGLE_MODAL:
        return { ...state, isModalOpen: !state.isModalOpen };
        case SET_TOTAL_EMPLOYEES:
      return {
        ...state,
        totalEmployees: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  