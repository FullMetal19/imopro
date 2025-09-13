import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { Modal, UnvalidationForm } from "./Modal";

import { CompanyApi } from "../../../services/company.api";
import { useParams } from "react-router";


export function ValidateCompany()
{
    const {companyId} = useParams();
    const company = CompanyApi();
            
    const fetchCompany = async () => {
        try {
            const res = await company.findOne(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data, refetch } = useQuery({  queryKey: ["company"], queryFn: fetchCompany });

// ****************************************************************************************************************
    
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
        { modalState ? ( <Modal companyId={ companyId } refetch={refetch}  method={ closeModal } message={"Etes vous sure de valider cette propriété."} /> ) : null }
        {/* ************************************************************************ */}
         { modalState1 ? ( <UnvalidationForm method={ closeModal1 } companyId={ companyId }  /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={3}> 
            <div className="container-fluid">
                <div className="row d-flex flex-column bg-white">   
                    <div className="d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                        <div className="d-flex justify-content-between gap-4 align-items-center mb-4"> 
                            <span className="h5 text-muted mt-2 border px-4 py-2"> Validation entreprise </span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="p-4 scroll">

                            {/* ************************************************************************ */}
                            <div className="row p-4 mb-4 border">
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Nom de l'entreprise </span>
                                        <span className="form-control text-muted"> { data?.name } </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> L'adresse de l'entreprise </span>
                                        <span className="form-control text-muted"> { data?.address } </span>
                                    </div>
                                </div>
                                <div className="col-md-8 mb-3">  
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Description </span>
                                        <textarea className="border form-control p-2" name="description" value={ data?.description } rows={8}  />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">  
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> icon </span>
                                        <div className="d-flex justify-content-center align-items-center border">  
                                            <img src={`${process.env.REACT_APP_PATH}/${data?.icon}`} height={160} width={200} alt="Logo" className="" /> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Lien siteweb </span>
                                        <span className="form-control text-muted"> { data?.website } </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Numéro de registre </span>
                                        <span className="form-control text-muted"> { data?.registNumber }  </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Ninea </span>
                                        <span className="form-control text-muted">  { data?.ninea }  </span>
                                    </div>
                                </div>
                            </div>
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border">
                                <div className="col-md-6 mb-2">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Nom du garant de l'entreprise </span>
                                        <span className="form-control text-muted">  { data?.ownerName }  </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Le numéro de téléphone du garant de l'entreprise </span>
                                        <span className="form-control text-muted">  { data?.phone }  </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Email du garant de l'entreprise </span>
                                        <span className="form-control text-muted">  { data?.email }  </span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Numéro de carte d'identité du garant </span>
                                        <span className="form-control text-muted">  { data?.ownerCni }  </span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Image de face de la carte d'identité </span>
                                        <div className="row">
                                             <div className="col-md-8">
                                                <div className="d-flex justify-content-center align-items-center border">  
                                                    <img src={`${process.env.REACT_APP_PATH}/${ data?.cniImage }`} height={200} width={240} alt="Logo" className="" /> 
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ************************************************************************ */}
                            <div className="row p-4 mb-4 border">
                                {
                                    ( data?.status === 1 || data?.status === -1 ) ? (
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
            {/* ************************************************************************ */} 
        </Layout>    
    </div>

    )
}


