import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { PaymentApi } from "../../../services/payment.api";
import { useParams } from "react-router";



export function Withdraws()
{
    const payment = PaymentApi();
    const { companyId } = useParams();
    
    const [month, setMonth] = useState();
    const [filteredData, setFilteredData] = useState([]);
        
    const fetchData = async () => {
        try {
            const res = await payment.findWithdrawsByCompany(companyId);
            console.log(res.data.data);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["Withdraws"], queryFn: fetchData });
    
    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        const filtered = data.filter( (item) => item.createdAt.toLowerCase().includes(value.toLowerCase()) );
        setFilteredData(filtered);
    };

    return (

         <Layout menu={3}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="row d-flex justify-content-between gap-4 align-items-center mb-4"> 
                                    <div className="col-md-2" > <span className="h5 text-muted mt-2"> historique retraits </span> </div>
                                    <div className="col-md-5 d-flex gap-2" > 
                                        <span className="form-control bg-three-clr"> Filtre </span>
                                         <input type="month" name="month" value={month} className="form-control" required onChange={ handleInputChange } />
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-4 row scroll">
                                <div className="table-responsive mb-4">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <td className="color-blue" > Date </td>
                                                <td className="color-blue" > Destinataire </td>
                                                <td className="color-blue" > Montant </td>
                                                <td className="color-blue" > Opérateur </td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            { 
                                                 isLoading ? ( <div className="col-md-12 p-2 mt-3 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div> ) : (
                                                     filteredData?.map(( item , index ) => { return (
                                                     <tr key={index}>                        
                                                         <td className="text-muted"> { item?.createdAt } </td>
                                                         <td className="text-muted"> { item?.recipient } </td>
                                                         <td className="text-muted"> { item?.amount }  </td>
                                                         <td className="text-muted"> { item?.operator } </td>
                                                     </tr>     
                                                     )
                                                 }))      
                                            }  
                                            {
                                                error ? ( <tr className="d-flex text-muted p-2 border mt-3"> Une erreur est survenue, veuillez verifier votre connexion puis réessayer </tr> ) : null
                                            } 
                                            {
                                                ( Array.isArray(data) && data.length === 0 ) ? ( <tr className="d-flex text-muted p-2 border mt-3"> Pas de correspondance à ce filtre. </tr> ) : null
                                            }     
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

              
    )
}


