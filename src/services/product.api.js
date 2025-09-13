import { apiClient, apiClientAuth } from "../config/httpClient";
import { Property } from "../views/company/property/Property";


export function ProductApi(contentType = "application/json")
{
    const http = apiClient(contentType);
    const https = apiClientAuth(contentType);

    return {


        findAllHouses: () => http.get(`/api/property/filter/${'Logement'}`),

        findAllFields: () => http.get(`/api/property/filter/${'Terrain'}`),

        findLocalities: () => http.get(`/api/property/count-property-by-region`),

        findHouse: (value) => http.get(`/api/property/limited-filter/${'Logement'}/${value}`),

        findField: (value) => http.get(`/api/property/limited-filter/${'Terrain'}/${value}`),

        findNearestHouse: (lon, lat) => http.get(`/api/property/filter-near-by-user-position/${'Logement'}/${lon}/${lat}`),

        findNearestField: (lon, lat) => http.get(`/api/property/filter-near-by-user-position/${'Terrain'}/${lon}/${lat}`),

        findOne: (id) => http.get(`/api/property/${id}`),

        // Admin
        updateStatus: (propertyId, uid, status) => https.put(`/api/property/update-status/${propertyId}/${uid}`, status),

        unvalidate: (propertyId, uid, message) => https.put(`/api/property/unvalidate/${propertyId}/${uid}`, message),

        findAllByStatus: (status) => https.get(`/api/property/find-all-by-status/${status}`),

        insert: (data, companyId) => https.post(`/api/property/${companyId}`, data),   

        update : (id, data) => https.put(`/api/property/${id}`, data), 

        remove : (id) => https.delete(`/api/property/${id}`), 

        //Company
        findAllByStatusAndCompany : (status, companyId) => https.get(`/api/property/find-all-by-status-and-company/${status}/${companyId}`),
  
        findAllBooked : (companyId) => https.get(`/api/property/find-all-booked/${companyId}`),  
   
        getStat : (companyId) => https.get(`/api/property/${companyId}/stats`),  

      };
}

