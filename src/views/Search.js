import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "../components/Footer";
import { NavigationBar, TopBar } from "../components/Header";
import { HouseSkeleton } from "../components/Skeleton";
import { HouseContainer } from "../components/Container";
import { ProductApi } from "../services/product.api";
import vector from "../config/data";
import { useParams } from "react-router";


export function Search(){

    const product = ProductApi(); 
    const [filteredClasses, setFilteredClasses] = useState([]);

    const {type} = useParams();

    const fetchHouses = async () => {
        try {
            const res = await product.findAllHouses();
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allHouses"], queryFn: fetchHouses });

   
    // ****************************************************************************
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [houseType, setHouseType] = useState();

    const [selectedRegion, setSelectedRegion] = useState([]);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        if( name === 'country' ) {
            const selectedRegionData = vector.listRegion.find(item => item.country === value);
            setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
            setCountry(value);
        }
        if( name === 'region' ) {
            setRegion(value);
        }
        if( name === 'houseType' ) {
             setHouseType(value);
        }
    };


    useEffect(() => {

        if (!Array.isArray(data)) return;
        let filtered = data;

        if (country) filtered = filtered.filter(item => item.country?.toLowerCase() === country.toLowerCase() );
        if (region) filtered = filtered.filter(item => item.region?.toLowerCase() === region.toLowerCase() );
        if (houseType) filtered = filtered.filter(item => item.subtitle?.toLowerCase() === houseType.toLowerCase() );
        
       setFilteredClasses(filtered);

    }, [data, country, region, houseType]);


    return (

        <div className="container-fluid bg-light">

          <div className="row"> 
            <TopBar  />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar />
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center mb-5"> 
            <div className="col-md-12 bg-img2 mb-4"> 
              <div className="row justify-content-center align-items-center over-bg-img2 p-3"> 
                <div className="col-md-11"> 

                  <div className="row justify-content-between align-items-center"> 
                    <div className="col-lg-4 col-md-10"> 
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-light fs-3"> <i className="bi bi-grid me-1"></i> </span>
                        <span className="text-light fs-3"> { type.charAt(0).toUpperCase() +  type.slice(1)} </span>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-10"> 

                        <div className="row pt-4 pb-3 px-4 bg-whit-transp rounded-3" > 
                            <div className="col-sm-6 mb-2"> 
                              <select className="border w-100 p-3 text-secondary rounded-2 bg-white-transp" value={country} name="country" required onChange={ handleInputs } >
                                <option value=""> Choisir un pays  </option>
                                {
                                  vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                }
                              </select>
                            </div>
                            <div className="col-sm-6 mb-2"> 
                              <select className="border w-100 p-3 text-secondary rounded-2 bg-white-transp" value={region} name="region" required onChange={ handleInputs } >
                                <option value=""> Choisir une région  </option>
                                {
                                  selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                }
                              </select>
                            </div>
                        </div> 

                    </div>
                  </div>

               </div>
              </div>
            </div>
          </div>
          
          {/* ******************************************** */}
          <div className="row justify-content-center py-2 px-1">
          <div className="col-lg-11"> 
          <div className="row pb-5"> 
            { 
                isLoading ? (  <div className="row"> <HouseSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                filteredClasses?.map(( item , index ) => { return(
                    <div className="col-md-6 col-lg-4 mb-2" key={index}> 
                        <HouseContainer data={ item } />
                    </div>      
                    )
                }))      
                                }
            {
                error ? ( <div className="col-md-12"> <div className="bg-white border rounded-2 p-5 text-secondary lead" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
            }
            {
                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="bg-white border rounded-2 p-5 text-secondary lead"> La liste des logements est vide. </div> ) : null
            }  
          </div>
          </div>
          </div>

        <div className="row"> 
          <Footer />
        </div>
                 
      </div>
    )
}


