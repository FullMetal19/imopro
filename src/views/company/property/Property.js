import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import { FilterForm } from "../genrality/Form";
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
                            <div className="row d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-4"> 
                                    <span className="h5 text-secondary mt-2"> Mensualité </span>
                                    <button className="btn btn-sm btn-outline-main rounded-4 text-secondary px-4" onClick={() => setFilter(!filter)}> { filter ? 'Cacher' : 'Filtre'} </button> 
                                </div>
                            </div>
                            <div className="row p-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                                filteredData?.map(( item , index ) => { return(
                                
                                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                      <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
                                        {/* Image principale */}
                                        <img src={ item?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "200px", objectFit: "cover" }} />
                                        {/* Galerie */}
                                        <div className="d-flex gap-3 p-3">
                                           {
                                               item?.media[1] ? ( <img src={ item?.media[1]?.path } className="rounded" alt="image-int-1" style={{ width: "80px", height: "60px", objectFit: "cover" }} /> ) : ( <span className="border rounded bg-light" style={{ width: "80px", height: "60px", objectFit: "cover" }}></span>  )
                                           }
                                           {
                                               item?.media[1] ? ( <img src={ item?.media[1]?.path } className="rounded" alt="image-int-2" style={{ width: "80px", height: "60px", objectFit: "cover" }} /> ) : ( <span className="border rounded bg-light" style={{ width: "80px", height: "60px", objectFit: "cover" }}></span>  )
                                           } 
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
                                            {
                                                ( item?.title === 'à louer' ) && ( <a className="btn btn-sm btn-outline-secondary" href={ `/mensualites/${companyId}/${ item?.id }` } > Mensualités </a> )
                                            }
                                            {
                                               ( item?.title === 'à vendre' ) && ( <span className="text-secondary px-2 py-1 border rounded-2 fs-xs"> Bien acheté </span>) 
                                            }  
                                        </div>
                                      </div> 
                                    </div>    
                                
                                    )
                                }))      
                            }  
                            {
                                error ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3"> Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                            }
                            {
                                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3" >  Aucune propriété n'a été enregistrée. </span> </div> ) : null
                            }                           

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        
    )
}


