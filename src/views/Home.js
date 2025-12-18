import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { FieldComponent, HouseComponent, LocationComponent, ServiceComponent } from "../components/Component";
import { AppModal, VideoModal } from "../components/Modal";
import {NavigationBar, TopBar } from "../components/Header";
import PropertySliderSwiper from "../components/PropertySliderSwiper";
import PropertyGrid from "../components/PropertyGrid";
import ExpandingGallery from "../components/ExpandingGallery";
import TestimonialsCarousel from "../components/TestimonialsCarousel";


export function Home(){ 

    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }

    const [ modalState1 , setModalState1 ] = useState(false);
    const closeModal1 = ( arg ) => {  setModalState1( arg ) }

    return ( 
        
      <div className="container-fluid bg-light">

        <title> Accueil | Diwane-plus </title>
        <meta name="author" content="Diwaneplus" />
        <meta name="keywords" content="entreprise immobilier, immobilier au Sénégal, Immobilier en Afrique, vente et location de maisons, vente et location de terrains, vente et location de biens immobiliers" />
        <meta name="description" content="Découvrez notre plateforme immobilière en ligne dédiée à l’achat, à la vente et à la location de logements et de terrains au Sénégal et dans la sous région Africaine. Parcourez des annonces vérifiées, trouvez rapidement le bien idéal et profitez d'un accompagnement professionnel à chaque étape de votre projet immobilier." />
        <link rel="icon" type="image/png" href="../favicon.png" />

        { modalState && ( <VideoModal method={ closeModal } /> ) }
    
        { modalState1 && ( <AppModal method={ closeModal1 } /> )}

          <div className="row"> 
            <TopBar  />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar />
          </div>
          <div className="row border"> 
            <PropertySliderSwiper/>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center bg-three-clr p-5"> 
            <div className="col-md-8 col-lg-5 d-flex flex-column"> 
                <span className="lead text-muted text-center mb-3 p-4 border rounded-2" > Téléchargez notre application dès aujourd’hui pour explorer nos propriétés, gérer vos annonces et suivre vos transactions en toute simplicité. </span>
                <div className="d-flex flex-column-sm justify-content-center gap-2 pb-4"> 
                  <button className="btn btn-lg btn-main rounded-0 px-3 me-2" onClick={ ()=>{ setModalState1(true) } }> Version android </button>
                  <button className="btn btn-lg btn-outline-main rounded-0 px-3 me-2" onClick={ ()=>{ setModalState1(true) } }> Version IOS </button>
                  {/* <a className="btn btn-lg btn-main rounded-0 px-3 me-2" href="/"> Version android </a>
                  <a className="btn btn-lg btn-outline-main rounded-0 px-3 me-2" href="/"> Version IOS </a> */}
                </div>
            </div>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center py-5 bg-light border-bottom"> 
            <div className="col-lg-10">
              <div className="row">  
                <PropertyGrid/>
              </div>
            </div>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center py-4"> 
            <ServiceComponent/>
          </div>
          {/* ************************************************************************ */}

          <div className="row justify-content-center py-5 bg-gray-light"> 

            <div className="col-lg-5 d-flex justify-content-center col-md-8 pt-5 mb-4">
              <div className="d-flex flex-column align-items-center">
                <span className='py-1 px-3 bg-main text-secondary rounded-circle border border-secondary mb-4 d-flex align-items-center justify-content-center' style={{ width: 110, height:110 }} > 
                   <i className={`bi bi-airplane display-6 text-light`}></i>
                </span>
                <span className="text-secondary text-center lead px-4">
                  At Rivor Law Firm, we combine decades 
                </span>
                <h1 className="display-6 text-secondary text-center"> Performances chorégraphique </h1>
              </div>
            </div> 

            <div className="col-lg-10 py-5 mb-5"> 
                <ExpandingGallery />
            </div>
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center py-5"> 
            <HouseComponent /> 
          </div>
          {/* ************************************************************************ */}
          <div className="slide-fixed mb-5"> 
            <div className="d-flex justify-content-center align-items-center h-100"> 
              <div className="d-flex justify-content-center align-items-center mt-3" > 
                <button className='btn circle bg-white shadow p-4 rounded-circle' onClick={ ()=>{ setModalState(true) } } > 
                  <i className="bi bi-play-circle fs-1 text-blue-clr"></i> 
                </button>
              </div>
            </div>
          </div> 
          {/* ************************************************************************ */}
          <div className="row justify-content-center pb-5"> 
            <FieldComponent />
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center bg-three-clr py-5"> 
            <LocationComponent />
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center"> 
             <div className="col-lg-12 bg-grayLight py-5 border-top">
              <div className="row justify-content-center pt-5" data-aos="fade-up">
                <div className="col-lg-5 text-center mt-4">
                  <span className="lead text-secondary rounded-4 px-4 py-2 bg-blueLight border"> Diwaneplus </span>
                  <p className="display-6 text-secondary mt-4">   
                     Temoignages de quelques collaborateurs  
                  </p>
                </div>
              </div>
              <div className="row py-5" data-aos="fade-up">
                  <TestimonialsCarousel />
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


