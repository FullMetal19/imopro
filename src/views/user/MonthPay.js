import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProductApi } from "../../services/product.api";
import { MonthPayDetailModal, PaymentFormModal} from "./Modal";
import { HistoricMonthpaySlideComponent } from "./HistoricMonthpaySlideComponent";
import { UserApi } from "../../services/user.api";
import { MonthPaymentModal, ValidationPaymentModal } from "../../components/Modal";
import { useParams } from "react-router";


export function MonthPay(){

     const uid = sessionStorage.getItem('uid');
     const user = UserApi();
     let { housingId } = useParams();
    
     const fetchUser = async () => {
         try {
             const res = await user.findOne(uid);
             return res.data.data; 
         } catch (err) { 
             throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
         }
     }
    const { data, refetch } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
    
    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const [ dataModal , setDataModal ] = useState();

    const setModal = (item) => {
        setDataModal(item);
        setModalState(true);
    }
    const closeModal = ( arg ) => {  setModalState( arg ) } 

    //-------------------------------------------------------------------------  
    const [ paymentModalState , setpaymentModalState] = useState(false);
    const [funct, setFunct] = useState(null);

    const setPaymentForm = (method) => {
        setFunct(() => method); // stocke la fonction dans le state
        setpaymentModalState(true);
    };

    const closePaymentForm = ( arg ) => { setpaymentModalState( arg ) } 

    // const methods = (arg) => arg()

    return (

        <div>
            { modalState ? ( <MonthPayDetailModal method={ closeModal } data={ dataModal } /> ) : null }
            {/* ************************************************************************ */}
            { paymentModalState ? ( <MonthPaymentModal refetch={funct} propertyId={housingId} method={ closePaymentForm } /> ) : null }
            {/* ************************************************************************ */}
            <Header designClass={'row shadow'} page={6} />
            {/* ************************************************************************ */}
            <div className="container-md py-5 bg-white"> 
                <div className="row mt-4">
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 col-md-12"> 
                        <div className="row d-flex justify-content-between border rounded-2 p-4 mb-4">
                        <div className="col-md-8 d-flex gap-3 mb-2"> 
                            <img src={'../img/icons8-photo-100.png'} height={45} width={45} alt="Logo" className="rounded-circle border border-3 p-1 border-primary" /> 
                            <div className="d-flex flex-column"> 
                                <span className="color-blue"> { sessionStorage.getItem('fname') + " " + sessionStorage.getItem('lname') } </span>
                                <span className="color-gray"> En ligne </span>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            {
                              (data?.companyStatus == 0 && data?.status == 1 ) ? ( <a className="mb-3 btn px-3 btn-outline-main" href={ "/creation-entreprise" } > Ouvrir une entreprise immobilier </a> ) :
                              ( (data?.companyStatus == 2 && data?.status == 1) ? ( <a className="mb-3 btn px-3 btn-main" href={ `/entreprise/${data?.company.id}` } > Mon entreprise </a> ) :
                              ( (data?.companyStatus == 0 && data?.status == 2) ? ( <a className="mb-3 btn px-3 btn-main" href={ "/admin" } > Dashbaord admin </a> ) : null ) )
                            }
                        </div>
                        </div>
                    </div>
                    {/* ************************************************************************ */}.                  
                    <HistoricMonthpaySlideComponent setPaymentForm={ setPaymentForm } setModal={ setModal } /> 
                    {/* ************************************************************************ */} 
                </div> 
            </div> 
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


