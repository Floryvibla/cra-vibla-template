import { authConstants } from "../constants"

const initialState = {
  isLogin: false,
  loading: false,
  error: false,
  user: [],
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case authConstants.LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case authConstants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLogin: true,
        isOpen: false
      }

    case authConstants.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload || "INTERNAL ERROR",
      }
    
    default: 
      return state;
  }
};