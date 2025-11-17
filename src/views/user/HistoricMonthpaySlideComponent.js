import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../services/payment.api";
import { useParams } from "react-router";


export function HistoricMonthpaySlideComponent({ setPaymentForm, setModal })
{
    const payment = PaymentApi();

    const {housingId} = useParams();

    const [month, setMonth] = useState();
    const [filteredData, setFilteredData] = useState([]);
    
    const fetchBookedHousing = async () => {
        try {
            const res = await payment.findByTypeUserAndProperty(housingId, 'MonthPay');
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allHouses"], queryFn: fetchBookedHousing });

    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        const filtered = data.filter( (item) => item.month.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };
    

    return (
        
        <div className="col-lg-12 border rounded-top-2 mb-4"> 
            {/* ************************************************************************ */}
            <div className="row d-flex align-item-center py-3 px-4 border-bottom">
                <div className="col-lg-8 mt-2">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 mb-2" > 
                            <div className="text-secondary border d-flex align-items-center px-3 w-100 py-2 rounded-2"> Liste des propriétés réservées ou achetées </div>
                        </div>
                        <div className="col-lg-4 col-md-5 mb-2" > 
                            <input type="month" name="month" value={month} className="border p-2 text-secondary mb-2 rounded-2" required onChange={ handleInputChange } />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mt-2" > 
                    <div className="d-flex" > 
                        <button className="btn btn-secondary" onClick={ ()=> setPaymentForm( refetch ) }> Nouveau mensualité </button> 
                    </div>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row px-4 py-5">
                <div className="table-responsive">

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="text-blue-clr">Date</th>
                                <th className="text-blue-clr">Opérateur</th>
                                <th className="text-blue-clr">Montant</th>
                                <th className="text-blue-clr">Mensualité</th>
                                <th className="text-blue-clr">Information</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        <span className="spinner-border text-blue-clr fs-1"></span>
                                    </td>
                                </tr>
                            ) : (
                                filteredData?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-secondary">{item?.createdAt}</td>
                                        <td className="text-secondary">{item?.operator}</td>
                                        <td className="text-secondary">{item?.amount} Fcfa</td>
                                        <td className="text-secondary">{item?.month}</td>
                                        <td className="text-secondary">
                                            <button
                                                className="btn btn-sm btn-outline-main"
                                                onClick={() => setModal(item)}
                                            >
                                                Voir-plus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>

                {/* Ces blocs doivent être EN DEHORS de la table */}
                {error && (
                    <div className="p-3 mt-3 d-flex justify-content-center lead text-secondary">
                        Une erreur est survenue, veuillez vérifier votre connexion puis réessayer
                    </div>
                )}

                {Array.isArray(data) && data.length === 0 && (
                    <div className="p-3 mt-3 d-flex justify-content-center lead text-secondary">
                        Liste vide, pas de correspondance à ce filtre.
                    </div>
                )}
            </div>

        </div>                  
    )
}


