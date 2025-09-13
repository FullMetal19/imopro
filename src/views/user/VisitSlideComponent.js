import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../services/payment.api";


export function VisitSlideComponent({ openLocalisationModal,openValidationModal })
{
    const uid = sessionStorage.getItem('uid');

    const payment = PaymentApi();
    
        const fetchData = async () => {
            try {
                const res = await payment.findVisitsByUser(uid);
                console.log(res.data.data)
                return res.data.data; 
            } catch (err) { 
                throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
            }
        }
        const { isLoading, data, error } = useQuery({  queryKey: ["allVisit"], queryFn: fetchData });


    return (
       
        <div className="col-lg-12 border rounded-top-2">
            <div className="row d-flex align-item-center py-3 px-4 border-bottom">
                <span className="text-muted"> Liste de mes rendez-vous </span>
            </div>
            <div className="row px-4 py-5">
            { 
                isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                data?.map(( item , index ) => { return (

                    <div className="col-md-6 mb-4" key={index}>
                        <div className="d-flex flex-column shadow-sm bg-white rounded-3 border">
                            <div className="d-flex p-3 border-bottom"> Rendez-vous de visit </div>
                            <div className="p-3 border-bottom text-muted fs-sm">
                                Vous avez un rendez-vous de visit pour la propriété (<span className="text-dark">{item.Property.type} </span>) situé à <span className="text-dark">{item.Property.address}.</span> le <span className="text-dark">{item.date}</span> à <span className="text-dark">{item.time}</span> 
                            </div>
                            <div className="d-flex justify-content-between px-3 py-3">
                                <button className="btn btn-sm btn-outline-main" onClick={ ()=> openLocalisationModal(item.Property.longitude, item.Property.latitude) } > Localisation </button>
                                {
                                   ( item.Property.isbooked == 1) ? (<span className="text-muted px-2 py-1 border rounded-2 fs-xs"> propriété prise </span>) : (<button className="btn btn-sm btn-outline-main" onClick={ ()=> openValidationModal(item.Property.guaranty, item.Property.id) } > Validation </button>) 
                                }
                                
                            </div>
                        </div>
                    </div>  

                        )
                    }))      
                }
                {
                    error ? ( <div className="d-flex text-muted"> Une erreur est survenue, veuillez verifier votre connexion </div> ) : null
                } 
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex text-muted"> Aucune propriété n'a été réservée ou achetée à votre compte. </div> ) : null
                }                          

            </div>
        </div> 
                
    )
}


