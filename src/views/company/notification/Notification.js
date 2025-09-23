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
            // console.log(res.data.data);
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
                                    <div className="text-secondary mb-2 d-flex align-items-center py-1 px-3 w-100 border"> Filtrer </div>
                                </div>
                                <div className="col-sm-4 mb-2" > 
                                    <input type="month" name="month" value={month} className="py-1 px-3 bg-light border rounded-2 w-100" required onChange={ handleInputChange } />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************************************** */}
                    <div className="row scroll p-4">
                        { 
                            isLoading ? (  <div className="d-flex justify-content-center mt-5"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                                filteredData?.map(( item , index ) => { return (

                                  <div className="col-lg-6 mb-3" key={index}> 
                                    <div className="border rounded-3 py-2" >
                                        <div className="d-flex align-items-center gap-2 px-3 mb-1"> 
                                            <img src={ item.Payment.User.image }  height={30} width={30} alt="Logo" className="rounded-circle border border-secondary border-3 p-1" /> 
                                            <span className="text-secondary fw-bole small"> { item.Payment.User.fname + " " + item.Payment.User.lname } </span>
                                        </div>
                                        <div className="border-top border-bottom py-2 px-3 text-secondary mb-2"> { item.content } </div> 
                                        <span className="text-secondary fs-xs px-3"> { item.createdAt } </span>
                                    </div>
                                  </div>   
                                )
                            }))      
                        }
                        {
                            error ? ( <div className="d-flex text-muted"> Une erreur est survenue, veuillez verifier votre connexion </div> ) : null
                        } 
                        {
                            ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex text-muted"> Aucune propriété n'a été réservée ou achetée à votre compte. </div> ) : null
                        }  


                    </div>
                </div>
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
              
    )
}
