import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../services/payment.api";


export function AccomodationSlideComponent()
{
    const payment = PaymentApi();
        
    const fetchData = async () => {
        try {
            const res = await payment.findBookingsByUser();
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allPayments"], queryFn: fetchData });
    

    return (
       
        <div className="col-lg-12 border rounded-top-2"> 
            <div className="row d-flex align-item-center py-3 px-4 border-bottom">
                <span className="text-secondary lead"> Liste des propriétés réservées ou achetées </span>
            </div>
            <div className="row px-4 py-5">
                { 
                    isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <div className="spinner-border text-blue-clr fs-1" role="status" aria-label="Chargement"></div> </div>  ) : (
                    data?.map(( item , index ) => { return (

                      <div className="col-md-6 mb-4" key={index}>
                        <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
                           {/* Image principale */}
                           <img src={ item?.Property?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
                           {/* Galerie */}
                           <div className="d-flex gap-3 p-3">
                               {
                                   item?.Property?.media[1] ? ( <img src={ item?.Property?.media[1]?.path } className="rounded" alt="image-int-1" style={{ width: "80px", height: "60px", objectFit: "cover" }} /> ) : ( <span className="border rounded bg-light" style={{ width: "80px", height: "60px", objectFit: "cover" }}></span>  )
                               }
                               {
                                   item?.Property?.media[2] ? ( <img src={ item?.Property?.media[2]?.path } className="rounded" alt="image-int-2" style={{ width: "80px", height: "60px", objectFit: "cover" }} /> ) : ( <span className="border rounded bg-light" style={{ width: "80px", height: "60px", objectFit: "cover" }}></span>  )
                               } 
                           </div>
                           {/* Contenu */}
                           <div className="px-3 pb-3 pt-1">
                             <span className="lead bg-gray-light border text-secondary px-3 py-1 rounded-4">
                              { item?.Property?.price +  ' Fcfa ' } { ( item?.Property?.title === "à louer" ) && " / mois" } 
                             </span>
                           </div>
                           <div className="border-top border-bottom py-2 px-3">
                             <h5 className="card-title text-secondary"> { item?.Property?.subtitle + ' ' + item?.Property?.title } </h5>
                             <p className="text-secondary mb-2"> { item?.Property?.address } </p>
                           </div>
                           {/* Boutons */}
                           <div className="d-flex p-3">
                              {
                                  ( item?.Property.title === 'à louer' ) && ( <a className="btn btn-outline-secondary" href={`/mensualites/${item?.Property.id}`} > Mensualité </a> )
                              }
                              {
                                 ( item?.Property.title === 'à vendre' ) && ( <span className="text-secondary px-2 py-1 border rounded-2 fs-xs"> Bien acheté </span>) 
                              }  
                           </div>
                        </div>
                      </div>
                           
                        )
                    }))      
                }
                {
                    error ? ( <div className="d-flex text-secondary"> Une erreur est survenue, veuillez verifier votre connexion </div> ) : null
                } 
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex text-secondary"> Aucune propriété n'a été réservée ou achetée à votre compte. </div> ) : null
                }                          

            </div>
        </div> 
                
               
    )
}


