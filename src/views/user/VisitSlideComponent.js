import React, { useEffect } from "react";
import { useQuery } from '"@tanstack/react-query";
import { PaymentApi } from '"../../services/payment.api";


export function VisitSlideComponent({ openLocalisationModal,openValidationModal, setRefetch })
{

    const payment = PaymentApi();
    
        const fetchData = async () => {
            try {
                const res = await payment.findVisitsByUser();
                // console.log(res.data.data)
                return res.data.data; 
            } catch (err) { 
                throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
            }
        }
        const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allVisit"], queryFn: fetchData });

        useEffect( ()=> setRefetch(refetch) , [refetch] )

    return (
       
        <div className="col-lg-12 border rounded-top-2">
            <div className="row d-flex align-item-center py-3 px-4 border-bottom">
                <span className="text-secondary lead"> Liste de mes rendez-vous </span>
            </div>
            <div className="row px-4 py-5">
            { 
                isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <div className="spinner-border text-blue-clr fs-1" role="status" aria-label="Chargement"></div> </div>  ) : (
                data?.map(( item , index ) => { return (

                    <div className="col-md-6 mb-4" key={index}>
                        <div className="d-flex flex-column shadow-sm bg-white rounded-3 border">
                            <div className="d-flex p-3 border-bottom text-secondary"> <i class="bi bi-calendar me-2"></i> Rendez-vous de visit </div>
                            <div className="p-3 border-bottom text-secondary">
                                Votre rendez-vous de visite pour la propriété située à <span className="text-blue-clr">{item.Property.address}.</span>, est programmé le <span className="text-blue-clr">{item.date}</span> à <span className="text-blue-clr">{item.time}</span> 
                            </div>
                            <div className="d-flex justify-content-between bg-three-clr px-3 py-3">
                                <button className="btn btn-sm btn-outline-secondary" onClick={ ()=> openLocalisationModal(item.Property.longitude, item.Property.latitude) }> <i className="bi bi-geo-alt-fill me-1"></i> Localisation </button>
                                {
                                   ( item.Property.isbooked ==== 1) ? (<span className="text-secondary px-2 py-1 border rounded-2 small"> propriété prise </span>) : (<button className="btn btn-sm btn-outline-secondary" onClick={ ()=> openValidationModal(item.Property.guaranty, item.Property.id) } > Validation <i className="bi bi-arrow-right ms-1"></i>   </button>) 
                                }   
                            </div>
                        </div>
                    </div>  

                )}))      
            }
            {
                error ? ( <div className="d-flex text-secondary"> Une erreur est survenue, veuillez verifier votre connexion </div> ) : null
            } 
            {
                ( Array.isArray(data) && data.length ==== 0 ) ? ( <div className="d-flex text-secondary"> Aucune propriété n'a été réservée ou achetée à votre compte. </div> ) : null
            }                          

            </div>
        </div> 
                
    )
}


