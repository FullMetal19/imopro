import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";
import { PaymentApi } from "../../../services/payment.api";


export function PaymentsHistoric()
{
    const payment = PaymentApi();
    const { companyId, propertyId } = useParams();

    const [month, setMonth] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await payment.findByTypeAndProperty(propertyId, 'MonthPay');
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allMonthPays"], queryFn: fetchData });

    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
            
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        const filtered = data.filter( (item) => item.month.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };


    return (

        <Layout menu={3} companyId={companyId} >

            <div className="contain bg-white">
                <div className="d-flex flex-column w-100">   
                    <div className="d-flex flex-column bg-three-clr pt-4 px-4 border-bottom w-100"> 
                        <div className="d-flex flex-column"> 
                            <span className="h5 text-muted my-2"> Historique des mensualités </span>
                            <div className="row pt-3 pb-2 border-top border-start border-end">
                                <div className="col-sm-4" > 
                                    <div className="color-gray mb-2 d-flex align-items-center py-1 px-3 w-100 border"> Filtrer </div>
                                </div>
                                <div className="col-sm-4 mb-2" > 
                                    <input type="month" name="month" value={month} className="py-1 px-3 bg-light border rounded-2 w-100" required onChange={ handleInputChange } />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ************************************************************** */}
                    <div className="scroll p-4">
                        <div className="table-responsive mb-4">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <td className="color-blue" > Date </td>
                                        <td className="color-blue" > Emetteur </td>
                                        <td className="color-blue" > Opérateur </td>
                                        <td className="color-blue" > Montant </td>
                                        <td className="color-blue" > Mois </td>
                                    </tr>
                                </thead>
                                <tbody >
                                { 
                                    isLoading ? ( <div className="col-md-12 p-2 mt-3 d-flex justify-content-center"> <img src={'../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div> ) : (
                                        filteredData?.map(( item , index ) => { return (
                                        <tr key={index}>                        
                                            <td className="text-muted"> { item?.createdAt } </td>
                                            <td className="text-muted"> { item?.User.fname + ' ' + item?.User.lname  } </td>
                                            <td className="text-muted"> { item?.operator } </td>
                                            <td className="text-muted"> { item?.amount } </td>
                                            <td className="text-muted"> { item?.month } </td>
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
            {/* ************************************************************************ */} 
        </Layout>    
              
    )
}
