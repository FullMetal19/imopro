import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import Skeleton from "react-loading-skeleton";
import { Modal, UnvalidationForm } from "./Modal";
import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";



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

                            {  isLoading ? ( <Skeleton height={400} /> ) : (

                                <div className="col-md-12">       
                                    <div className="row d-flex justify-content-center my-4">
                                                             
                                        <div className="col-lg-10 d-flex flex-column">
                            
                                             <div className="row d-flex align-item-center p-4 mb-4 bg-three-clr border-left-main">
                                                <span className="text-secondary lead py-1"> Panel d'administration de propriété </span>
                                             </div>
                            
                                             <div className="row">
                                               {/* -------------------------------------------------------------------------  */}
                                               <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                                 <div className="row"> 
                            
                                                   <div className="col-md-6">
                                                     <div className="d-flex flex-column mb-2">  
                                                         <span className="text-secondary fs-xs mb-1"> Catégorie de propriété  </span>
                                                         <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.type || "" } </span>
                                                            <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div> 
                                                    </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> Type de propriété  </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.subtitle || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Dimension [<span className=" px-2 text-danger"> en metre carré </span>]  </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.surface || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-muted fs-xs mb-1"> Status de propriété </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.title || "" } </span>
                                                            <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> Description [ <span className=" px-2 text-danger"> * </span>  ] </span>
                                                        <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" value={data?.description || ""} rows={8} />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                               {/* -------------------------------------------------------------------------  */}
                                               {
                                                  data?.type?.toLowerCase() === "logement" && (
                            
                                              <div className="col-md-12 mb-4 bg-white p-4 border border-primary rounded-2">
                                                <div className="row"> 
                                                  <div className="col-lg-6">
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1">  Nombre de chambre  </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.bedroom || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Nombre de Salon </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.livingroom || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Nombre de toilette </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.restroom || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Nombre de cuisine </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.kitchen || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                     <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Nombre de niveau </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                          <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.floor || "" } </span>
                                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              )
                                              }  
                                              {/* -------------------------------------------------------------------------  */}
                                              <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                                   <div className="row"> 
                                                  <div className="col-lg-6">
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                          <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.price || "" } </span>
                                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                    <div className="d-flex flex-column">  
                                                        <span className="text-secondary fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                           <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.guaranty || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                               {/* -------------------------------------------------------------------------  */}
                                              <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                                <div className="row d-flex justify-content-center"> 
                                                  <div className="col-md-11">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-3"> Images des propriétés  </span>
                                                        <div className="d-flex gap-1 mb-2 border rounded-3 p-3" >
                                                          {
                                                            isLoading ? (
                                                              <Skeleton height={300} />
                                                            ) : (
                                                              <div className="row">
                                                                
                                                                  {data?.media && data.media.length > 0 ? (
                                                                    data.media.map((item, index) => (
                                                                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mb-4" key={index}>
                                                                           <img src={item.path} alt={`image-${index + 1}`}  height={200} className="img-fluid rounded-3 border" />
                                                                        </div>
                                                                     ))
                                                                  ) : (
                                                                   <div className="col-lg-12 text-center text-muted py-4">
                                                                      Aucune image disponible
                                                                    </div>
                                                                  )}
                                                                
                                                              </div>
                                                            )
                                                          }
                                                        </div> 
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {/* -------------------------------------------------------------------------  */}
                                              <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                                <div className="row"> 
                                                  <div className="col-lg-6">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> Pays </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.country || "" } </span>
                                                            <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6"> 
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> Région </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                            <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.region || "" } </span>
                                                            <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                        </div>
                                                    </div>
                                                  </div>
                                                   <div className="col-lg-9">
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> Adresse </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                           <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.address || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                        </div>
                                                    </div>
                                                  </div> 
                                                  <div className="col-lg-6" >
                                                    <div className="d-flex flex-column mb-2">  
                                                       <span className="text-secondary fs-xs mb-1"> La longitude </span>
                                                       <div className="d-flex gap-1 mb-2" >
                                                           <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.longitude || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                       </div>
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6" >
                                                    <div className="d-flex flex-column mb-2">  
                                                        <span className="text-secondary fs-xs mb-1"> La latitude </span>
                                                        <div className="d-flex gap-1 mb-2" >
                                                           <span className="d-flex w-100 border py-2 px-3 rounded-2 text-secondary"> { data?.latitude || "" } </span>
                                                           <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                        </div>
                                                    </div>
                                                  </div>
                                                   </div>
                                              </div>
                                              {/* -------------------------------------------------------------------------  */}
                                              <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                                    <div className="row d-flex justify-content-between align-items-center">  
                                                        <div className="col-md-12 d-flex gap-4 mt-3">
                                                        {
                                                            ( data?.isvalidated === false ) ? (
                                                                <div className="d-flex justify-content-end gap-4"> 
                                                                    <button className="btn btn-sm btn-outline-main" onClick={ setModal1 } > Invalider </button>  
                                                                    <button className="btn btn-sm btn-main" onClick={ setModal } > Valider </button> 
                                                                </div>
                                                            ) : (
                                                               <div className="alert alert-primary border py-3 px-4 rounded-1 w-100"> Votre entreprise est maintenant statuée </div>  
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                              </div>
                            
                                              {/* -------------------------------------------------------------------------  */}
                                
                                            </div>
                                        </div>
                            
                                     </div>
                            
                               </div>
                            )}
                                                                          
                        </div>
                    </div> 
                </div>                    
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
    </div>

    )
}


