import { apiClient, apiClientAuth } from "../config/httpClient";


export function UserApi(contentType = "application/json")
{
    const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        findOne: () => https.get(`/api/user/one`),

        findAll: () => https.get(`/api/user`),

        insert : (data) => http.post("/api/user", data),

        auth : (data) => http.post("/api/user/authentication", data), 
        
        activateAccount : (token) => http.put("/api/user/activate-account", token),

        genPasswordToken : (phone) => http.put("/api/user/password-updating", phone), 

        updatePassword : (data) => http.put("/api/user/update-password", data), 

        blockAccount : (id) => https.put(`/api/user/block-account/${id}`), 

        setStatus : (uid) => http.put(`/api/user/update-status/${uid}`), 


        // logout : (data) => https.post("/api/user/logging-out", data), 

      };
}

