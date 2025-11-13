import { useState } from '"react";
import vector from "../../../config/data";

export function FilterForm({filter, country, region, houseType, setCountry, setRegion, setHouseType})
{
    const [selectedRegion, setSelectedRegion] = useState([]);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        if( name ==== 'country' ) {
            const selectedRegionData = vector.listRegion.find(item => item.country ==== value);
            setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
            setCountry(value);
        }
        if( name ==== 'region' ) {
            setRegion(value);
        }
        if( name ==== 'houseType' ) {
             setHouseType(value);
        }
    };

    return (

        <div className={`border-end pb-4 ${filter ? 'col-md-3' : 'col-md-12'} `}>
            
            <div className="row d-flex py-3 border-bottom mb-4 bg-three-clr"> 
                <span className="h5 px-4 text-muted mt-2"> Filtrer </span> 
            </div>

            <form className="d-flex flex-column px-3">
                <div className="d-flex flex-column mb-3">  
                    <span className="text-muted fs-xs mb-1"> Filter par pays </span>
                    <div className="d-flex flex-column mb-2">  
                        <span className="text-muted fs-xs mb-1"> Le pays </span>
                        <select className="form-control border w-100 p-2 text-muted font fs-xs rounded-2" value={country} name="country" required onChange={ handleInputs } >
                            <option value=""> Choisir un pays  </option>
                            {
                                vector.listCountry?.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                            }
                        </select>
                    </div>
                    <div className="d-flex flex-column mb-2">  
                        <span className="text-muted fs-xs mb-1"> La région </span>
                        <select className="form-control border w-100 p-2 text-muted font fs-xs rounded-2" value={region} name="region" required onChange={ handleInputs } >
                            <option value=""> Choisir une région  </option>
                                                        {
                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-column mb-3">  
                    <span className="text-muted fs-xs mb-1"> Filter par type de propriété </span>
                    <select className="border w-100 p-2 text-muted font fs-xs rounded-2" value={houseType} name="houseType" onChange={(e) => setHouseType(e.target.value)} >
                        <option value=""> Choisir un type de propriété  </option>
                        {
                            vector.propertyType?.map((item, index)=> ( <option value={item?.name} key={index}> {item.content} </option> ))
                        }
                    </select>
                </div>
                                 
            </form>
        </div>
    )
}