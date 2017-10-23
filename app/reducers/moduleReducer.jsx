// import {
//   TOGGLE_MENU,
//   TOGGLE_FILTER,
//   UNAUTH_ADMIN,
//   START_LOADING,
//   STOP_LOADING,
// } from 'actionTypes';
//
import React from 'react';

const Loading = () => (
  <div className="main-container">Loading...</div>
);

export const moduleReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODULE':
      return action.payload;
    case 'DELETE_MODULE':
      return Loading;
    default:
      return state || Loading;
  }
};
