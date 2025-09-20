import React, { useState } from "react";
import { Slide } from "../components/Slide";
import { Footer } from "../components/Footer";
import { FieldComponent, HouseComponent, LocationComponent, ServiceComponent, TestimonialComponent } from "../components/Component";
import { VideoModal } from "../components/Modal";
import {NavigationBar, TopBar } from "../components/Header";


export function Home(){ 

    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }

    return ( 
        
      <div className="container-fluid bg-light">
        { modalState ? ( <VideoModal method={ closeModal } /> ) : null}
          <div className="row"> 
            <TopBar  />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar />
          </div>
          <div className="row px-0 border"> 
            <Slide/>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center bg-gray-light p-5"> 
            <div className="col-md-8 col-lg-5 d-flex flex-column"> 
                <span className="lead text-secondary text-center mb-3 p-4 border rounded-2" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
                <div className="d-flex justify-content-center gap-2"> 
                  <a className="btn btn-lg btn-outline-secondary me-2" href="/inscription"> Version android </a>
                  <a className="btn btn-lg btn-outline-secondary me-2" href="/inscription"> Version IOS </a>
                </div>
            </div>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center"> 
            <ServiceComponent/>
          </div>
            
          {/* ************************************************************************ */}
            <div className="container-fluid bg-three-clr py-5 my-5"> <LocationComponent /> </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center"> 
            <HouseComponent /> 
          </div>
          {/* ************************************************************************ */}
          <div className="container-fluid slide-fixed my-5"> 
            <div className="row d-flex justify-content-center align-items-center h-100"> 
              <div className="d-flex justify-content-center align-items-center mt-3" > 
                <button className='btn circle bg-white shadow p-4 rounded-circle' onClick={ ()=>{ setModalState(true) } } > 
                  <i class="bi bi-play-circle fs-3 bg-blue-clr"></i> 
                </button>
              </div>
            </div>
            </div> 
            {/* ************************************************************************ */}
            <div className="row justify-content-center"> 
              <FieldComponent />
            </div>
            {/* ************************************************************************ */}
            <TestimonialComponent />
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


