import { useState } from "react";
import { PaymentApi } from "../../../services/payment.api";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../../services/product.api";


export function SoldeContainer()
{
    const payment = PaymentApi();
    
    const [filter, setFilter] = useState(false);
    const [view, setView] = useState(false);
    
    const {companyId} = useParams();
    
    const fetchData = async () => {
        try {
            const res = await payment.findBalanceByCompany(companyId);
            console.log(res.data)
            return res.data.data; 
         } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({  queryKey: ["balances"], queryFn: fetchData });

    return(

        <div className="d-flex flex-column px-4 border-bottom" > 
            <div className="color-gray mb-3 d-flex align-items-center p-3 border-bottom border-start border-end"> Montant solde </div>
            <div className="d-flex flex-column gap-2 mb-4"> 
                <div className="text-center border text-muted py-4 bg-three-clr rounded-1 mb-2"> { view ?  `${ data?.totalAmount }` : '*************' } Fcfa </div>
                <div className="d-flex justify-content-end"> 
                    <button className="btn btn-sm border rounded-4 text-muted px-3" onClick={ () => setView(!view) }> { view ? 'Cacher solde' : 'Voir solde' } </button> 
                </div>
            </div>       
        </div>
    )
}



export function BoardContainer()
{
    const product = ProductApi();
    const {companyId} = useParams();
    
    const fetchData = async () => {
        try {
            const res = await product.getStat(companyId);
            console.log(res.data)
            return res.data.data; 
         } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({  queryKey: ["stats"], queryFn: fetchData });

    return(

        <div className="row px-4">
            <div className="col-md-12 border-bottom border-start border-end p-3 mb-3"> 
                <span className="color-gray"> Statistique </span>
            </div>
            {/* ------------------------------------------------- */}
            <div className="col-sm-6 mb-3">
                <div className="d-flex flex-column border rounded-2" >
                    <div className="d-flex justify-content-center align-items-center p-4 "> 
                        <span className="text-muted h2"> { data?.valid } </span>
                    </div>
                    <div className="d-flex justify-content-center py-2 text-muted border-top"> Propriété(s) valide(s) </div> 
                </div>
            </div>
            {/* ------------------------------------------------- */}
            <div className="col-sm-6 mb-3">
                <div className="d-flex flex-column border rounded-2" >
                    <div className="d-flex justify-content-center align-items-center p-4 "> 
                        <span className="text-muted h2"> { data?.unvalid } </span>
                    </div>
                    <div className="d-flex justify-content-center py-2 text-muted border-top"> Propriété(s) invalide(s) </div> 
                </div>
            </div>
            {/* ------------------------------------------------- */}
            <div className="col-sm-6 mb-3">
                <div className="d-flex flex-column border rounded-2" >
                    <div className="d-flex justify-content-center align-items-center p-4 "> 
                        <span className="text-muted h2"> { data?.pending } </span>
                    </div>
                    <div className="d-flex justify-content-center py-2 text-muted border-top"> Propriété(s) en cours </div> 
                </div>
            </div>
            {/* ------------------------------------------------- */}
            <div className="col-sm-6 mb-3">
                <div className="d-flex flex-column border rounded-2" >
                    <div className="d-flex justify-content-center align-items-center p-4 "> 
                        <span className="text-muted h2"> { data?.booked } </span>
                    </div>
                    <div className="d-flex justify-content-center py-2 text-muted border-top"> Propriété(s) active(s) </div> 
                </div>
            </div>
                                        
        </div>
    )
}