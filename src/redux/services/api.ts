import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import BASE_URL from './baseUrl';

interface loginRequest{
  username:string;
  password:string;
}

const fetcher = axios.create({
  baseURL: BASE_URL.LOCAL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AsyncStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*'
  }
});

export const loginService = (model:loginRequest) => {
  console.log("I'm here in api", model);
  return fetcher.post(BASE_URL.ENDPOINT.V1.Login, {
    model
  }).then(res => {
    AsyncStorage.setItem("token",res.data.data.token);
    fetcher.defaults.headers.common['Authorization'] = res.data.data.token;
    return res.data.data;
  });
};

interface registerRequest{
  mobile:string;
  password:string;
}

export function registerService(model:registerRequest) {
  return new Promise((resolve, reject) => {
    let userToken = `${model.mobile}${model.password}`;
    AsyncStorage.setItem("userToken", userToken)
      .then(() => {
        resolve(userToken);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
