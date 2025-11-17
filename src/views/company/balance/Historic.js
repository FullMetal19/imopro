import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../../services/payment.api";

export function Historic({ companyId, setRefetch })
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
    const { isLoading, data, error, refetch } = useQuery({  queryKey: ["Withdraws"], queryFn: fetchData });

    
    useEffect(() => { 
        if (Array.isArray(data)) { setFilteredData(data) } 
        setRefetch(refetch)
    }, [data, refetch, setRefetch]);
                
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
                    <div className="col-lg-5 col-md-6" > 
                        <div className="text-secondary mb-2 d-flex align-items-center px-3 w-100 form-control"> Historique des retraits </div>
                    </div>
                    <div className="col-lg-3 col-md-6" > 
                        <div className="text-secondary mb-2 d-flex align-items-center px-3 w-100 form-control"> Filtrer </div>
                    </div>
                    <div className="col-lg-4 col-md-12" > 
                        <input type="month" name="month" value={month} className="text-secondary p-2 border rounded-2 mb-2" required onChange={ handleInputChange } />
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
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    <span className="spinner-border text-blue-clr" role="status"></span>
                                </td>
                            </tr>
                        ) : (
                            filteredData?.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-secondary">{item?.createdAt}</td>
                                    <td className="text-secondary">{item?.recipient}</td>
                                    <td className="text-secondary">{item?.amount}</td>
                                    <td className="text-secondary">{item?.operator}</td>
                                </tr>
                            ))
                        )}

                        {error && (
                            <tr>
                                <td colSpan={4} className="text-secondary py-4 text-center">
                                    Une erreur est survenue, veuillez vérifier votre connexion puis réessayer.
                                </td>
                            </tr>
                        )}

                        {Array.isArray(data) && data.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-secondary py-4 text-center">
                                    Pas de correspondance à ce filtre.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>

    )
}