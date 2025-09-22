import React, { useState } from "react";
import { LoginCheckerModal, VideoModal, VisitBookingModal } from "../components/Modal";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { ProductApi } from "../services/product.api";
import { PaymentForm } from "../components/Form";
import { useQuery } from "@tanstack/react-query";
import { refresh } from "aos";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function PropertyDetails(){

    const product = ProductApi();
    // const navigate = useNavigate();
    let { id } = useParams();

    const fetchProperty = async (id) => { 
        try {
            const res = await product.findOne(id);
            console.log(res.data)
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

    const reservation = () => {
        if (sessionStorage.getItem('token')) {
            setloginChecker(false);
            setModalState(true);
        } 
        else{
            setloginChecker(true); 
            console.log(false) 
        }
    }

    const [ payFormState, setPayForm ] = useState( false )

    return (
        
        <div>
            {/* { modalState ? ( <VideoModal method={ closeModal } url={ data?.video } /> ) : null } */}
            { modalState ? ( <VisitBookingModal method={ closeModal } propertyId={id} refetch={refetch} /> ) : null }
            { loginChecker ? ( <LoginCheckerModal method={ closeoginCheckerModal } message={" Refus d'accès !!! veuillez vous authentifier dabord avant de procéder à une reservation."}  />  ) : null }
            {/* ************************************************************************ */}   
            <Header designClass={'row shadow'} />
            {/* ************************************************************************ */}   
            <div className="container-fluid bg-three-clr py-5 px-4 d-flex justify-content-center"> 
               <div className="h3 text-center color-blue px-5 py-2 border-blue"> { isLoading ? ( <Skeleton width={300} /> ) : 'Détail du ' + data?.type   } </div>
            </div>
            {/* ************************************************************************ */}   
            <div className="container-fluid px-4 pb-3"> 
                <div className="row d-flex justify-content-between my-5">
                    <div className="col-lg-5">
                        { 
                            isLoading ? ( <Skeleton height={500} /> ) : (
                            <div className="slider-container mb-4">
                                <Slider {...settings}> 
                                    { 
                                        data?.media.map( (item , index) => { return (
                                            <div className="d-flex" key={index} > <img src={`${process.env.REACT_APP_PATH}/${item.path}`} alt="Logo" height={300} className="img-fluid" />  </div>
                                        )}) 
                                    }    
                                </Slider>
                            </div>  ) 
                        }  
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-6 p-4 d-flex flex-column border">
                        <span className=""> Date : { isLoading ? ( <Skeleton width={200} /> ) : data?.createdAt } </span>
                        <span className='fs-lg mt-2' > { isLoading ? ( <Skeleton /> ) : data?.region + '  :  ' +  data?.subtitle + ' ' + data?.title } </span>
                        <div className="d-flex align-items-center my-3">
                            <img src={'../img/icons8-calendrier-96.png'} alt="Logo" width={20} height={20} className="me-1 hide" />
                            <span className="main-color" > { isLoading ? ( <Skeleton /> ) :  (data?.price +'  Fcfa') } </span>
                        </div>
                        <span className='fs-lg mb-4 p-2 text-light bg-main rounded-1' > Description </span>
                        <span className='text-clr mb-4 text-justify' > { isLoading ? ( <Skeleton count={10} /> ) : data?.description } </span>
                        <div className="d-flex gap-3">
                            {/* <button className="my-2 btn  bg-three-clr border-blue rounded-1 color-blue px-4" onClick={ setModal }  > Voir video  </button> */}
                            <button className="my-2 btn bg-blue-clr text-light align-items-center px-4" onClick={ reservation }  > Reserver maintenant  </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className="container-fluid px-4 pb-5"> 
                <div className="row d-flex justify-content-between mb-5">
                    <div className="col-lg-12 my-5 bg-three-clr p-2 border"> </div>
                    {/* ********************************** LEFT CONTAINER ************************************** */}
                    <div className="col-lg-8 ps-4 pe-5 py-2 d-flex flex-column">
                        <div className="mb-4"> <button className="btn bg-three-clr border-blue rounded-1 color-blue px-4" onClick={ ()=> payFormState ? setPayForm(false) : setPayForm(true) } > Voir la localisation  </button>  </div> 
                        {/* ************************************************************************ */}
                        <div className="row bg-main border rounded-1 mb-3">
                            <span className="fs-lg text-light px-2 py-1"> The location description </span>
                        </div>
                        {/* ********************************** DESC TECHNIQUE ************************************** */}
                        <div className="row bg-three-clr p-4 mb-5 border">
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Pays : { isLoading ? ( <Skeleton /> ) : data?.country } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Region : { isLoading ? ( <Skeleton /> ) : data?.region } </span> </div>
                            <div className="col-md-12 border p-1 px-2 mb-2"> <span className="mb-3" > Adresse : { isLoading ? ( <Skeleton /> ) : data?.address } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Dimension : { isLoading ? ( <Skeleton /> ) : data?.surface } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Nombre de Salon : { isLoading ? ( <Skeleton /> ) : data?.livingroom } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Nombre de chambre : { isLoading ? ( <Skeleton /> ) : data?.bedroom } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Nombre de toilette : { isLoading ? ( <Skeleton /> ) : data?.restroom } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Nombre de niveau : { isLoading ? ( <Skeleton /> ) : data?.floor } </span> </div>
                            <div className="col-md-6 border p-1 px-2 mb-2"> <span className="mb-3" > Nombre de cuisine : { isLoading ? ( <Skeleton /> ) : data?.kitchen } </span> </div>
                        </div> 
                        {
                            payFormState ? ( <span className="text-clr h5 mb-2"> Les informations sur la geolocalisation de la propriété sont payant. </span> ) : null
                        } 
                        {
                            payFormState ? ( <PaymentForm amount={1000} /> ) : null
                        } 
                    </div>
                    {/* ********************************** RIGHT CONTAINER ************************************** */}
                    <div className="col-lg-4 px-4 d-flex flex-column">
                        <div className="row d-flex flex-column border bg-white"> 
                            <div className="d-flex justify-content-center align-items-center my-3 " > 
                                <span className='circle bg-snd-clr' > <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="" /> </span>
                            </div>
                            <span className="text-center text-clr h4 mb-2" width="200" height="200" > the location description </span>
                            <span className="text-center text-clr mb-4 px-4" width="200" height="200" > this is the location description Lorem Ipsum is simply dummy text of the industrythis this is  </span>
                            <div className="d-flex justify-content-center p-2 bg-blue-clr"> 
                                <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-twitter-100.png'} alt="Logo" title="twitter" width={20} height={20} className="" /> </a>
                                <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-facebook-90.png'} alt="Logo" title="facebook" width={20} height={20} className="" /> </a>
                                <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-instagram-100.png'} alt="Logo" title="instagram" width={20} height={20} className="" /> </a>
                                <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-lecture-de-youtube-100.png'} alt="Logo" title="youtube" width={20} height={20} className="" /> </a>
                                <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-tic-tac-100.png'} alt="Logo" title="tik tok" width={20} height={20} className="" /> </a>
                            </div>
                        </div>
                        {/* ********************************** FORM 2 ************************************** */}
                    </div>
                </div>
            </div>
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


