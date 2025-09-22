import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { UserApi } from "../../services/user.api";
import { MessageModal } from "./Modal";
import { VisitSlideComponent } from "./VisitSlideComponent";
import { AccomodationSlideComponent } from "./AccomodationSlideComponent";
import { GeolocalisationModal, ValidationPaymentModal } from "../../components/Modal";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function Account()
{
    const [refetch, setRefetch] = useState(true);
    const [btnstate, setBtnstate] = useState(true);
    

    const user = UserApi();

    const fetchUser = async () => {
        try {
            const { data } = await user.findOne();
            // console.log(data)
            return data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

    //-------------------------------------------------------------------------  
    const [ modal1State , setModal1State] = useState(false);
    const [ msg , setMsg] = useState();
    const setForm1 = (msg) => {
        setMsg(msg);
        setModal1State(true);
    }
    const closeForm1 = ( arg ) => { setModal1State( arg ) } 

    
    const [ latitude , setLatitude] = useState();
    const [ longitude , setLongitude] = useState();

    const [ guaranty , setGuaranty] = useState();
    const [ propertyId , setPropertyId] = useState();

    const [ localisation , setLocalisation] = useState(false);
    const [ validation , setValidation] = useState(false);
    
    const openLocalisationModal = (lat, long) => { 
        setLatitude(lat);
        setLongitude(long);
        setLocalisation(true);
    }
    
    const openValidationModal = (guaranty, propertyId) => { 
        setGuaranty(guaranty);
        setPropertyId(propertyId);
        setValidation(true);
    }

    return (

        <div className="container-fluid bg-light">
          {/* ************************************************************************ */}
            { modal1State ? ( <MessageModal method={ closeForm1 } message={msg} /> ) : null }
            { localisation && ( <GeolocalisationModal latitude={latitude} longitude={longitude} method={ ()=> setLocalisation(false) } /> ) }
            { validation && ( <ValidationPaymentModal guaranty={guaranty} propertyId={propertyId} method={ ()=> setValidation(false) } refetch={refetch} /> ) }
          <div className="row"> 
            <TopBar />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar page={6} />
          </div>
          <div className="row justify-content-center border px-3"> 
              <div className="col-lg-10 py-5"> 
                <div className="row mt-4">
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 col-md-12"> 
                        <div className="row d-flex justify-content-between border rounded-2 p-4 mb-4">
                        <div className="col-md-8 d-flex gap-3 mb-2"> 
                            <img src={`${process.env.REACT_APP_PATH}/${data?.image}`} height={45} width={45} alt="Logo" className="rounded-circle border border-3 p-1 border-secondary" /> 
                            <div className="d-flex flex-column"> 
                                <span className="text-secondary"> { data?.fname + " " + data?.lname } </span>
                                <span className="color-gray small"> En ligne </span>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            {
                              (data?.companyStatus == 0 && data?.status == 1 ) ? ( <a className="mb-3 btn px-3 btn-outline-secondary" href={ "/creation-entreprise" } > Ouvrir une entreprise immobilier </a> ) :
                              ( (data?.companyStatus == 2 && data?.status == 1) ? ( <a className="mb-3 btn px-3 bg-blue-clr text-white" href={ `/entreprise/${data?.company.id}` } > Mon entreprise </a> ) :
                              ( (data?.companyStatus == 0 && data?.status == 2) ? ( <a className="mb-3 btn px-3 btn-secondary" href={ "/admin" } > Dashbaord admin </a> ) : null ) )
                            }
                        </div>
                        </div>
                    </div>
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 border rounded-top-2 mb-4 bg-gray-light"> 
                        <div className="d-flex px-4 py-4">
                            {
                               (data?.companyStatus == 1) ? (<span className="text-secondary"> Votre demande de creation d'entreprise est en cours de traitement. Appelez au (77 000 00 00) pour plus d'information </span>) :
                               ( (data?.companyStatus == -1) ? (
                               <div className="d-flex justify-content-between gap-4 w-100">
                                    <span className="text-secondary"> Votre demande d'ajout d'entreprise est invalidée </span>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-outline-secondary" onClick={ ()=> setForm1( data?.company.message) } > Voir message </button>
                                        <a className="btn btn-secondary" href={`/modification-entreprise/${data?.company.id}`} > Modifier </a> 
                                    </div> 
                               </div> ) :
                               ( (data?.companyStatus == -2) ? (<span className="text-secondary"> Votre entreprise est bloqué. Appelez au (77 000 00 00) pour plus d'information </span>) : 
                               (<span className="text-secondary lead"> Bienvenue chez ImmoPro </span>) ))
                            }   
                        </div>
                    </div>
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 mb-4 px-0"> 
                        <div className="d-flex"> 
                            <button className={`bouton text-secondary py-2 ${ btnstate ? 'border-top border-start border-end bg-light rounded-top-3' : 'border-bottom' }`} onClick={ ()=>{ setBtnstate(true) } } > Rendez-vous </button>  
                            <button className={`bouton text-secondary py-2 ${ btnstate ? 'border-bottom' : 'border-top border-start border-end bg-light rounded-top-3' }`} onClick={ ()=>{ setBtnstate(false) } } > Propriétés </button>
                            <div className="d-flex w-100 border-bottom"></div>
                        </div>
                    </div>
                    {/* ************************************************************************ */}
                    { btnstate ? ( <VisitSlideComponent openLocalisationModal={openLocalisationModal} openValidationModal={openValidationModal} setRefetch={setRefetch} /> ) :  ( <AccomodationSlideComponent /> ) }
                    {/* ************************************************************************ */} 
                </div> 
              </div>     
          </div>
          {/* ************************************************************************ */}
          <div className="row"> 
             <Footer />
          </div>
                    
        </div>
    )
}


