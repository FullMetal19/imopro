import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../../services/payment.api";

export function Historic({ companyId })
{      
    const payment = PaymentApi();

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


    return(

        <div className="w-100 scroll border-bottom px-3"> 
            <div className="p-3 border-bottom border-start border-end mb-3 text-muted"> 
                <div className="row">
                    <div className="col-md-6" > 
                        <div className="text-secondary mb-2 d-flex align-items-center px-3 w-100 form-control"> Historique des retraits </div>
                    </div>
                    <div className="col-md-3" > 
                        <div className="text-secondary mb-2 d-flex align-items-center px-3 w-100 form-control"> Filtrer </div>
                    </div>
                    <div className="col-md-3" > 
                        <input type="month" name="month" value={month} className="form-control mb-2" required onChange={ handleInputChange } />
                    </div>
                </div>
            </div>
            <div className="table-responsive mb-4">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td className="color-blue" > Date </td>
                            <td className="color-blue" > Destinataire </td>
                            <td className="color-blue" > Montant (Fcfa) </td>
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
                        error && ( <tr className="d-flex text-muted p-2 border mt-3"> Une erreur est survenue, veuillez verifier votre connexion puis réessayer </tr> ) 
                    } 
                    {
                        ( Array.isArray(data) && data.length === 0 ) && ( <tr className="d-flex text-muted p-2 border mt-3"> Pas de correspondance à ce filtre. </tr> ) 
                    }     
                    </tbody>
                </table>
            </div>
        </div>

    )
}