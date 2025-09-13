import React, {useState} from "react";
// import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyApi } from "../../services/company.api";
import { LoaderModal } from "../company/genrality/Modal";
import vector from "../../config/data";


export function NewCompany(){

    const company = CompanyApi("multipart/form-data");
    const uid = sessionStorage.getItem('uid');
        
    const [inputs, setInputs] = useState();
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState(0);
    const [isLoading1, setIsLoading1] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState([]);

    const handleInputs = (event) => {
        const { name, value, files, type } = event.target;
        if( name === 'country' ) {
            const selectedRegionData = vector.listRegion.find(item => item.country === value);
            setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
        }
        if (type === 'file') {
            setInputs((prev) => ({ ...prev, [name]: files[0] }));
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
                if (key === 'icon' || key === 'cniImage') {
                    if (inputs[key] instanceof File) {
                        formData.append(key, inputs[key]);
                    }
                } else {
                    formData.append(key, inputs[key]);
                }
            }
            //-------------------------------------------------------------------------
            const res = await company.insert(formData, uid);
            console.log(res)
            setIsLoading1(false);
            if(res.data.success){
                setStatus(1);
                setMessage("Votre entreprise immobilier a bien été ajoutée");
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
            {/* ************************************************************************ */}
            <Header designClass={'row shadow'} page={6} />
            {/* ************************************************************************ */}
            <div className="container-md py-5 bg-white"> 
                <div className="row mt-4 px-2 mb-5">
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 rounded-top-2 bg-white"> 
                        <div className="row d-flex align-item-center py-3 px-4 border mb-4 bg-three-clr">
                            <span className="text-muted text-gray py-1"> Formulaire de création d'entreprise immobilière </span>
                        </div>
                        <form className="" onSubmit={ handleForm } encType="multipart/form-data" >
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Nom de l'entreprise </span>
                                        <input type="text" name="name" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Le pays </span>
                                        <select className="form-control border w-100 p-2 text-muted text-muted rounded-2" name="country" required onChange={ handleInputs } >
                                            <option value=""> Choisir le pays  </option>
                                            {
                                                vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> La région </span>
                                        <select className="form-control border w-100 p-2 text-muted rounded-2" name="region" required onChange={ handleInputs } >
                                            <option value=""> Choisir la région  </option>
                                            {
                                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> L'adresse de l'entreprise </span>
                                        <input type="text" name="address" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-12">  
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Description </span>
                                        <textarea className="form-control text-muted" name="description" rows={6} onChange={handleInputs} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Lien siteweb </span>
                                        <input type="url" name="website" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Icone de l'entrprise </span>
                                        <input type="file" name="icon" className="form-control text-muted" accept="image/*" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Numéro de registre </span>
                                        <input type="text" name="registNumber" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Ninea </span>
                                        <input type="text" name="ninea" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                            </div>
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Nom du garant de l'entreprise </span>
                                        <input type="text" name="ownerName" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Le numéro de téléphone du garant de l'entreprise </span>
                                        <input type="number" name="phone" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Email du garant de l'entreprise </span>
                                        <input type="email" name="email" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Numéro de carte d'identité du garant </span>
                                        <input type="text" name="ownerCni" className="form-control text-muted" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-muted fs-xs mb-1"> Uploader l'image de face et de derière de la carte d'identité </span>
                                        <input type="file" name="cniImage" className="form-control text-muted" accept="image/*, application/pdf" required onChange={ handleInputs } />
                                    </div>
                                </div>
                            </div>
                            {
                                ( status === 1 ) ? 
                                (  <div className=""> <div className="alert alert-success border py-2 px-4 rounded-1 mb-4"> { message } </div> </div> ) :
                                ( status === -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-2 px-4 rounded-1 mb-4"> { message } </div> </div>) : null
                            }
                            {/* ************************************************************************ */}
                            <div className="row justify-content-end p-4 mb-4 border">
                                <div> <button type="submit" className="btn btn-main"> Soumettre </button> </div>
                            </div>

                        </form>
                    </div> 
                    {/* ************************************************************************ */} 
                </div> 
            </div> 
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


