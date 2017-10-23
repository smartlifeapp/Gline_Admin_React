import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SAVE_MODAL,
  UPDATE_MODAL,
} from 'actionTypes';

export function setInitialValues(values) {
  return (dispatch) => {
    dispatch({ type: 'SET_INITIAL_VALUES', payload: values });
  };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}

export function openModal(modal) {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL, payload: modal });
  };
}
export function saveModal() {
  return (dispatch) => {
    dispatch({ type: SAVE_MODAL });
  };
}

export function updateModal(payload) {
  return (dispatch) => {
    dispatch({ type: UPDATE_MODAL, payload });
  };
}
