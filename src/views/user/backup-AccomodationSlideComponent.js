import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TextReducer } from "../../components/Component";
import Slider from "react-slick";
import { MessageModal } from "./Modal";
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

                       <div className="col-lg-6 px-2 mb-4" key={index}> 
                            <div className="row d-flex border ps-3 rounded-2 mx-2"> 
                                            <div className="py-4 col-lg-4 col-sm-5">
                                    <div className="slider-container">
                                        <Slider {...settings}> 
                                            { 
                                                item?.Property.media.map( (image , index1) => { return (
                                                    <div className="d-flex" key={index1} > <img src={`${process.env.REACT_APP_PATH}/${image.path}`} alt="Logo"  className="img-fluid" />  </div>
                                                )}) 
                                            }    
                                        </Slider>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-7 d-flex flex-column py-4 border-start px-0"> 
                                    <span className="text-muted mb-2 px-3"> < TextReducer text={ item?.Property.description } maxsize={70} /> </span>
                                    <span className="text-muted mb-2 px-3 border-top border-bottom bg-light"> Adresse : { item?.Property.address } </span>
                                    <div className="d-flex justify-content-between align-items-center px-3"> 
                                        <div className="d-flex align-items-center">
                                            <img src={'../img/icons8-calendrier-96.png'} alt="Logo" width={20} height={20} className="me-1 hide" />
                                            <span className="main-color" > { item?.Property.price } Fcfa </span>
                                        </div>
                                        {
                                           ( item?.Property.title === 'à louer' ) && ( <a className="btn btn-sm btn-outline-main" href={`/mensualites/${item?.Property.id}`} > Mensualité </a> )
                                        }
                                        {
                                           ( item?.Property.title === 'à vendre' ) && ( <span className="text-secondary px-2 py-1 border rounded-2 fs-xs"> Bien acheté </span>) 
                                        }   
                                    </div>
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


