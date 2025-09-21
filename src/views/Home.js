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
          <div className="row border"> 
            <Slide/>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center bg-gray-light p-5"> 
            <div className="col-md-8 col-lg-5 d-flex flex-column"> 
                <span className="lead text-secondary text-center mb-3 p-4 border rounded-2" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
                <div className="d-flex flex-column-sm justify-content-center gap-2 pb-4"> 
                  <a className="btn btn-lg btn-outline-secondary me-2" href="/inscription"> Version android </a>
                  <a className="btn btn-lg btn-outline-secondary me-2" href="/inscription"> Version IOS </a>
                </div>
            </div>
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center py-5"> 
            <ServiceComponent/>
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center bg-gray-light py-5"> 
            <LocationComponent />
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center py-5"> 
            <HouseComponent /> 
          </div>
          {/* ************************************************************************ */}
          <div className="slide-fixed my-5"> 
            <div className="d-flex justify-content-center align-items-center h-100"> 
              <div className="d-flex justify-content-center align-items-center mt-3" > 
                <button className='btn circle bg-white shadow p-4 rounded-circle' onClick={ ()=>{ setModalState(true) } } > 
                  <i class="bi bi-play-circle fs-1 text-blue-clr"></i> 
                </button>
              </div>
            </div>
          </div> 
          {/* ************************************************************************ */}
          <div className="row justify-content-center"> 
            <FieldComponent />
          </div>
          {/* ************************************************************************ */}
          <div className="row justify-content-center pb-5"> 
            <TestimonialComponent />
          </div>
          {/* ************************************************************************ */}
          <div className="row"> 
            <Footer />
          </div>
             
        </div>
    )
}


