import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentApi } from "../../services/payment.api";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function AccomodationSlideComponent({  })
{
    const uid = sessionStorage.getItem('uid');
    const payment = PaymentApi();
        
    const fetchData = async () => {
        try {
            const res = await payment.findBookingsByUser(uid);
            console.log(res.data.data)
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
                    isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                    data?.map(( item , index ) => { return (

                        <div className="d-flex flex-column bg-white my-4 shadow-sm border rounded-2" key={index}>
                           {/* Image principale */}
                           <img src={ item?.Property?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
                           {/* Galerie */}
                           <div className="d-flex gap-3 p-3">
                             <img src={ item?.Property?.media[1]?.path } className="rounded" alt="Intérieur 1" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
                             <img src={ item?.Property?.media[2]?.path } className="rounded" alt="Intérieur 2" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
                             <img src={ item?.Property?.media[3]?.path } className="rounded" alt="Intérieur 3" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
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


