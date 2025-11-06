import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { Modal, NewServiceModal, UpdatingServiceModal } from "./Modal";
import { ServiceApi } from "../../../services/service.api";


export function Services()
{
    const service = ServiceApi();

    const fetchServices = async () => {
        try {
            const res = await service.findAll();
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error, refetch } = useQuery({  queryKey: ["newService"], queryFn: fetchServices });
    
    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const [ sid , setSid ] = useState();
    const [ status , setStatus ] = useState();

    const setModal = (serviceId, arg) => {
        setSid(serviceId);
        setStatus(arg);
        setModalState(true);
    }
    const closeModal = ( arg ) => {  setModalState( arg ) } 
        
    //-------------------------------------------------------------------------
    const [ modalState1 , setModalState1 ] = useState(false);
    const setModal1 = () => {
        setModalState1(true);
    }
    const closeModal1 = ( arg ) => {  setModalState1( arg ) } 
        
    //-------------------------------------------------------------------------
    const [ modalState2 , setModalState2 ] = useState(false);
    const [ serviceId , setServiceId ] = useState();
    const [ title , setTitle ] = useState();
    const [ description , setDescription ] = useState();

    const setModal2 = (serviceId, title, desc) => {
        setModalState2(true);
        setServiceId(serviceId);
        setTitle(title);
        setDescription(desc);
    }
    const closeModal2 = ( arg ) => {  setModalState2( arg ) } 


    return (

    <div className="">
        {/* ************************************************************************ */}
        { modalState ? ( <Modal method={ closeModal } refetch={refetch} serviceId={sid} serviceStatus={status}  message={"Etes vous sure de modifier le status de ce service."} /> ) : null }
        {/* ************************************************************************ */}
        { modalState1 ? ( <NewServiceModal method={ closeModal1 }  refetch={refetch} /> ) : null }
        {/* ************************************************************************ */}
        { modalState2 ? ( <UpdatingServiceModal method={ closeModal2 } refetch={refetch} serviceId={serviceId} title={title} desc={description} /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={2}>

            <div className="contain bg-white">
                <div className="d-flex flex-column w-100">   
                    <div className="d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                        <div className="d-flex gap-4 align-items-center mb-4"> 
                            <span className="h5 text-muted mt-2"> Mes services </span>
                            <button className="btn btn-sm btn-outline-main rounded-4 px-4" onClick={ setModal1 } > Nouveau service </button> 
                        </div>
                    </div>
                    <div className="d-flex flex-column p-4 scroll">
                    { 
                        isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                        data?.map(( item , index ) => { return(
                            <div className="d-flex flex-column border rounded-3 py-2 mb-3" key={index} >
                                <div className="d-flex flex-column px-3 mb-1"> 
                                    <span className="text-muted"> { item?.title } </span>
                                    <span className="color-gray fs-xs"> { item?.updatedAt } </span>
                                </div>
                                <div className="border-top border-bottom py-2 px-3 text-muted mb-2"> { item?.description } </div> 
                                <div className="d-flex px-3 py-1 gap-3">
                                    <button className="btn btn-sm fs-xs btn-outline-main" onClick={ ()=> setModal2(item?.id, item?.title, item?.description) } > Modifier </button>  
                                    <button className="btn btn-sm fs-xs btn-main" onClick={ ()=> setModal(item?.id, item.status) }> { ( item.status == 1 ) ? 'Désactiver' : 'Activer'} </button>
                                </div>
                            </div>
                            )
                        }))      
                    }  
                    {
                        error ? ( <div className="col-md-12"> <span className="d-flex border text-muted px-4 py-3 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                    }
                    {
                        ( Array.isArray(data) && data.length === 0 ) ? ( <div className="col-md-12"> <span className="d-flex border text-muted px-4 py-3 mt-3"> Aucune propriété n'a été enregistrée. </span> </div> ) : null
                    }                                 

                    </div>
                </div>
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
    </div>

    )
}
