import React, { useState } from "react";
import { useQuery } from '"@tanstack/react-query";
import { Layout } from '"../Layout";
import { WithdrawForm } from '"./Form";
import { Historic } from '"./Historic";
import { PaymentApi } from '"../../../services/payment.api";
import { useParams } from '"react-router";


export function Balance()
{
    const payment = PaymentApi();

    const [refetch, setRefetch] = useState();

    const [filter, setFilter] = useState(false);
    const [view, setView] = useState(false);

    const {companyId} = useParams();

    const fetchData = async () => {
        try {
            const res = await payment.findBalanceByCompany(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({  queryKey: ["balances"], queryFn: fetchData });
    

    return (

        <Layout menu={2} companyId={companyId}>

            <div className="contain bg-white">
                {
                    filter ? ( <WithdrawForm refetch={refetch} /> ) : null
                }
                <div className="d-flex flex-column w-100">   
                    <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom"> 
                        <div className="d-flex gap-4 align-items-center mb-4"> 
                            <span className="h5 text-secondary mt-2"> Mon solde </span>
                            <button className="btn btn-sm btn-outline-main rounded-4 px-4" onClick={ () => setFilter(!filter) }> Faire un retrait </button> 
                        </div>
                    </div>
                    <div className="contain">
                        {/* ************************************************************** */}
                        <div className="flex-1 border-bottom border-end">
                            <div className="d-flex flex-column mb-3 px-3" > 
                                <div className="text-secondary lead mb-3 d-flex align-items-center p-3 border-bottom border-start border-end"> Montant solde </div>
                                <div className="d-flex flex-column gap-2 mb-4"> 
                                    <div className="text-center border text-muted py-4 bg-three-clr rounded-1 mb-2"> { view ?  `${ data?.totalAmount }` : '*************' } Fcfa </div>
                                    <div className="d-flex justify-content-end"> 
                                        <button className="btn btn-secondary border rounded-4 px-3" onClick={ () => setView(!view) }> { view ? 'Cacher solde' : 'Voir solde' } </button> 
                                    </div>
                                </div>       
                            </div>  
                        </div>
                        {/* ************************************************************** */}
                        <div className="flex-3">
                            <Historic companyId={companyId} setRefetch={setRefetch} />
                        </div>
                    </div>
                </div>
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
              
    )
}
