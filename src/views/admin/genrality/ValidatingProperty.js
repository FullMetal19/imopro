import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { FilterForm } from "./Form";
import { Navigation } from "./Navigation";
import { TextReducer } from "../../../components/Component";

import { ProductApi } from "../../../services/product.api";


export function ValidatingProperty()
{
    const product = ProductApi();

    const [filter, setFilter] = useState(false);
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [houseType, setHouseType] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const fetchValidatingProperties = async () => {
        try {
            const res = await product.findAllByStatus(0);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["validatingProperties"], queryFn: fetchValidatingProperties });

    useEffect(() => {

        if (!Array.isArray(data)) return;
        let filtered = data;

        if (country) filtered = filtered.filter(item => item.country?.toLowerCase() === country.toLowerCase() );
        if (region) filtered = filtered.filter(item => item.region?.toLowerCase() === region.toLowerCase() );
        if (houseType) filtered = filtered.filter(item => item.subtype?.toLowerCase() === houseType.toLowerCase() );
        
        setFilteredData(filtered);

    }, [data, country, region, houseType]);  
    

    return (

         <Layout menu={1}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    {
                        filter ? ( <FilterForm country={country} region={region} houseType={houseType} setCountry={setCountry} setRegion={setRegion} setHouseType={setHouseType} filter={filter} /> ) : null
                    }
                    <div className={filter ? "col-md-9" : "col-md-12"}>
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-4"> 
                                    <span className="h5 text-muted mt-2"> Généralité </span>
                                    <button className="btn btn-sm btn-outline-main rounded-4 px-4" onClick={() => setFilter(!filter)}> { filter ? 'Cacher' : 'Filtre'} </button> 
                                </div>
                                <Navigation page={2} />
                            </div>
                            <div className="row px-2 py-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                                filteredData?.map(( item , index ) => { return(
                                    <div className="col-lg-4 col-sm-6 mb-4" key={index}> 
                                        <div className="d-flex flex-column border ps-3 rounded-2 mx-2 ">
                                            <img src={`${process.env.REACT_APP_PATH}/${item.media[0].path}`} alt="Logo" height={200} className="mb-3 rounded-2" />
                                            <div className="d-flex flex-column py-3 border-start border-top px-0"> 
                                                <div className="text-muted mb-2 px-3">
                                                    < TextReducer text={ item?.description } maxsize={70} />
                                                </div>
                                                <span className="text-muted mb-2 px-3 border-top border-bottom bg-light"> Adresse : { item?.address } </span>
                                                <div className="d-flex justify-content-between align-items-center px-3"> 
                                                    <div className="d-flex align-items-center">
                                                        <img src={'../../img/icons8-calendrier-96.png'} alt="Logo" width={20} height={20} className="me-1 hide" />
                                                        <span className="main-color" > { item?.price } F </span>
                                                    </div>
                                                    <a className="btn btn-sm btn-outline-main" href={ `/admin/configuration/${ item?.id }` } > Administrer </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    )
                                }))      
                            }  
                            {
                                error ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                            }
                            {
                                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3"> Aucune propriété n'a été enregistrée. </span> </div> ) : null
                            }                             

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>   

              
    )
}


