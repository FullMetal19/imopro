import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import { Modal, UnvalidationForm } from "./Modal";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function Configurations()
{
    const product = ProductApi();
    let { propertyId } = useParams();

    const fetchProperty = async (id) => { 
        try {
            const res = await product.findOne(id);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data } = useQuery({  queryKey: ["property", propertyId], queryFn: () => fetchProperty(propertyId),  enabled: !!propertyId });

    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const setModal = () => {
        setModalState(true);
    }
    const closeModal = ( arg ) => {  setModalState( arg ) } 


    //-------------------------------------------------------------------------
    const [ modalState1 , setModalState1 ] = useState(false);
    const setModal1 = () => {
        setModalState1(true);
    }
    const closeModal1 = ( arg ) => {  setModalState1( arg ) } 


    return (
    <div className="">
        {/* ************************************************************************ */}
        { modalState ? ( <Modal propertyId={ propertyId } method={ closeModal } message={"Etes vous sure de valider cette propriété."} /> ) : null }
        {/* ************************************************************************ */}
         { modalState1 ? ( <UnvalidationForm propertyId={ propertyId } method={ closeModal1 }  /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={1}> 
            <div className="container-fluid">
                <div className="row d-flex flex-column bg-white">   
                    <div className="d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                        <div className="d-flex justify-content-between gap-4 align-items-center mb-4"> 
                            <span className="h5 text-muted mt-2 border px-4 py-2"> Administration </span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row p-4 scroll">

                            <div className="col-md-12">
                                <div className="row d-flex justify-content-between my-4">
                                    <div className="col-md-6">
                                        { 
                                            isLoading ? ( <Skeleton height={500} /> ) : (
                                            <div className="slider-container mb-4">
                                                <Slider {...settings}> 
                                                    { 
                                                        data?.media.map( (item , index) => { return (
                                                            <div className="d-flex" key={index} > <img src={`${process.env.REACT_APP_PATH}/${item.path}`} alt="Logo" height={400} className="img-fluid" />  </div>
                                                        )}) 
                                                    }    
                                                </Slider>
                                            </div>  ) 
                                        }   
                                    </div>
                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 px-4 d-flex flex-column">
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> Le pays </span>
                                            <span className="form-control text-muted"> { data?.country } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La région </span>
                                            <span className="form-control text-muted"> { data?.region } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> L'adresse </span>
                                            <span className="form-control text-muted"> { data?.address } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> Description </span>
                                            <textarea className="border p-3 text-muted" value={ data?.description } name="description" rows={8}  />
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La longitude </span>
                                            <span className="form-control text-muted"> { data?.longitude } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La latitude </span>
                                            <span className="form-control text-muted"> { data?.latitude } </span>
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> La dimension en M2 </span>
                                                    <span className="form-control text-muted"> { data?.surface  } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                    <span className="form-control text-muted"> { data?.price } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
                                                    <span className="form-control text-muted"> { data?.guaranty } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
                                                    <span className="form-control text-muted"> { data?.bedroom } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
                                                    <span className="form-control text-muted"> { data?.livingroom } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
                                                    <span className="form-control text-muted"> { data?.restroom } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
                                                    <span className="form-control text-muted"> { data?.kitchen } </span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
                                                    <span className="form-control text-muted"> { data?.floor } </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 px-4 mb-2" > 
                                        <div className="row d-flex justify-content-between align-items-center">  
                                            <div className="col-md-12 d-flex justify-content-end gap-4 mt-3">
                                            {
                                                ( data?.isvalidated == 0 ) ? (
                                                    <div className="d-flex justify-content-end gap-4"> 
                                                        <button className="btn btn-sm btn-outline-main" onClick={ setModal1 } > Invalider </button>  
                                                        <button className="btn btn-sm btn-main" onClick={ setModal } > Valider </button> 
                                                    </div>
                                                ) : (
                                                   <div className="alert alert-primary border py-3 px-4 rounded-1"> Votre entreprise est maintenant statuée </div>  
                                                )
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                    
                        </div>
                    </div> 
                </div>                    
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
    </div>

    )
}


