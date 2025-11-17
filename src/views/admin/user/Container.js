import React, { useState } from "react";
import { PaymentApi } from "../../../services/payment.api";
import { useQuery } from "@tanstack/react-query";

export function BalanceContainer ()
{        
     const payment = PaymentApi();

    const [view, setView] = useState(false);

    const fetchData = async () => {
        try {
            const res = await payment.findTotalBalance();
            return res.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({  queryKey: ["balances"], queryFn: fetchData });

    return(
        <div className="d-flex flex-column px-4 border-bottom border-end" > 
            <div className="color-gray mb-3 d-flex align-items-center p-3 border-bottom border-start border-end"> Montant solde </div>
            <div className="d-flex flex-column gap-2 mb-4"> 
                <div className="text-center border text-muted py-4 bg-three-clr rounded-1 mb-2"> { view ?  `${ data?.totalAmount }` : '*************' } Fcfa </div>
                <div className="d-flex justify-content-end"> 
                    <button className="btn btn-sm btn-outline-main rounded-4 px-3" onClick={ () => setView(!view) }> { view ? 'Cacher solde' : 'Voir solde' } </button> 
                </div>
            </div>       
        </div>
    )

}
