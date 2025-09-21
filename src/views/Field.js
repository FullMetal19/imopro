import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "../components/Footer";
import { NearestFieldsComponent } from "../components/Component";
import { Header, NavigationBar, TopBar } from "../components/Header";
import { FieldSkeleton } from "../components/Skeleton";
import { FieldContainer } from "../components/Container";
import { ProductApi } from "../services/product.api";
import vector from "../config/data";


export function Field(){

    const product = ProductApi();
    const [filteredData, setFilteredData] = useState([]);

    const fetchFields = async () => {
        try {
            const res = await product.findAllFields();
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["allFields"], queryFn: fetchFields });

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
            
           setFilteredData(filtered);
    
    }, [data, country, region, houseType]);


    return (

        <div className="container-fluid bg-light">
          <div className="row"> 
            <TopBar />
          </div> 
          <div className="row sticky-top"> 
            <NavigationBar page={3} />
          </div>
          {/* *********************************************************************** */}
          <div className="row justify-content-center bg-three-clr border-bottom py-5 px-2"> 
            <div className="col-md-8 col-lg-5 d-flex flex-column"> 
              <div className="px-5 py-3 w-100 text-center text-secondary border bg-light rounded-5 lead"> Liste des terrains les plus proches de votre position </div>
            </div>
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <NearestFieldsComponent lat={'14.12345'} lon={'16.111234'} /> 
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <div className="col-lg-12 py-5"> 
              {/* ------------------------------------------------ */}
              <div className="row justify-content-center p-3 bg-blue-clr">
              <div className="col-lg-11"> 
              <div className="row">

                <div className="col-12 d-flex align-items-center mb-3 p-1 rounded-1 px-4"> 
                   <span className="text-white lead"> <i class="bi bi-funnel"></i> Filtrer les terrains </span>
                </div> 
                <div className="col-md-4 mb-2"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={country} name="country" required onChange={ handleInputs } >
                    <option value=""> Choisir un pays  </option>
                    {
                        vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                    }
                  </select>
                </div>
                <div className="col-md-4 mb-2"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={region} name="region" required onChange={ handleInputs } >
                    <option value=""> Choisir une région  </option>
                    {
                        selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                    }
                  </select>
                </div>
                <div className="col-md-4 mb-3"> 
                  <select className="form-control border w-100 p-3 text-secondary rounded-2" value={houseType} name="houseType" onChange={(e) => setHouseType(e.target.value)} >
                    <option value=""> Choisir un type de propriété  </option>
                    {
                      vector.listOfFieldType[1].subType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                    }
                  </select>
                </div>  

              </div>
              </div>
              </div>

            </div> 
          </div>
          {/* ******************************************** */}
          <div className="row py-5"> 
            { 
                isLoading ? (  <div className="row"> <FieldSkeleton value={ 3 } design={"col-md-6 col-lg-4 mb-5"} />  </div>  ) : (
                    filteredData?.map(( item , index ) => { return(
                    <div className="col-md-6 col-lg-4 mb-5" key={index}> 
                        <FieldContainer data={ item } />
                    </div>      
                    )
                }))      
            }
            {
                error ? ( <div className="col-md-12 mt-3"> <div className="bg-white border rounded-2 p-5 text-secondary lead" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
            }
            {
                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="bg-white border rounded-2 p-5 text-secondary lead"> La liste des terrains est vide. </div> ) : null
            }  
          </div>
          {/* ******************************************** */}
          <div className="row"> 
            <Footer />
          </div>
                 
        </div>
    )
}


