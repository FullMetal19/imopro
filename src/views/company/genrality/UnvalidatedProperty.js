import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { FilterForm } from "./Form";
import { MessageModal, RemovingModal } from "./Modal";
import { Navigation } from "./Navigation";
import { TextReducer } from "../../../components/Component";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";


export function UnvalidatedProperty()
{
    const product = ProductApi();
    const { companyId } = useParams();

    const [filter, setFilter] = useState(false);
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [houseType, setHouseType] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const fetchHouses = async () => {
        try {
            const res = await product.findAllByStatusAndCompany(-1, companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allHouses"], queryFn: fetchHouses });

    useEffect(() => {

        if (!Array.isArray(data)) return;
        let filtered = data;

        if (country) filtered = filtered.filter(item => item.country?.toLowerCase() === country.toLowerCase() );
        if (region) filtered = filtered.filter(item => item.region?.toLowerCase() === region.toLowerCase() );
        if (houseType) filtered = filtered.filter(item => item.type?.toLowerCase() === houseType.toLowerCase() );
        
        setFilteredData(filtered);

    }, [data, country, region, houseType]);

    //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const [ propertyId , setPropertyId ] = useState(false);
     
    const setModal = ( pid ) => {
        setPropertyId(pid);
        setModalState(true);
    }
    const closeModal = ( arg ) => {  setModalState( arg ) } 

    //-------------------------------------------------------------------------  
    const [ modal1State , setModal1State] = useState(false);
    const [ msg , setMsg] = useState();
    const setForm1 = (msg) => {
        setMsg(msg);
        setModal1State(true);
    }
    const closeForm1 = ( arg ) => { setModal1State( arg ) } 

    return (

    <div className="w-100">
        {/* ************************************************************************ */}
        { modalState ? ( <RemovingModal method={ closeModal } propertyId={propertyId} refetch={refetch} message={"Voulez vous vraiment supprimer cette propriété."} /> ) : null }
        {/* ************************************************************************ */}
        { modal1State ? ( <MessageModal method={ closeForm1 } message={msg} /> ) : null }
        {/* ************************************************************************ */}
       <Layout menu={1} companyId={companyId}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    {
                        filter ? ( <FilterForm country={country} region={region} houseType={houseType} setCountry={setCountry} setRegion={setRegion} setHouseType={setHouseType} filter={filter} /> ) : null
                    }
                    <div className={filter ? "col-md-9" : "col-md-12"}>
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-4"> 
                                    <span className="h5 text-secondary mt-2"> Généralité </span>
                                    <button className="btn btn-sm border rounded-4 text-secondary px-4" onClick={() => setFilter(!filter)}> { filter ? 'Cacher' : 'Filtre'} </button> 
                                </div>
                                <Navigation page={3} companyId={companyId} />
                            </div>
                            <div className="row p-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                                filteredData?.map(( item , index ) => { return (
                                    <div className="col-lg-4 col-sm-6 mb-4" key={index}> 
                                        <div className="d-flex flex-column border ps-3 rounded-2 mx-2 w-100 bg-light">
                                             <img src={`${process.env.REACT_APP_PATH}/${item.media[0].path}`} alt="Logo" height={200} className="mb-3 rounded-2" />
                                            <div className="d-flex flex-column py-3 border-start border-top px-0 bg-white"> 
                                               <div className="text-muted mb-2 px-3">
                                                    < TextReducer text={ "Configuration genrality onfiguration genrality onfiguration genrality onfiguration genrality" } maxsize={70} />  
                                                </div>
                                                <span className="text-muted mb-2 px-3 border-top border-bottom bg-light"> Adresse : { item?.address } </span>
                                                <div className="d-flex justify-content-between align-items-center px-3"> 
                                                    <button className="btn btn-sm btn-outline-main" onClick={ ()=> setForm1(item?.message) } > Message </button>
                                                    <button className="btn btn-sm btn-main" onClick={ ()=> setModal(item.id) } > Supprimer </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    
                                    )
                                }))      
                            }  
                            {
                                error ? ( <div className="col-md-12 mt-3"> <div className="border alert alert-danger text-muted px-4 py-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
                            }
                            {
                                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted"> Aucune propriété n'a été enregistrée. </div> ) : null
                            }   

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    </div>      


    )
}


