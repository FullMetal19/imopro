import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import { LoaderModal, RemovingModal } from "./Modal";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";
import vector from "../../../config/data";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function Configuration()
{
    const product = ProductApi();
    let { companyId, propertyId } = useParams();

    const fetchProperty = async (id) => { 
        try {
            const res = await product.findOne(id);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, refetch } = useQuery({  queryKey: ["property", propertyId], queryFn: () => fetchProperty(propertyId),  enabled: !!propertyId });

    // **************************************************************

    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedType, setSelectedType] = useState([]); 

    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        if( name === 'country' ) {
            const selectedRegionData = vector.listRegion.find(item => item.country === value);
            setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
        }
        if( name === 'type' ) {
            const selectedTypeData = vector.listOfFieldType.find(item => item.type === value); 
            setSelectedType(selectedTypeData ? selectedTypeData.subType : []);
        }
        setInputs( { ...inputs, [name] : value   } );
    }

    // ************************************************************************************
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState();
    const [isLoading1, setIsLoading1] = useState(false);

    useEffect(() => setInputs(data), [data]);

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading1(true);

        try {
            const res = await product.update(propertyId, inputs);
            setIsLoading1(false);
            if(res.data.success){
                setStatus(1);
                setMessage("Votre propriété a bien été modifiée");
            }
            else{
                setStatus(-1);
                setMessage(res.data.error);
            }
        } catch (err) {
            setStatus(-1);
            setIsLoading1(false);
            setMessage('Une erreur est survenue lors de la création. Veuillez réessayer.');
        }
    } 

    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const setModal = () => setModalState(true);
    const closeModal = ( arg ) => setModalState( arg )  

        
    return (

    <div className="">
        {
            isLoading1 ? ( <LoaderModal /> ) : null 
        }
        {/* ************************************************************************ */}
        { modalState ? ( <RemovingModal method={ closeModal } propertyId={propertyId} refetch={refetch} message={"Voulez vous vraiment supprimer cette propriété."} /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={1} companyId={companyId}> 
            <div className="container-fluid">
                <div className="row d-flex flex-column bg-white">   
                    <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom"> 
                        <div className="d-flex justify-content-between gap-4 align-items-center mb-4"> 
                            <span className="h5 text-secondary mt-2 border px-4 py-2"> Configuration </span>
                            <button className="btn btn-sm btn-main" onClick={ setModal } > Supprimer </button>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row p-4 scroll">

                            <form className="col-md-12" onSubmit={ handleForm } >
                                <div className="row d-flex justify-content-between my-4">
                                    <div className="col-md-6 d-flex flex-column">
                                        <div className="d-flex flex-column mb-4">  
                                            <span className="text-muted fs-xs mb-1"> L'adresse </span>
                                            <input type="text" name="address" value={ inputs?.address  || "" } className="form-control text-muted" required onChange={ handleInputs } />
                                        </div> 
                                        { 
                                            isLoading ? ( <Skeleton height={500} /> ) : (
                                            <div className="slider-container mb-4">
                                                <Slider {...settings}> 
                                                    { 
                                                        data?.media.map( (item , index) => { return (
                                                            <div className="d-flex" key={index} > <img src={`${process.env.REACT_APP_PATH}/${item.path}`} alt="Logo" height={400} className="img-fluid" />  </div>
                                                        )}) 
                                                    }    
                                                </Slider>
                                            </div>  ) 
                                        } 
                                    </div>
                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 px-4 d-flex flex-column">
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> Le pays </span>
                                            <select className="form-control border w-100 p-2 text-muted rounded-2" name="country" value={inputs?.country || ""} required onChange={ handleInputs } >
                                                <option value=""> Choisir un pays  </option>
                                                {
                                                    vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La région </span>
                                            <select className="form-control border w-100 p-2 text-muted rounded-2" name="region" value={inputs?.region || ""} required onChange={ handleInputs } >
                                                <option value=""> Choisir une région  </option>
                                                {
                                                    selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> Description </span>
                                            <textarea className="form-control text-muted" value={inputs?.description || ""} name="description" rows={8} onChange={handleInputs} />
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La longitude </span>
                                            <input type="text" name="longitude" value={inputs?.longitude || ""} className="form-control text-muted" required onChange={ handleInputs } />
                                        </div>
                                        <div className="d-flex flex-column mb-2">  
                                            <span className="text-muted fs-xs mb-1"> La latitude </span>
                                            <input type="text" name="latitude" value={inputs?.latitude || ""} className="form-control text-muted" required onChange={ handleInputs } />
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La catégorie  </span>
                                                    <select className="form-control border w-100 p-2 text-muted rounded-2" name="type" value={ inputs?.type || "" } required onChange={ handleInputs } >
                                                        <option value=""> Choisir une catégorie  </option>
                                                        {
                                                            vector.propertyType.map((item, index)=> ( <option value={item.name || ""} key={index}> {item.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Le type  </span>
                                                    <select className="form-control border w-100 p-2 text-muted rounded-2" name="subtitle" value={ inputs?.subtitle || "" } required onChange={ handleInputs } >
                                                        <option value=""> Choisir un type  </option>
                                                        {
                                                            selectedType?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> La dimension en M2 </span>
                                                    <input type="text" name="surface" value={inputs?.surface || ""} className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                    <input type="text" name="price" value={inputs?.price || ""} className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
                                                    <input type="text" name="guaranty" value={inputs?.guaranty || ""} className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
                                                    <input type="number" name="bedRoom" value={inputs?.bedroom || ""} className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
                                                    <input type="number" name="livingRoom" value={inputs?.livingroom || ""} className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
                                                    <input type="number" name="restroom" value={inputs?.restroom || ""} className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
                                                    <input type="number" name="kitchen" value={inputs?.kitchen || ""} className="form-control" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
                                                    <input type="number" name="floor" value={inputs?.floor || ""} className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 px-4 mb-2" > 
                                        <div className="row d-flex justify-content-between align-items-center">  
                                            {
                                                ( status === 1 ) ? 
                                                (  <div className=""> <div className="alert alert-success border py-2 px-4 rounded-1 mb-4"> { message } </div> </div> ) :
                                                ( status === -1 ) ?
                                                (  <div className=""> <div className="alert alert-danger border py-2 px-4 rounded-1 mb-4"> { message } </div> </div>) : null
                                            }
                                            {/* ************************************************************************ */}
                                            <div className="col-md-12 d-flex justify-content-end">
                                               <button type="submit" className="btn btn-main"> Enregistrer </button>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                                                    
                        </div>
                    </div> 
                </div>                    
            </div>
            {/* ************************************************************************ */} 
        </Layout>    
    </div>

    )
}


