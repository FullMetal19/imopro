import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { PaymentApi } from "../../../services/payment.api";


export function Notifications()
{
    const payment = PaymentApi();
    const [month, setMonth] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await payment.findNotifications();
            // console.log(res.data.data);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["AllNotifications"], queryFn: fetchData });

    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
            
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        const filtered = data.filter( (item) => item.createdAt.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };

    

    return (

         <Layout menu={4}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-2"> 
                                    <span className="h5 text-muted mt-2"> Notifications </span>
                                </div>
                            </div>
                            <div className="row pt-3 pb-2 border-bottom">
                                <div className="col-sm-4" > 
                                    <div className="text-secondary mb-2 d-flex align-items-center py-2 px-3 w-100 border"> Filtrer par mois </div>
                                </div>
                                <div className="col-sm-4 mb-2" > 
                                    <input type="month" name="month" value={month} className="py-2 px-3 bg-light border rounded-2 w-100 text-muted" required onChange={ handleInputChange }   />
                                </div>
                            </div>
                        
                            {/* ************************************************************** */}
                            <div className="row scroll p-4">
                            { 
                                isLoading ? (  <div className="d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                                    filteredData?.map(( item , index ) => { return(
                                    <div className="col-md-12 py-0 mb-3" key={index}> 
                                        <div className="row border rounded-3 py-2" >
                                            <div className="col-12 d-flex align-items-center gap-2 px-3 mb-1"> 
                                                <img src={'../../img/icons8-nouveau-message-52.png'} height={30} width={30} alt="Logo" className="rounded-circle border border-3 p-1" /> 
                                                <span className="color-blue fs-xs"> { item.Payment.User.fname + " " + item.Payment.User.lname } </span>
                                            </div>
                                            <div className="col-12 border-top border-bottom py-2 px-3 text-muted mb-2"> { item.content } </div> 
                                            <span className="col-12 text-muted fs-xs px-3"> { item.createdAt } </span>
                                        </div>
                                    </div>   
                                    )
                                }))      
                            }
                            {
                                error && ( <div className="col-md-12"> <span className="d-flex border text-muted px-4 py-3 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) 
                            } 
                            {
                                ( Array.isArray(data) && data.length === 0 ) && ( <div className="col-md-12"> <span className="d-flex border text-muted px-4 py-3 mt-3"> Aucune propriété n'a été réservée ou achetée à votre compte. </span> </div> ) 
                            } 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

              
    )
}


