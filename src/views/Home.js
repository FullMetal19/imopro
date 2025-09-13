import React, { useState } from "react";
import { Slide } from "../components/Slide";
import { Footer } from "../components/Footer";
import { FieldComponent, HouseComponent, LocationComponent, ServiceComponent, TestimonialComponent } from "../components/Component";
import { VideoModal } from "../components/Modal";


export function Home(){ 

    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }

    return (

        <div>
            { modalState ? ( <VideoModal method={ closeModal } /> ) : null}
            <Slide page={1} />   
            {/* ************************************************************************ */}
            <ServiceComponent/>
            {/* ************************************************************************ */}
            <div className="container-fluid bg-three-clr py-5 my-5"> <LocationComponent /> </div>
            {/* ************************************************************************ */}
            <HouseComponent /> 
            {/* ************************************************************************ */}
            <div className="container-fluid slide-fixed my-5 pt-5"> 
                <div className="row d-flex justify-content-center align-items-center pt-5"> 
                    <div className="d-flex justify-content-center align-items-center mt-3" > 
                        <button className='btn circle bg-white shadow mt-5' onClick={ ()=>{ setModalState(true) } } > <img src={'../img/icons8-jouer-64.png'} alt="Logo" width={50} height={50} className="" /> </button>
                    </div>
                </div>
            </div> 
            {/* ************************************************************************ */}
            <FieldComponent />
            {/* ************************************************************************ */}
            <TestimonialComponent />
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


