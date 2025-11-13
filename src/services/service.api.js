import { apiClient, apiClientAuth } from '"../config/httpClient";


export function ServiceApi(contentType = "application/json")
{
    const https = apiClientAuth(contentType);

    return {

        findAll: () => https.get(`/api/service`),

        findOne: (id) => https.get(`/api/service/${id}`),

        find: (value) => https.get(`/api/service/limit/${value}`),

        insert : (data) => https.post(`/api/service`, data), 

        update : (id, data) => https.put(`/api/service/${id}`, data), 

        setStatus : (id) => https.put(`/api/service/updtate-status/${id}`), 

        view : (id) => https.put(`/api/service/read/${id}`), 

        remove : (id) => https.delete(`/api/service/${id}`),

      };
}

