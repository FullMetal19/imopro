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
          <div className="row"> 
            <TopBar  />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar page={2} />
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center bg-gray-light py-5 px-2"> 
            <div className="col-md-8 col-lg-5 d-flex flex-column"> 
                <div className="px-5 py-3 w-100 text-center text-secondary border bg-three-clr rounded-5 lead"> Liste des logements les plus proches de votre position </div>
            </div>
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <NearestHousesComponent lat={'14.12345'} lon={'16.111234'} /> 
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <div className="col-lg-12 py-5"> 
              {/* ------------------------------------------------ */}
              <div className="row justify-content-center p-3 bg-gray-light">
              <div className="col-lg-11"> 
              <div className="row">

                <div className="col-lg-11 d-flex align-items-center mb-3 border-bottom p-1 rounded-1 px-4"> 
                   <span className="text-secondary lead"> <i class="bi bi-funnel text-secondary"></i> Filtrer les logements </span>
                </div> 
                <div className="col-sm-4 mb-2"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={country} name="country" required onChange={ handleInputs } >
                    <option value=""> Choisir un pays  </option>
                    {
                      vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                    }
                  </select>
                </div>
                <div className="col-sm-4 mb-2"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={region} name="region" required onChange={ handleInputs } >
                    <option value=""> Choisir une région  </option>
                    {
                      selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                    }
                  </select>
                </div>
                <div className="col-sm-4 mb-3"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={houseType} name="houseType" onChange={(e) => setHouseType(e.target.value)} >
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
          {/* ******************************************** */}
          <div className="row py-5 px-2"> 
            { 
                isLoading ? (  <div className="row"> <HouseSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                filteredClasses?.map(( item , index ) => { return(
                    <div className="col-md-6 col-lg-4 mb-5" key={index}> 
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

        <div className="row"> 
          <Footer />
        </div>
                 
      </div>
    )
}


