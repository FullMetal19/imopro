import React, { useEffect, useState }  from 'react';
import { useQuery } from "@tanstack/react-query";
import { FieldSkeleton, HouseSkeleton, LocationSkeleton, ServiceSkeleton, TestimonialSkeleton } from './Skeleton';
import { FieldContainer, HouseContainer, LocationContainer, ServiceContainer, TestimonialContainer } from './Container';
import Slider from 'react-slick';
import config from '../config/slickConf';
import { ServiceApi } from '../services/service.api';
import { ProductApi } from '../services/product.api';
import { TestimonialApi } from '../services/testimonial.api';

const service = ServiceApi();
const product = ProductApi();
const testimonial = TestimonialApi();


// ***************************************************************************************************************
export function ServiceComponent() 
{     
    const fetchServices = async () => {
        try {
            const res = await service.find(3);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["services"], queryFn: fetchServices });

    return (

        <div className="container mt-5">
            <SectionTitle text={ 'Lorem Ipsum is simply' } />
            <div className="row py-5 d-flex justify-content-center"> 
            {  
                isLoading ? ( <div className="row"> <ServiceSkeleton value={ 3 } /> </div> ) : (
                data?.map( (item , index) => {
                    return (
                        <ServiceContainer title={ item.title } desc={ item.desc } key={index} > 
                            <a type="submit" href={"/service"} className="btn btn-white mb-2 px-4"> Explorer plus </a> 
                        </ ServiceContainer>
                    )
                }))
            }
            {
                error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
            }
            {
                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
            } 
            </div> 
        </div>
    )
}

// *******************************************************************************************************************
export function LocationComponent() 
{
    const settings = config();

    const fetchLocalities = async () => {
        try {
            const res = await product.findLocalities();
            console.log(res.data);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["localities"], queryFn: fetchLocalities });
        
    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Lorem Ipsum is simply' } />
            <SubTitle text={ 'Lorem Ipsum is simply' } />
            <div className="row mt-4 d-flex justify-content-center">       
                { 
                    isLoading ? ( <div className="row"> <LocationSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} /> </div> ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <LocationContainer title={ item.region } desc={ item.count + ' Propriétés' } id={ item.region } index={index} />
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                }  
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                } 
            </div> 
        </div> 

    )
} 

// ****************************************************************************************************************
export function NearestHousesComponent() { 

    var settings = config()
    const [coords, setCoords] = useState(null);
    const [errCoord, setErrCoord] = useState(false);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (item) => setCoords({ lat: item.coords.latitude, lon: item.coords.longitude }),
        (err) => setErrCoord(true)
      );
    }, []);

    const fetchNearest = async () => {
      const { lat, lon } = coords;
      const res = await product.findNearestHouse(lon, lat);
      return res.data.data;
    };

    const { isLoading, data, error } = useQuery({
      queryKey: ['nearestHouses', coords],
      queryFn: fetchNearest,
      enabled: !!coords,
    });

    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Liste des logements les plus proches de votre position' } />
            <div className="row mt-4 d-flex justify-content-center"> 
                { 
                    isLoading ? (  <div className="row"> <HouseSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <HouseContainer key={index} price={ item.price } title={ item.title } desc={ item.desc } id={ item.id } image={ item.media[1].path } />
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                } 
                {
                    errCoord ? ( <div className="col-lg-6 col-md-8 shadow bg-white rounded-3 p-4 color-blue"> Veuillez autoriser la géolocalisation pour avoir la liste de nos logements qui vous sont proche. </div> ) : null
                } 
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="d-flex alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                }  
            </div> 
        </div> 
    )
}

// // ****************************************************************************************************************
export function HouseComponent() { 

    var settings = config()

    const fetchHouses = async () => { 
        try {
            const res = await product.findHouse(10);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["houses"], queryFn: fetchHouses });

    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Lorem Ipsum is simply' } />
            <SubTitle text={ 'Lorem Ipsum is simply' } />
            <div className="row mt-4 d-flex justify-content-center"> 
                { 
                    isLoading ? (  <div className="row"> <HouseSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <HouseContainer key={index} price={ item.price } title={ item.title } desc={ item.description } id={ item.id } image={ item.media[0].path } companyName={item.company?.name} />
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                }  
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                }  
            </div> 
        </div> 
    )
}

