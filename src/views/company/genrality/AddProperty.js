import React, { useState } from "react";
import { Layout } from "../Layout";
import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";
import { LoaderModal } from "./Modal";
import vector from "../../../config/data";

export function AddProperty()
{
    const {companyId} = useParams();
    const product = ProductApi("multipart/form-data");

    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedType, setSelectedType] = useState([]);    

    const [inputs, setInputs] = useState();
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState();
    const [isLoading1, setIsLoading1] = useState(false);

    const handleInputs = (event) => {
        const { name, value, files, type } = event.target;
        if( name === 'country' ) {
            const selectedRegionData = vector.listRegion.find(item => item.country === value);
            setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
        }
        if( name === 'type' ) {
            const selectedTypeData = vector.listOfFieldType.find(item => item.type === value); 
            setSelectedType(selectedTypeData ? selectedTypeData.subType : []);
        }
        if (type === 'file') {
            setInputs((prev) => ({ ...prev, [name]: files }));
        } else {
            setInputs((prev) => ({ ...prev, [name]: value }));
        }
    };

     const handleForm = async (event) => {
        event.preventDefault();
        setIsLoading1(true);
        try {
            const formData = new FormData();
            for (const key in inputs) {
                if (key === 'images') {
                    for(let i = 0; i < inputs.images.length; i++ ){
                        formData.append('images', inputs.images[i]);
                    }
                } else {
                    formData.append(key, inputs[key]);
                }
            }
            //-------------------------------------------------------------------------
            const res = await product.insert(formData, companyId);
            setIsLoading1(false);
            if(res.data.success){
                setStatus(1);
                setMessage("Votre propriété a bien été ajoutée");
            }
            else{
                setStatus(-1);
                setMessage(res.data.error);
            }
            //-------------------------------------------------------------------------
        } catch (err) {
            setStatus(-1);
            setIsLoading1(false);
            setMessage('Une erreur est survenue lors de la création. Veuillez réessayer.');
        }
    }; 

    return (
    
    <div>
        {
            isLoading1 ? ( <LoaderModal /> ) : null 
        }
        <Layout menu={1} companyId={companyId}> 
            <div className="container-fluid">
                <div className="row d-flex flex-column bg-white">   
                    <div className="col-md-12 py-4 px-4 border-bottom bg-gray-light"> 
                        <div className="d-flex justify-content-between gap-4 align-items-center"> 
                            <span className="h5 text-secondary mt-2 border px-4 py-2"> Ajouter nouvelle propriété </span>
                        </div>
                    </div>
                    <div className="col-md-12"> 
                        <div className="row p-4 scroll">
                            <form className="col-md-12" onSubmit={ handleForm } encType="multipart/form-data" >
                                <div className="row d-flex justify-content-between my-4">

                                    <div className="col-md-12  d-flex flex-column">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> L'adresse </span>
                                                    <input type="text" name="address" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Ajouter les images içi (max image 6) </span>
                                                    <input type="file" name="images" multiple accept="image/*" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Description </span>
                                                    <textarea className="form-control text-muted" name="description" rows={8} required onChange={handleInputs} />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Le titre </span>
                                                    <select className="form-control border w-100 p-2 text-muted text-muted rounded-2" name="title" required onChange={ handleInputs } >
                                                        <option value=""> Choisir un pays  </option>
                                                        <option value="à louer"> A louer </option>
                                                        <option value="à vendre"> A vendre </option>
                                                    </select>
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Le pays </span>
                                                    <select className="form-control border w-100 p-2 text-muted text-muted rounded-2" name="country" required onChange={ handleInputs } >
                                                        <option value=""> Choisir un pays  </option>
                                                        {
                                                            vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La région </span>
                                                    <select className="form-control border w-100 p-2 text-muted rounded-2" name="region" required onChange={ handleInputs } >
                                                        <option value=""> Choisir une région  </option>
                                                        {
                                                            selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La longitude </span>
                                                    <input type="text" name="longitude" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La latitude </span>
                                                    <input type="text" name="latitude" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 mt-4">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La catégorie  </span>
                                                    <select className="form-control border w-100 p-2 text-muted rounded-2" name="type" required onChange={ handleInputs } >
                                                        <option value=""> Choisir une catégorie  </option>
                                                        {
                                                            vector.propertyType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Le type  </span>
                                                    <select className="form-control border w-100 p-2 text-muted rounded-2" name="subtitle" required onChange={ handleInputs } >
                                                        <option value=""> Choisir un type  </option>
                                                        {
                                                            selectedType?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> La dimension en M2 </span>
                                                    <input type="number" name="surface" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                    <input type="number" name="price" className="form-control text-muted" required onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
                                                    <input type="number" name="guaranty" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
                                                    <input type="number" name="bedroom" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
                                                    <input type="number" name="livingroom" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
                                                    <input type="number" name="restroom" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
                                                    <input type="number" name="kitchen" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 px-4 mb-2" > 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
                                                    <input type="number" name="floor" className="form-control text-muted" onChange={ handleInputs } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* *************************************** */}
                                     <div className="col-lg-12 p-4"> <div className="border bg-three-clr py-2 mt-3"> </div> </div>
                                    {/* *************************************** */}
                                    <div className="col-lg-12 px-4 mb-2" > 
                                        <div className="row d-flex justify-content-between align-items-center">  
                                            {
                                                ( status === 1 ) ? 
                                                (  <div className=""> <div className="alert alert-success border py-2 px-4 rounded-1 mb-4"> { message } </div> </div> ) :
                                                ( status === -1 ) ?
                                                (  <div className=""> <div className="alert alert-danger border py-2 px-4 rounded-1 mb-4"> { message } </div> </div>) : null
                                            }
                                            {/* ************************************************************************ */}
                                            <div className="col-md-12 d-flex justify-content-end">
                                               <button type="submit" className="btn btn-main"> Enregistrer </button>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                                                    
                        </div>
                    </div> 
                </div>                    
            </div>
            {/* ************************************************************************ */} 
        </Layout>    

    </div>
    )
}


