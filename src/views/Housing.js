import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "../components/Footer";
import { NearestHousesComponent} from "../components/Component";
import { NavigationBar, TopBar } from "../components/Header";
import { HouseSkeleton } from "../components/Skeleton";
import { HouseContainer } from "../components/Container";
import { ProductApi } from "../services/product.api";
import vector from "../config/data";


export function Housing(){

    const product = ProductApi(); 
    const [filteredClasses, setFilteredClasses] = useState([]);

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

          <title> Logements | Diwane-plus </title>
          <meta name="author" content="Diwaneplus" />
          <meta name="keywords" content="entreprise immobilier, immobilier au Sénégal, Immobilier en Afrique, vente et location de maisons, vente et location de terrains, vente et location de biens immobiliers" />
          <meta name="description" content="Parcourez notre sélection de logements à vendre et à louer : appartements, maisons, studios et villas. Chaque annonce contient des informations complètes, des photos de qualité et un accompagnement professionnel pour vous aider à trouver le logement parfait selon votre budget et vos besoins." />
          <link rel="icon" type="image/png" href="../favicon.png" />

          <div className="row"> 
            <TopBar  />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar page={2} />
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center"> 
            <div className="col-md-12 bg-img"> 
              <div className="row justify-content-center align-items-center over-bg-img"> 
                <div className="col-md-11"> 
                  <div className="navbar-brand d-flex align-items-center">
                    <span className="text-secondary fs-3"> <i className="bi bi-grid me-1"></i> </span>
                    <span className="text-secondary fs-3"> Logements </span>
                  </div>
               </div>
              </div>
            </div>
            <div className="col-md-12 p-4 border"> 
              <div className="row justify-content-center"> 
                <div className="col-md-11"> 
                  <span className="text-secondary fs-5"> 
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Logements proches de votre position 
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* ******************************************** */}
          <div className="row justify-content-center"> 
            <NearestHousesComponent /> 
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <div className="col-lg-12 py-5"> 
              <div className="row">
                  {/* <div className="col-4 bg-white py-1"> </div> */}
                  <div className="col-9 bg-secondary py-1"> </div>
                  <div className="col-3 bg-white py-1"> </div>
              </div>
              {/* ------------------------------------------------ */}
              <div className="row justify-content-center px-3 pt-2 bg-grayLight">
              <div className="col-lg-11"> 
              <div className="row">

                <div className="col-md-11 mb-5"> 
                  <span className="text-secondary fs-5 bg-secondary text-light px-4 py-3"> 
                    <span className="border-end pe-3 me-3 py-3 border-light bg-secondary text-light"> 
                      <i className="bi bi-house me-2"></i> 
                    </span>
                    Catalogue Logements 
                  </span>
                </div>

                <div className="col-lg-12 flex-column mt-4 mb-5"> 

                  <div className="mb-2 ps-4"> 
                    <span className="text-secondary small bg-white rounded-top-3 py-3 px-4"> 
                      <i className="bi bi-funnel text-secondary"></i> Filtrer les logements 
                    </span>
                  </div>

                  <div className="bg-white rounded-3 shadow-sm border-0 p-4"> 

                    <div className="row mt-2"> 
                      <div className="col-sm-4 mb-2"> 
                        <select className="border w-100 p-3 text-secondary rounded-2" value={country} name="country" required onChange={ handleInputs } >
                          <option value=""> Choisir un pays  </option>
                          {
                            vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                          }
                        </select>
                      </div>
                      <div className="col-sm-4 mb-2"> 
                        <select className="border w-100 p-3 text-secondary rounded-2" value={region} name="region" required onChange={ handleInputs } >
                          <option value=""> Choisir une région  </option>
                          {
                            selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                          }
                        </select>
                      </div>
                      <div className="col-sm-4 mb-2"> 
                        <select className="border w-100 p-3 text-secondary rounded-2" value={houseType} name="houseType" onChange={(e) => setHouseType(e.target.value)} >
                          <option value=""> Choisir un type de propriété  </option>
                          {
                            vector.listOfFieldType[0].subType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
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


