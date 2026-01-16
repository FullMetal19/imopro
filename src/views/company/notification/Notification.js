import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";

import { PaymentApi } from "../../../services/payment.api";
import { useParams } from "react-router";


export function Notification()
{
    const payment = PaymentApi();
    const [month, setMonth] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const { companyId } = useParams();

    const fetchData = async () => {
        try {
            const res = await payment.findNotificationsOfCompany(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["Notifications"], queryFn: fetchData });

    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
            
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        const filtered = data.filter( (item) => item.createdAt.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };


    return (

        <Layout menu={4} companyId={companyId} >

            <div className="contain bg-white">
                <div className="d-flex flex-column w-100">   
                    <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom w-100"> 
                        <div className="d-flex flex-column"> 
                            <span className="h5 text-secondary my-2"> Boite de notification </span>
                            <div className="row pt-3 pb-2 border-top border-start border-end">
                                <div className="col-sm-4" > 
                                    <div className="text-secondary mb-2 d-flex align-items-center pt-1 pb-2 px-3 w-100 border border-secondary"> Filtrer </div>
                                </div>
                                <div className="col-sm-4 mb-2" > 
                                    <input type="month" name="month" value={month} className="bg-transparent text-secondary p-2 border border-primary rounded-2" required onChange={ handleInputChange } />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************************************** */}
                    <div className="row scroll p-4">
                        { 
                            isLoading ? (  <div className="d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                                filteredData?.map(( item , index ) => { return(
                                 <div className="col-lg-6 mb-3 px-3" key={index}> 
                                   <div className="d-flex" >
                                    <div className="row border rounded-3 py-2" >
                                        <div className="col-12 d-flex align-items-center gap-2 px-3 mb-1"> 
                                            <img src={ item.Payment.User.image }  height={30} width={30} alt="Logo" className="rounded-circle border border-secondary border-3 p-1" /> 
                                            <span className="text-secondary fw-bole small"> { item.Payment.User.fname + " " + item.Payment.User.lname } </span>
                                        </div>
                                        <div className="col-12 border-top border-bottom py-2 px-3 text-secondary mb-2"> { item.content } </div> 
                                        <span className="col-12 text-secondary fs-xs px-3"> { item.createdAt } </span>
                                    </div>
                                   </div>
                                  </div>   
                                )
                            }))      
                        }
                        {
                            error ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3" > Une erreur est survenue, veuillez verifier votre connexion </span> </div> ) : null
                        } 
                        {
                            ( Array.isArray(data) && data.length === 0 ) ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3"> Aucune propriété n'a été réservée ou achetée à votre compte. </span> </div> ) : null
                        }  


                    </div>
                </div>
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
              
    )
}
