import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { FilterForm } from "../genrality/Form";
import { TextReducer } from "../../../components/Component";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";


export function Property()
{
    const product = ProductApi();
    const { companyId } = useParams();

    const [filter, setFilter] = useState(false);
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [houseType, setHouseType] = useState();
    const [filteredData, setFilteredData] = useState([]);

    const fetchAllBooked = async () => {
        try {
            const res = await product.findAllBooked(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allBooked"], queryFn: fetchAllBooked });

    useEffect(() => {

        if (!Array.isArray(data)) return;
        let filtered = data;

        if (country) filtered = filtered.filter(item => item.country?.toLowerCase() === country.toLowerCase() );
        if (region) filtered = filtered.filter(item => item.region?.toLowerCase() === region.toLowerCase() );
        if (houseType) filtered = filtered.filter(item => item.type?.toLowerCase() === houseType.toLowerCase() );
        
        setFilteredData(filtered);

    }, [data, country, region, houseType]);

    return (

        <Layout menu={3} companyId={companyId}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    {
                        filter ? ( <FilterForm country={country} region={region} houseType={houseType} setCountry={setCountry} setRegion={setRegion} setHouseType={setHouseType} filter={filter} /> ) : null
                    }
                    <div className={filter ? "col-md-9" : "col-md-12"}>
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-4"> 
                                    <span className="h5 text-muted mt-2"> Mensualité </span>
                                    <button className="btn btn-sm border rounded-4 text-muted px-4" onClick={() => setFilter(!filter)}> { filter ? 'Cacher' : 'Filtre'} </button> 
                                </div>
                            </div>
                            <div className="row p-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                                filteredData?.map(( item , index ) => { return(
                                
                                    <div className="col-lg-6 px-2 mb-4" key={index}> 
                                        <div className="row d-flex border rounded-2 mx-2 bg-white"> 
                                            <div className="py-4 col-lg-4 col-sm-5">
                                                <div className="d-flex justify-content-center">
                                                    <img src={`${process.env.REACT_APP_PATH}/${item.media[0].path}`} alt="Logo" className="rounded-2 img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-sm-7 d-flex flex-column py-4 border-start px-0"> 
                                                <span className="text-muted mb-2 px-3">  < TextReducer text={ item?.description } maxsize={70} />  </span>
                                                <span className="text-muted mb-2 px-3 border-top border-bottom bg-light"> Adresse : { item?.address } </span>
                                                <div className="d-flex justify-content-between align-items-center px-3"> 
                                                    <div className="d-flex align-items-center">
                                                        <img src={'../../img/icons8-calendrier-96.png'} alt="Logo" width={20} height={20} className="me-1 hide" />
                                                        <span className="main-color" > { item?.price } F </span>
                                                    </div>
                                                    <a className="btn btn-sm btn-outline-main" href={ `/mensualites/${companyId}/${ item?.id }` } > Mensualités </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                
                                    )
                                }))      
                            }  
                            {
                                error ? ( <div className="col-md-12"> <span className="border text-muted px-4 py-2 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                            }
                            {
                                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex text-muted"> Aucune propriété n'a été enregistrée. </div> ) : null
                            }                           

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>


        
    )
}


