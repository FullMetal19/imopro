import { apiClientAuth } from '"../config/httpClient";


export function MessageApi(contentType = "application/json")
{
    const https = apiClientAuth(contentType);

    return {

        findAll: () => https.get(`/api/message`),

        findOne: (id) => https.get(`/api/message/${id}`),

        insert : (data) => https.post(`/api/message`, data), 

        update : (id, data) => https.put(`/api/message/${id}`, data), 

        view : (id) => https.put(`/api/message/read/${id}`), 

        remove : (id) => https.delete(`/api/message/${id}`), 

      };
}

