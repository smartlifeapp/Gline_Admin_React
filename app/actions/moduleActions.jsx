// import {
//   TOGGLE_MENU,
//   TOGGLE_FILTER,
// } from 'actionTypes';

export function addModule(module) {
  return (dispatch) => {
    dispatch({ type: 'ADD_MODULE', payload: module });
  };
}

export function deleteModule() {
  return (dispatch) => {
    dispatch({ type: 'DELETE_MODULE' });
  };
}
