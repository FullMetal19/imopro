import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
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
                    <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom w-100"> 
                        <div className="d-flex flex-column"> 
                            <span className="h5 text-secondary my-2"> Historique des mensualités </span>
                            <div className="row pt-3 pb-2 border-top border-start border-end">
                                <div className="col-sm-4" > 
                                    <div className="text-secondary mb-2 d-flex align-items-center py-2 px-3 w-100 border border-secondary"> Filtrer </div>
                                </div>
                                <div className="col-sm-4 mb-2" > 
                                    <input type="month" name="month" value={month} className="bg-transparent text-secondary p-2 border border-primary rounded-2" required onChange={ handleInputChange } />
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
                                    <th className="color-blue">Date</th>
                                    <th className="color-blue">Émetteur</th>
                                    <th className="color-blue">Opérateur</th>
                                    <th className="color-blue">Montant</th>
                                    <th className="color-blue">Mois</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {/* === LOADING === */}
                                  {isLoading && (
                                    <tr>
                                      <td colSpan={5} className="text-center py-4">
                                        <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div>
                                      </td>
                                    </tr>
                                  )}

                                  {/* === DATA === */}
                                  {!isLoading &&
                                    filteredData?.map((item, index) => (
                                      <tr key={index}>
                                        <td className="text-muted">{item?.createdAt}</td>
                                        <td className="text-muted">
                                          {item?.User?.fname + " " + item?.User?.lname}
                                        </td>
                                        <td className="text-muted">{item?.operator}</td>
                                        <td className="text-muted">{item?.amount}</td>
                                        <td className="text-muted">{item?.month}</td>
                                      </tr>
                                    ))}

                                  {/* === ERROR === */}
                                  {error && (
                                    <tr>
                                      <td colSpan={5} className="text-center text-muted py-4">
                                        Une erreur est survenue, veuillez vérifier votre connexion puis réessayer.
                                      </td>
                                    </tr>
                                  )}

                                  {/* === EMPTY LIST === */}
                                  {!isLoading && Array.isArray(data) && data.length === 0 && (
                                    <tr>
                                      <td colSpan={5} className="text-center text-muted py-4">
                                        Pas de correspondance à ce filtre.
                                      </td>
                                    </tr>
                                  )}
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
