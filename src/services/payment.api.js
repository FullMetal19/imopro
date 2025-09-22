import { apiClientAuth } from "../config/httpClient";


export function PaymentApi(contentType = "application/json")
{
    const https = apiClientAuth(contentType);

    return {

        insert: (data, propertyId) => https.post(`/api/payment/${propertyId}`, data),  

        findByTypeAndUser: (userId, type) => https.get(`/api/payment/${userId}/${type}`),

        findByTypeAndProperty: (propertyId, type) => https.get(`/api/payment/property/${propertyId}/${type}`),

        findByTypeUserAndProperty: (userId, propertyId, type) => https.get(`/api/payment/${userId}/${propertyId}/${type}`),



        findVisitsByUser: () => https.get(`/api/visit`),



        findBookingsByUser: (userId) => https.get(`/api/booking/${userId}`),



        findBalanceByCompany: (companyId) => https.get(`/api/balance/company/${companyId}`),
        findTotalBalance: () => https.get(`/api/balance/total`),



        NewWithdraw: (data, companyId) => https.post(`/api/withdraw/${companyId}`, data),

        findWithdrawsByCompany: (companyId) => https.get(`/api/withdraw/company/${companyId}`),



        
        findNotifications: () => https.get(`/api/notification`),
        
        findNotificationsOfCompany: (companyId) => https.get(`/api/notification/company/${companyId}`),
            

      };
}

