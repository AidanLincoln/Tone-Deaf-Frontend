import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    POST_USER,
  } from "./userTypes";
  export const fetchUserSuccess = (users) => {
    return {
      type: FETCH_USERS_SUCCESS,
      payload: users,
    };
  };
  export const fetchUserFailure = (error) => {
    return {
      type: FETCH_USERS_FAILURE,
      error: error,
    };
  };
  export const fetchUserRequest = () => {
    return {
      type: FETCH_USERS_REQUEST,
    };
  };
  export const postUserSuccess = (newUser) => {
    return {
      type: POST_USER,
      payload: newUser,
    };
  };
  export const fetchUsers = () => {
    return (dispatch) => {
      dispatch(fetchUserRequest());
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            dispatch(fetchUserFailure(data.error));
          } else {
            dispatch(fetchUserSuccess(data));
          }
        });
    };
  };
  export const postUser = (newUser) => {
    return (dispatch) => {
      dispatch(fetchUserRequest());
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((user) => {
          if (user.error) {
            dispatch(fetchUserFailure(user.error));
          } else {
            dispatch(postUserSuccess(user));
          }
        });
    };
  };