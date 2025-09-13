import { apiClientAuth } from "../config/httpClient";


export function CompanyApi(contentType = "application/json")
{
    const https = apiClientAuth(contentType);

    return {

        findAllByStatus: (status) => https.get(`/api/company/status/${status}`),  

        findAllValidating: () => https.get(`/api/company/validating`),  

        findOne: (id) => https.get(`/api/company/${id}`),

        insert : (data, uid) => https.post(`/api/company/${uid}`, data), 

        setStatus : (id, uid, status) => https.put(`/api/company/update-status/${id}/${uid}`, status),

        // validate : (id, uid) => https.put(`/api/company/validate/${id}/${uid}`),
        
        unvalidate : (id, uid, message) => https.put(`/api/company/unvalidate/${id}/${uid}`, message),

        // setBlock : (id, uid) => https.put(`/api/company/block/${id}/${uid}`),

        // update : (id, data) => https.put(`/api/company/${id}`, data), 

        // view : (id) => https.put(`/api/company/read/${id}`), 

        // remove : (id) => https.delete(`/api/company/${id}`), 

      };
}

