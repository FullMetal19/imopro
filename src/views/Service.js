import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/Header";
import { LocationComponent, SectionTitle } from "../components/Component";
import { ServiceContainer } from "../components/Container";
import { Footer } from "../components/Footer";
import { VideoModal } from "../components/Modal";
import { ServiceApi } from "../services/service.api";
import { ServiceSkeleton } from "../components/Skeleton";


export function Service(){

     const service = ServiceApi();

    const [ modalState , setModalState ] = useState(false);
    const [ link , setLink ] = useState();

    const fetchServices = async () => { 
        try {
            const res = await service.findAll();
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data } = useQuery({  queryKey: ["services"], queryFn: fetchServices });


    const closeModal = ( arg ) => {  setModalState( arg ) }

    const setModal = () => {
        setModalState(true);
        setLink("https://www.youtube.com/embed/Wf4nNKVkaPo?si=9cTdnXnG5CLtYg56")
    } 

    return (

        <div>
            { modalState ? ( <VideoModal method={ closeModal } url={ link } /> ) : null}
            {/* ************************************************************************ */}
            <Header designClass={'row shadow'} page={4} />
            {/* ************************************************************************ */}
            <div className="container py-5"> 
                <div className="row d-flex justify-content-between mt-5">
                    <div className="col-md-5 border p-2">
                        <img src={'../img/Intersection-3.png'} alt="Logo" className="img-fluid" /> 
                    </div>  
                    <div className="col-md-6"> 
                        <div className="d-flex flex-column">
                            <div className="my-5" > <span className='py-3 px-5 bg-snd-clr main-color rounded-5' > Service's title </span> </div> 
                            <span className='display-5 bold mb-4' > This is the title of this saction </span>
                            <span className='text-clr mb-5' > this is the location description Lorem Ipsum is simply dummy text of the industrythis this is the location description Lorem Ipsum is simply dummy text of the industrythis is the location description Lorem Ipsum is simply dummy text of the industry this is the location description Lorem Ipsum is simply dummy text of the industrythis is the location description Lorem Ipsum is simply dummy text of the industry </span>
                            <div className="row">
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-snd-clr p-3' > <img src={ '../img/icons8-accueil-128.png' } alt="Logo" width={30} height={30} className="" /> </span>
                                   <span className='text-clr ms-2' > This is the title </span>
                                </div> 
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-snd-clr p-3' > <img src={ '../img/icons8-accueil-128.png' } alt="Logo" width={30} height={30} className="" /> </span>
                                   <span className='text-clr ms-2' > This is the title </span>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-snd-clr p-3' > <img src={ '../img/icons8-accueil-128.png' } alt="Logo" width={30} height={30} className="" /> </span>
                                   <span className='text-clr ms-2' > This is the title </span>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-snd-clr p-3' > <img src={ '../img/icons8-accueil-128.png' } alt="Logo" width={30} height={30} className="" /> </span>
                                   <span className='text-clr ms-2' > This is the title </span>
                                </div>
                            </div> 
                            <span className='p-4 bg-snd-clr my-4 border-left-main' > this is the location description Lorem Ipsum is simply dummy text of the industrythis this is the location description Lorem Ipsum is simply dummy text of the industrythis is the location description </span>     
                            <div> 
                                <button className="d-flex mt-2 btn btn align-items-center py-2 px-4 bg-main" onClick={ setModal }>
                                    <img src={'../img/icons8-film-64.png'} alt="Logo" width={30} height={30} className="me-1" />
                                    <span className="color-white" > lire video </span>
                                </button> 
                            </div> 
                        </div>
                    </div> 
                </div> 
            </div> 
            {/* ************************************************************************ */}
            <div className="container-fluid bg-three-clr py-5 my-5">
                <div className="container py-5"> 
                    <SectionTitle text={'Nos services'} />
                    <div className="row mt-5"> 
                    {  isLoading ? ( <div className="row"> <ServiceSkeleton value={ 3 } /> </div> ) : (
                        data?.map( (item , index) => { return (
                            <ServiceContainer title={ item.title } desc={ item.description } key={index} />
                        )})) 
                    }  
                    </div> 
                </div> 
            </div>
            {/* ************************************************************************ */}
            <div className="pb-5"> <LocationComponent /> </div>
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


