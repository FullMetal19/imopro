import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { FilterForm } from "./Form";
import { Navigation } from "./Navigation";
import { TextReducer } from "../../../components/Component";

import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";


export function InprogressProperty()
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
            const res = await product.findAllByStatusAndCompany(0, companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allHouses"], queryFn: fetchHouses });

    useEffect(() => {

        if (!Array.isArray(data)) return;
        let filtered = data;

        if (country) filtered = filtered.filter(item => item.country?.toLowerCase() === country.toLowerCase() );
        if (region) filtered = filtered.filter(item => item.region?.toLowerCase() === region.toLowerCase() );
        if (houseType) filtered = filtered.filter(item => item.type?.toLowerCase() === houseType.toLowerCase() );
        
        setFilteredData(filtered);

    }, [data, country, region, houseType]);
    

    return (

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
                                <Navigation page={2} companyId={companyId} />
                            </div>
                            <div className="row p-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                                filteredData?.map(( item , index ) => { return (

                                    <div className="col-lg-4 col-sm-6 mb-4" key={index}>

<div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
                                          {/* Image principale */}
                                          <img src={ item?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "220px", objectFit: "cover" }} />
                                          {/* Galerie */}
                                          <div className="d-flex gap-3 p-3">
                                            <img src={ item?.media[1]?.path } className="rounded" alt="Intérieur 1" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
                                            <img src={ item?.media[2]?.path } className="rounded" alt="Intérieur 2" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
                                          </div>
                                          {/* Contenu */}
                                          <div className="px-3 pb-3 pt-1">
                                            <span className="lead bg-gray-light border text-secondary px-3 py-1 rounded-4">
                                             { item?.price +  ' Fcfa ' } { ( item?.title === "à louer" ) && " / mois" } 
                                            </span>
                                          </div>
                                          <div className="border-top border-bottom py-2 px-3">
                                            <h5 className="card-title text-secondary"> { item?.subtitle + ' ' + item?.title } </h5>
                                            <p className="text-secondary mb-2"> { item?.address } </p>
                                          </div>
                                          {/* Boutons */}
                                          <div className="d-flex p-3">
                                              <a className="btn btn-sm btn-outline-main" href={ `/configuration/${companyId}/${ item?.id }`} > Configuration </a>
                                          </div>
                                        </div> 

                                        {/* <div className="d-flex flex-column border ps-3 rounded-2 mx-2 w-100">
                                            <img src={`${process.env.REACT_APP_PATH}/${item?.media[0].path}`} alt="Logo" height={200} className="mb-3 rounded-2" />
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
                                                    <a className="btn btn-sm btn-outline-main" href={ `/configuration/${companyId}/${ item?.id }`} > Configuration </a>
                                                </div>
                                            </div>
                                        </div> */}

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

              
    )
}


