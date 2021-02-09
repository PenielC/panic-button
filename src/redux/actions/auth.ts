import { Dispatch } from "redux";
import { loginService, registerService} from "../services/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESSFUL = "REGISTER_SUCCESSFUL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";

interface registerModel{
    mobile:string;
    password:string;
}

const registerSuccessful = (data: any[]) => ({
    type: REGISTER_SUCCESSFUL,
    payload: data
  });
  
  const registerFailed = (data: any[]) => ({
    type: REGISTER_FAILED,
    payload: data
  });
  
  export const registerRequest = (loader: boolean) => ({
    type: REGISTER_REQUEST,
    payload: loader
  });  

export function register(model: registerModel) {
  return (dispatch: Dispatch) => {
    dispatch(registerRequest(true));
    registerService(model)
      .then((res: any) => {
        dispatch(registerSuccessful(res));
        dispatch(registerRequest(false));
      })
      .catch(err => {
        dispatch(registerFailed(err));
      });
  };
}

const loginSuccessful = (data: any[]) => ({
  type: LOGIN_SUCCESSFUL,
  payload: data
});

const loginFailed = (data: any[]) => ({
  type: LOGIN_FAILED,
  payload: data
});

export const loginRequest = (loader: boolean) => ({
  type: LOGIN_REQUEST,
  payload: loader
});  

interface loginModel{
  username:string;
  password:string;
}

export function login(model: loginModel) {
  
  return (dispatch: Dispatch) => {
    dispatch(loginRequest(true));
    loginService(model)
      .then((res: any) => {
        dispatch(loginSuccessful(res));
        dispatch(loginRequest(false));
      })
      .catch(err => {
        dispatch(loginFailed(err));
      });
  };
}
