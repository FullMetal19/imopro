import { apiClient, apiClientAuth } from "../config/httpClient";


export function TestimonialApi(contentType = "application/json")
{
    const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {

        findAll: () => https.get(`/api/testimonial`),

        findOne: (id) => https.get(`/api/testimonial/${id}`),

        find: (value) => http.get(`/api/testimonial/limit/${value}`),

        insert : (uid) => https.post(`/api/testimonial/${uid}`), 

        update : (id, data) => https.put(`/api/testimonial/${id}`, data), 

        view : (id) => https.put(`/api/testimonial/read/${id}`), 

        remove : (id) => https.delete(`/api/testimonial/${id}`), 

      };
}

