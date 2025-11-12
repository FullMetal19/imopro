import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";

import { Modal1 } from "./Modal";
import { useParams } from "react-router";
import { CompanyApi } from "../../../services/company.api";
import { BoardContainer, SoldeContainer } from "./Containers";


export function Stat()
{
    const { companyId } = useParams();
    const company = CompanyApi();
    const uid = sessionStorage.getItem('uid');
    
    const fetchCompany = async () => {
        try {
            const res = await company.findOne(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["company"], queryFn: fetchCompany });

    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const setModal = () => {
        setModalState(true);
    }
    const closeModal = ( arg ) => {  setModalState( arg ) } 
    //------------------------------------------------------------------------
    const [status, setStatus] = useState(0);
    const [isLoading1, setIsLoading1] = useState(false);

    const block = async () => {
        try{
            const res = await company.setBlock(companyId, uid);
            setIsLoading1(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
        } catch (err) { 
            setStatus(-1);
            setIsLoading1(false);
        }
    }
    
    
    return (
        
    <div className="">
        {/* ************************************************************************ */}
        { modalState ? ( <Modal1 method={ closeModal } companyId={companyId} message={"Etes vous sure de bloquer le compte de cette entreprise."} /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={3}>            
            <div className="container-fluid bg-white">
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="row d-flex justify-content-between gap-4 align-items-center mb-4"> 
                                    <div className="col-md-2" > <span className="h5 text-muted mt-2"> Statistique </span> </div> 
                                </div>
                            </div>
                            <div className="row">

                                {/* *************************************************************************************** */}
                                <div className="col-md-4 d-flex flex-column p-0 border-end">       
                                    <SoldeContainer />
                                    {/* ------------------------------------------------ */}
                                    <div className="d-flex flex-column p-4 border-bottom" > 
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="color-gray fs-xs"> Prénom et nom :  </span>
                                            <span className="form-control text-muted"> { data?.user.fname + " " + data?.user.lname } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="color-gray fs-xs"> Email : </span>
                                            <span className="form-control text-muted"> { data?.user.email } </span>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="color-gray fs-xs"> Phone : </span>
                                            <span className="form-control text-muted"> { data?.user.phone } </span>
                                        </div>       
                                    </div>
                                    <div className="p-3 border-bottom"> 
                                        <span className="main-color fs-xs"> Bloquer le compte  </span>
                                    </div>
                                    {/* ------------------------------------------------ */}
                                    <div className="d-flex flex-column p-3 border-bottom" >                                            
                                        <div className="d-flex justify-content-between gap-3"> 
                                            <span className="border rounded-4 text-muted py-1 px-4 bg-three-clr"> { (data?.status === 2) ? 'Compte actif' : 'Compte bloqué' }  </span>
                                            <button className="btn btn-sm btn-outline-main rounded-4 px-3" onClick={ setModal } > Modifier </button> 
                                        </div>      
                                    </div>

                                </div>

                                {/* ********************************************************************************************************** */}
                                <div className="col-md-8 mb-5">
                                    <BoardContainer/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>    
              
    )
}


