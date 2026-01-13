import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { UserApi } from "../../services/user.api";
import { MessageModal } from "./Modal";
import { VisitSlideComponent } from "./VisitSlideComponent";
import { AccomodationSlideComponent } from "./AccomodationSlideComponent";
import { GeolocalisationModal, ValidationPaymentModal } from "../../components/Modal";


export function Account()
{
    const [refetchFunction, setRefetchFunction] = useState();

    const [btnstate, setBtnstate] = useState(true);
    
    const user = UserApi();

    const fetchUser = async () => {
        try {
            const { data } = await user.findOne();
            if(data.success) {
                localStorage.setItem('cname', data?.data?.company?.name);
                localStorage.setItem('cicon', data?.data?.company?.icon);
            }
            return data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
 
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
            { validation && ( <ValidationPaymentModal guaranty={guaranty} propertyId={propertyId} method={ ()=> setValidation(false) } refetch={refetchFunction} /> ) }
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
                            {
                              data?.image === null ? ( 
                                <div className="bg-blue-clr text-light border border-secondary rounded-circle rounded-circle border fw-bold d-flex align-items-center justify-content-center" style={{ width:45, height:45 }}>
                                   { data?.fname ? data.fname.charAt(0).toUpperCase() : ""}{data?.lname ? data.lname.charAt(0).toUpperCase() : ""}
        </                       div>
                               ) :  (  <img src={ data?.image } height={45} width={45} alt="Logo" className="rounded-circle border border-3 p-1 border-secondary" /> )
                            } 
                            
                            <div className="d-flex flex-column"> 
                                <span className="text-secondary"> { data?.fname + " " + data?.lname } </span>
                                <span className="color-gray small"> En ligne </span>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            {
                              ( data?.companyStatus === 0 &&  data?.status === true ) ? ( <a className="mb-3 btn px-3 btn-outline-secondary" href={ "/creation-entreprise" } > Ouvrir un agence </a> ) :
                              ( ( data?.companyStatus === 2 && data?.status === true ) ? ( <a className="mb-3 btn px-3 bg-blue-clr text-white" href={ `/entreprise/${data?.company.id}` } > Mon agence </a> ) :
                              ( ( (data?.companyStatus === 0 || data?.companyStatus === 2) &&  parseInt( data?.status ) === 2 ) ? ( <a className="mb-3 btn px-3 btn-secondary" target="blank" href={ "https://cpanel.diwaneplus.com" } > Panel Administration </a> ) : null ) )
                            }
                        </div>
                        </div>
                    </div>
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 border rounded-top-2 mb-4 bg-gray-light"> 
                        <div className="d-flex px-4 py-4">
                            {
                               ( parseInt(data?.companyStatus) === 1) ? (<span className="text-secondary"> Votre demande de creation d'agence immobilier est en cours de traitement. Appelez au (77 000 00 00) pour plus d'information </span>) :
                               ( ( parseInt(data?.companyStatus) === -1) ? (
                               <div className="d-flex justify-content-between gap-4 w-100">
                                    <span className="text-secondary"> Votre demande d'ajout d'agence immobilier est invalidée </span>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-outline-secondary" onClick={ ()=> setForm1( data?.company.message) } > Voir message </button>
                                        <a className="btn btn-secondary" href={`/modification-entreprise/${data?.company.id}`} > Modifier </a> 
                                    </div> 
                               </div> ) :
                               ( ( parseInt(data?.companyStatus) === -2) ? (<span className="text-secondary"> Votre agence immobilier est bloqué. Appelez au ( +221 78 534 26 26 ) pour plus d'information </span>) : 
                               (<span className="text-secondary lead"> Bienvenue chez Diwaneplus </span>) ))
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
                    { btnstate ? ( <VisitSlideComponent openLocalisationModal={openLocalisationModal} openValidationModal={openValidationModal} refetchHandler={ setRefetchFunction } /> ) :  ( <AccomodationSlideComponent /> ) }
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


