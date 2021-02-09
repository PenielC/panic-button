/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
const BASE_URL = {    
    LOCAL : "https://localhost:44357/api/",
    ENDPOINT: {
        V1: {
           Login: "v1/accounts-service/Account/Login"         
        }
    }
}
export default BASE_URL;