// ****************************************************************************************************************
export function NearestFieldsComponent() { 

    var settings = config();
    const [coords, setCoords] = useState(null);
    const [errCoord, setErrCoord] = useState(false);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
          (item) => setCoords({ lat: item.coords.latitude, lon: item.coords.longitude }),
          (err) => setErrCoord(true)
      );
    }, []);

    const fetchFields = async () => {
      const { lat, lon } = coords;
      const res = await product.findNearestField(lon, lat);
      return res.data.data;
    };

  const { isLoading, data, error } = useQuery({
    queryKey: ['nearestFiedls', coords],
    queryFn: fetchFields,
    enabled: !!coords,
  });

    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Liste des terrains les plus proches de votre position' } />
            <div className="row mt-4 d-flex justify-content-center"> 
                { 
                    isLoading ? (  <div className="row"> <FieldSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <FieldContainer title={ item.title } desc={ item.desc } image={ item.media[0].path } price={ item.price } id={ item.id } key={index} />
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                } 
                {
                    errCoord ? ( <div className="col-lg-6 col-md-8 shadow bg-white rounded-3 p-4 color-blue"> Veuillez autoriser la géolocalisation pour avoir la liste de nos terrains qui vous sont proche. </div> ) : null
                } 
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                }   
            </div> 
        </div> 
    )
}

// ****************************************************************************************************************
export function FieldComponent() { 

    var settings = config()

    const fetchFields = async () => { 
        try {
            const res = await product.findField(10);
            return res.data.data;  
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["fields"], queryFn: fetchFields });

    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Lorem Ipsum is simply' } />
            <SubTitle text={ 'Voir quelques terrains' } />
            <div className="row mt-4 d-flex justify-content-center"> 
                { 
                    isLoading ? ( <div className="row"> <FieldSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div> ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <FieldContainer title={ item.title } desc={ item.description } image={ item.media[0].path } price={ item.price } id={ item.id } key={index} />
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                } 
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                }  
            </div> 
        </div> 
    )
}

// ****************************************************************************************************************
export function TestimonialComponent() { 

    var settings = config()

    const fetchTestimonials = async () => { 
        try {
            const res = await testimonial.find(6);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

    return (

        <div className="container py-5"> 
            <SectionTitle text={ 'Lorem Ipsum is simply' } />
            <div className="row mt-4 mb-5 d-flex justify-content-center"> 
                { 
                    isLoading ? ( <div className="row">  <TestimonialSkeleton value={ 4 } /> </div> ) : (
                    <div className="slider-container">
                        <Slider {...settings}> 
                            { 
                                data?.map( (item , index) => { return (
                                    <TestimonialContainer key={index} title={ item.title } desc={ item.text } /> 
                                )}) 
                            }
                        </Slider>
                    </div> ) 
                }  
                {
                    error ? ( <div className="col-md-12 mt-3"> <div className="alert alert-danger p-5 mt-3 " > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                }
                {
                    ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex alert alert-primary p-5 mt-3"> La liste de propriétés, vide. </div> ) : null
                } 
            </div> 
        </div> 
    )
}


// ****************************************************************************************************************

// ****************************************************************************************************************

// ****************************************************************************************************************

// ****************************************************************************************************************
export function SectionTitle({text}) 
{
    return (
        
        <div className="row py-3 d-flex justify-content-center"> 
            <div className="col-md-6 text-center"> 
                <div className="px-5 py-3 w-100 text-center text-muted border bg-three-clr rounded-5"> { text } </div>
            </div> 
        </div>
    )  
}

// ***************************************************************************************************************      
export function SubTitle({text}) 
{             
    return (
        
        <div className="row py-3 d-flex justify-content-center"> 
            <div className="col-md-5 text-center"> 
                <span className="h1 bold text-center text-clr"> { text }  </span>
            </div> 
        </div>
    )
}

// ******************************************************************************************************************
export function TextReducer({text, maxsize}) 
{
    if ( text?.length <= maxsize ) return ( <span > { text }  </span> )
    else{
        const reducer = text?.slice(0, maxsize) + '...';
        return ( <span > { reducer }  </span> )
    }
}

// ****************************************************************************************************************
