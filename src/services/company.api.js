import { apiClientAuth } from "../config/httpClient";


export function CompanyApi(contentType = "application/json")
{
    const https = apiClientAuth(contentType);

    return {

        findAllByStatus: (status) => https.get(`/api/company/status/${status}`),  

        findAllValidating: () => https.get(`/api/company/validating`),  

        findOne: (id) => https.get(`/api/company/${id}`),

        insert : (data) => https.post(`/api/company`, data), 

        setStatus : (id, status) => https.put(`/api/company/update-status/${id}`, status),

        // validate : (id, uid) => https.put(`/api/company/validate/${id}/${uid}`),
        
        unvalidate : (id, message) => https.put(`/api/company/unvalidate/${id}`, message),

        // setBlock : (id, uid) => https.put(`/api/company/block/${id}/${uid}`),

        update : (id, data) => https.put(`/api/company/update/${id}`, data), 

        // view : (id) => https.put(`/api/company/read/${id}`), 

        // remove : (id) => https.delete(`/api/company/${id}`), 

      };
}

