import React, { useEffect, useState } from "react";
import { LoginCheckerModal, VisitBookingModal } from "../components/Modal";
import { NavigationBar, TopBar } from "../components/Header";
import { Footer } from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { ProductApi } from "../services/product.api";
// import { PaymentForm } from "../components/Form";
import { useQuery } from "@tanstack/react-query";


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function PropertyDetails()
{

    const [hasBadge, setHasBadge] = useState(false);

    useEffect(() => {
      setHasBadge(!!localStorage.getItem('badge'));
    }, []);


    const product = ProductApi();
    let { id } = useParams();

    const fetchProperty = async (id) => { 
        try {
            const res = await product.findOne(id);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, refetch } = useQuery({  queryKey: ["property", id], queryFn: () => fetchProperty(id),  enabled: !!id });
    
    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }    
    // const setModal = () => setModalState(true);

    const [ loginChecker , setloginChecker ] = useState(false);
    const closeoginCheckerModal = ( arg ) => {  setloginChecker( arg ) }  

    // const reservation = () => {
    //     if (localStorage.getItem('token')) {
    //         setloginChecker(false);
    //         setModalState(true);
    //     } 
    //     else{
    //         setloginChecker(true); 
    //     }
    // }

    const WHATSAPP_NUMBER = "221785342626"; // your business number

    const reservation = () => {
       const message = [
            "*Bonjour et bienvenue sur DiwanePlus !*",
            "Je viens de découvrir cette propriété et elle m’intéresse beaucoup, j’aimerais en savoir plus.",
            "",
            "*Détails de la propriété*",
            `👉 https://diwaneplus.com/propriete/${id}`,
            "",
            `${data?.subtitle} ${data?.title}`,
            `*Pays / Région* : ${data?.country} / ${data?.region}`,
            `*Adresse* : ${data?.address}`,
            `*Prix* : ${data?.price} FCFA ${data?.title === "à louer" ? " / mois" : ""}`,
            `*Superficie* : ${data?.surface} m²`,
            "",
            "Pourriez-vous me confirmer la disponibilité et m’indiquer les prochaines étapes ?",
            "",
            "Merci d'avance pour votre aide !"
          ].join("\n");



    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent( message )}`;

    window.open(url, "_blank");
    }

    // const [ payFormState, setPayForm ] = useState( false )

    return (
        
        <div className="container-fluid bg-light">
            {/* { modalState ? ( <VideoModal method={ closeModal } url={ data?.video } /> ) : null } */}
            { modalState ? ( <VisitBookingModal method={ closeModal } propertyId={id} refetch={refetch} /> ) : null }
            { loginChecker ? ( <LoginCheckerModal method={ closeoginCheckerModal } message={" Refus d'accès !!! veuillez vous authentifier dabord avant de procéder à une reservation."}  />  ) : null }
            {/* ************************************************************************ */}   
            <div className="row"> 
              <TopBar />
            </div> 
            <div className="row sticky-top"> 
              <NavigationBar />
            </div>
            {/* *********************************************************************** */}
            <div className="row justify-content-center"> 
              <div className="col-lg-12 bg-three-clr py-5 px-4 d-flex justify-content-center"> 
                  <div className="text-center text-secondary lead fs-4 px-5 py-3 border"> { isLoading ? ( <Skeleton width={300} height={30} /> ) : 'Détail du ' + data?.type   } </div>
              </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center"> 
              <div className="col-lg-11 pb-3"> 
                <div className="row d-flex justify-content-between my-5">
                    <div className="col-lg-5 mb-4">
                        { 
                            isLoading ? ( <Skeleton height={500} /> ) : (
                            <div className="slider-container mb-4">
                                <Slider {...settings}> 
                                    { 
                                        data?.media.map( (item , index) => { return (
                                            <div className="d-flex" key={index} > <img src={`${item.path}`} alt="Logo" height={300} className="img-fluid" />  </div>
                                        )}) 
                                    }    
                                </Slider>
                            </div>  ) 
                        }  
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-6 mb-5">
                     <div className="p-4 d-flex flex-column border">
                        <span className="text-secondary"> Date : { isLoading ? ( <Skeleton width={200} height={20} /> ) : data?.createdAt } </span>
                        <span className='lead text-secondary mt-2' > { isLoading ? ( <Skeleton height={25} width={450} /> ) : data?.region + '  :  ' +  data?.subtitle + ' ' + data?.title } </span>
                        <div className="my-3">
                        { 
                           isLoading ? ( <Skeleton height={30} width={350} /> ) :  (

                              <div className="d-flex">
                                <span className="bg-blue-light-clr px-2 py-1 text-secondary lead rounded-start-2 border border-light"> <i className="bi bi-cash"></i> </span>
                                <span className="bg-blue-light-clr border border-light text-secondary lead px-3 py-1 rounded-end-2">  
                                   { data?.price +  ' Fcfa ' } { ( data?.title === "à louer" ) && " / mois" } 
                                </span>  
                              </div>
                           ) 
                        }
                        </div>
                        <span className='fs-4 mb-4 py-2 px-3 text-secondary bg-three-clr rounded-1' > Description </span>
                        <span className='text-secondary mb-4 text-justify' > { isLoading ? ( <Skeleton count={10} height={20} /> ) : data?.description } </span>
                        <div className="d-flex gap-3">
                            {/* <button className="my-2 btn  bg-three-clr border-blue rounded-1 color-blue px-4" onClick={ setModal }  > Voir video  </button> */}
                            {/* <button className="my-2 btn btn-outline-secondary px-4" onClick={ reservation }  > Reserver maintenant  </button> */}
                            <button className="my-2 btn btn-lg btn-outline-secondary px-4" onClick={ reservation }  >  Intéressé ? Demander une visite  <i className="bi bi-chevron-right ms-2"></i> </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center px-3"> 
                {/* ************************************************************************ */}
                            <div className="col-lg-11 pb-5"> 
                                <div className="row d-flex justify-content-between mb-5">
                                    {/* ********************************** LEFT CONTAINER ************************************** */}
                                    <div className="col-lg-7 d-flex flex-column"> 
                                        <div className="row bg-three-clr border rounded-1 mb-3">
                                            <span className="lead text-secondary p-3"> Informations supplémentaire </span>
                                        </div>
                                        {/* ********************************** DESC TECHNIQUE ************************************** */}
                                        <div className="row bg-white px-4 py-5 mb-4 border">
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Pays :  { data?.country } </span> ) } </div>
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Region :  { data?.region } </span> ) } </div> 
                                            <div className="col-md-12 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Adresse :  { data?.address } </span> ) } </div> 
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Dimension :  { data?.surface } m² </span> ) } </div>
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Nombre de Salon :  { data?.livingroom } </span> ) } </div> 
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Nombre de chambre :  { data?.bedroom } </span> ) } </div> 
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Nombre de toilette :  { data?.restroom } </span> ) } </div>
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Nombre de niveau :  { data?.floor } </span> ) } </div>
                                            <div className="col-md-6 border p-1 p-2 mb-2"> { isLoading ? ( <Skeleton height={25} /> ) : ( <span className="d-flex text-secondary" > Nombre de cuisine :  { data?.kitchen } </span> ) } </div> 
                                        </div> 

                                        {
                                            hasBadge && (

                                            <div className="row justify-content-center">
                                              <div className="col-12">
                                                <div className="row bg-three-clr border rounded-1 mb-3">
                                                    <span className="lead text-secondary p-3"> Informations sur l’agence propriétaire </span>
                                                </div>
                                                <div className="row bg-white px-4 py-5 mb-4 border">
                                                    <div className="col-md-6 border p-2 mb-2">
                                                        <span className="d-flex text-secondary"> Nom de l'Agence : { data?.company?.name } </span>
                                                    </div>
                                                    <div className="col-md-6 border p-2 mb-2">
                                                        <span className="d-flex text-secondary"> Nom du responsable : { data?.company?.ownerName } </span>
                                                    </div>
                                                    <div className="col-md-6 border p-2 mb-2">
                                                        <span className="d-flex text-secondary"> Numéro de Tel : { data?.company?.phone } </span>
                                                    </div>
                                                    <div className="col-md-6 border p-2 mb-2">
                                                        <span className="d-flex text-secondary"> Email : { data?.company?.email } </span>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>

                                            )
                                        }

                                        {/* {
                                            payFormState ? ( <span className="text-clr h5 mb-2"> Les informations sur la geolocalisation de la propriété sont payant. </span> ) : null
                                        } 
                                        {
                                            payFormState ? ( <PaymentForm amount={1000} /> ) : null
                                        }  */}
                                    </div>

                                    {/* ************************************************************************ */}
                                    <div className="col-lg-1"></div>
                                    {/* ******************************************** RIGHT CONTAINER ***************************************** */}
                                    
                                    <div className="col-lg-4 d-flex flex-column">
                                        <div className="row d-flex flex-column border bg-white pt-4"> 
                                            <div className="d-flex justify-content-center align-items-center my-3 " > 
                                                <span className='circle bg-three-clr' > <i className="bi bi-check-circle text-blue-clr fs-1"></i> </span>
                                            </div>
                                            <span className="text-center text-secondary lead mb-2"> the location description </span>
                                            <span className="text-center text-secondary mb-4 px-4 pb-3" > this is the location description Lorem Ipsum is simply dummy text of the industrythis this is  </span>
                                            <div className="d-flex justify-content-center p-2 bg-blue-clr"> 
                                                <a className="me-2 nav-link border border-light px-1 rounded-2" href="https://x.com/DiwanePlus1960"> <i className="small bi bi-twitter-x text-white"></i> </a>
                                                <a className="me-2 nav-link border border-light px-1 rounded-2" href="https://www.facebook.com/share/1A4SJD2WiU"> <i className="small bi bi-facebook text-white"></i> </a>
                                                <a className="me-2 nav-link border border-light px-1 rounded-2" href="http://www.linkedin.com/in/diwane-plus-0467123a0"> <i className="small bi bi-linkedin text-white"></i> </a>
                                                <a className="me-2 nav-link border border-light px-1 rounded-2" href="https://www.youtube.com/@DiwanePlus"> <i className="small bi bi-youtube text-white"></i> </a>
                                                <a className="me-2 nav-link border border-light px-1 rounded-2" href="https://www.instagram.com/diwane.plus?igsh=MWlhamQ3dWI1MmV5Yg=="> <i className="small bi bi-instagram text-white"></i> </a>
                                            </div>
                                        </div>
                                        {/* ********************************** FORM 2 ************************************** */}
                                    </div>
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


