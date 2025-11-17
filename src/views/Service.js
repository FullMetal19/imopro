import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar, TopBar } from "../components/Header";
import { LocationComponent } from "../components/Component";
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

        <div className="container-fluid bg-light">
            { modalState ? ( <VideoModal method={ closeModal } url={ link } /> ) : null}
            {/* ************************************************************************ */}
            <div className="row"> 
              <TopBar />
            </div> 
            <div className="row sticky-top"> 
              <NavigationBar page={4} />
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center"> 
              <div className="col-lg-10 py-5"> 
                <div className="row d-flex justify-content-between mt-5">
                    <div className="col-md-5 border p-2">
                        <img src={'../img/Intersection-3.png'} alt="Logo" className="img-fluid" /> 
                    </div>  
                    <div className="col-md-6"> 
                        <div className="d-flex flex-column">
                            <div className="my-5" > <span className='py-3 px-4 bg-three-clr text-secondary lead rounded-5' > Diwane+ votre partenaire de confiance </span> </div> 
                            <h1 className='fs-1 lead mb-4 text-secondary' > Pourquoi choisir Diwane+ </h1>
                            <p className='text-muted mb-5 lead' > 
                                Chez Diwane+, nous mettons la transparence, la simplicité et la confiance au cœur de chaque démarche immobilière. Notre plateforme vous offre des services fiables, des annonces de qualités, une expérience fluide et des outils modernes pour louer, vendre ou acheter en toute sérénité. Nous vous accompagnons à chaque étape avec professionnalisme, réactivité et un souci constant de qualité.
                            </p>
                            <div className="row">
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-three-clr px-3 py-2' > <i className="bi bi-check-circle fs-4 text-blue-clr"></i> </span>
                                   <span className='text-secondary ms-2' > Fiabilité et transparence </span>
                                </div> 
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-three-clr px-3 py-2' > <i className="bi bi-check-circle fs-4 text-blue-clr"></i> </span>
                                   <span className='text-secondary ms-2' > Technologie et simplicité </span>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-three-clr px-3 py-2' > <i className="bi bi-check-circle fs-4 text-blue-clr"></i> </span>
                                   <span className='text-secondary ms-2' > Accompagnement personnalisé </span>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center mb-4">
                                   <span className='rounded-circle d-flex bg-three-clr px-3 py-2' > <i className="bi bi-check-circle fs-4 text-blue-clr"></i> </span>
                                   <span className='text-secondary ms-2' > Qualité et professionnalisme </span>
                                </div>
                            </div> 
                            <p className='p-4 bg-three-clr my-4 border-left-main text-secondary lead' > Avec Diwane+, vous faites le choix d’un partenaire de confiance, engagé à valoriser votre patrimoine et à protéger vos investissements. </p>     
                            <div> 
                                <button className="px-3 mt-2 btn btn-main" onClick={ setModal }>
                                    <i className="bi bi-play-circle text-white me-2"></i>
                                    <span className="text-white"> Voir video </span>
                                </button> 
                            </div> 
                        </div>
                    </div> 
                </div> 
              </div> 
            </div> 
            {/* ************************************************************************ */}
            <div className="row justify-content-center bg-gray-light py-5"> 
                <LocationComponent />
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center"> 
              <div className="col-lg-10 my-4">
                <div className="py-5"> 
                    <div className="row justify-content-center"> 
                      <div className="col-md-8 col-lg-5 d-flex flex-column"> 
                          <div className="px-5 py-3 w-100 text-center text-secondary border bg-light rounded-5 lead"> Nos Services Immobiliers </div>
                      </div>
                    </div>
                    <div className="row mt-5"> 
                    {  isLoading ? ( <div className="row"> <ServiceSkeleton value={ 3 } /> </div> ) : (
                        data?.map( (item , index) => { return (
                            <ServiceContainer title={ item.title } description={ item.description } key={index} />
                        )})) 
                    }  
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


