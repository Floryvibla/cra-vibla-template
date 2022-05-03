import { authConstants } from "../constants"
import { authService } from "../../services"

export const authActions = {
  loginUser,
}


function loginUser (userData){

    return dispatch => {
      dispatch({ 
      type: authConstants.LOGIN_USER_REQUEST
    })

    authService.loginUser(userData)
    .then(response => {
      if (response.status == 200) {
        dispatch({ 
          type: authConstants.LOGIN_USER_SUCCESS,
          payload: response.data
        })
  
        localStorage.setItem("@vibla/auth", JSON.stringify(response.data))
      } else {
        dispatch({ 
          type: authConstants.LOGIN_USER_FAIL,
          payload: response
        })
      }
    })
    .catch(error => {
      dispatch({ 
        type: authConstants.LOGIN_USER_FAIL,
        payload: "EMAIL_PASS_MISSMATCH"
      })
      console.log(error);
    })
    }
}