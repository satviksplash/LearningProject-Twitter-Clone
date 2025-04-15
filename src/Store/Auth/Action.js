import Cookies from 'js-cookie';

import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROILE_FAILURE,
  GET_USER_PROILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("Logged in user: ", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.error("Error logging in: ", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const registerUser = (reisterData) => async (dispatch) => {
  try {
    console.log("Register data: ", reisterData);
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      reisterData
    );
    console.log("signup data: ", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.error("Error register : ", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_PROILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error register : ", error);
    dispatch({ type: GET_USER_PROILE_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  // localStorage.removeItem("jwt");

  localStorage.clear();
    
    // Clear all cookies
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  
  dispatch({type : LOGOUT, payload:  null})

};


export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/user/${userId}`);
    
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error register : ", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};


export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/user/update`);
    console.log("updated User " , data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error register : ", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/user/${userId}/follow`);
    console.log("followed User " , data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error register : ", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};


