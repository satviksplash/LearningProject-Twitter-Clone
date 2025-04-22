import Cookies from 'js-cookie';

import axios from "axios";
import { api, API_BASE_URL, getApi } from "../../config/api";
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
  SEARCH_USER_FAILURE,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
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
    const errorMessage = error.response?.data?.message || "Registration failed";
    dispatch({ type: REGISTER_USER_FAILURE, payload: {
      message: errorMessage,
      field: 'email' // Since we know this error is for email
    }});
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
    console.error("get user profile error : ", error);
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
    const { data } = await getApi().get(`/api/user/${userId}`);
    
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error finding user by ID: ", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};


export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await getApi().put(`/api/user/update`, reqData);
    console.log("updated User " , data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await getApi().put(`/api/user/${userId}/follow`);
    console.log("followed User " , data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error following user: ", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};


export const searchUser = (query) => async (dispatch) => {
  try {
    const response = await getApi().get(`/api/user/search?query=${query}`);
    const users = response.data;
    console.log("search result -: ", users);
   
    dispatch({type:SEARCH_USER_SUCCESS,payload:users});
  } catch (error) {
    dispatch(
      {type:SEARCH_USER_FAILURE,error:error.message}
    );
  }
};


