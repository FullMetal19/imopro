import React, {useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { Header, NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyApi } from "../../services/company.api";
import { LoaderModal } from "../company/genrality/Modal";
import vector from "../../config/data";
import { useParams } from "react-router";


export function ModifyCompany(){

    const { companyId } = useParams()
    const company = CompanyApi("multipart/form-data");
            
    const fetchCompany = async () => {
        try {
            const res = await company.findOne(companyId);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }

    const { data } = useQuery({  queryKey: ["company"], queryFn: fetchCompany });

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

    useEffect(() => setInputs(data), [data]);


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
            const res = await company.update(formData, companyId);
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

        <div className="container-fluid bg-light">
            {
                isLoading1 ? ( <LoaderModal /> ) : null 
            }
            {/* ************************************************************************ */}
            <div className="row"> 
              <TopBar />
            </div> 
            <div className="row sticky-top"> 
              <NavigationBar />
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center"> 
              <div className="col-lg-9 py-5"> 
                <div className="row mt-4 px-2 mb-5">
                    {/* ************************************************************************ */}
                    <div className="col-lg-12 rounded-top-2"> 
                        <div className="row d-flex align-item-center py-3 px-4 mb-4 bg-gray-light border-secondary border-start border-5">
                            <span className="text-secondary lead py-1"> Formulaire de modification de l'entreprise  <span className="color-blue"> **  { data?.name || '' }  ** </span> </span>
                        </div>
                        <form className="" onSubmit={ handleForm } encType="multipart/form-data" >
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border bg-white ">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Nom de l'entreprise </span>
                                        <input type="text" name="name" value={ data?.name || '' } className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Le pays </span>
                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="country" value={ data?.country || '' } required onChange={ handleInputs } >
                                            <option value=""> Choisir le pays  </option>
                                            {
                                                vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-muted fs-xs mb-1"> La région </span>
                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="region" value={ data?.region || '' } required onChange={ handleInputs } >
                                            <option value=""> Choisir la région  </option>
                                            {
                                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> L'adresse de l'entreprise </span>
                                        <input type="text" name="address" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.name || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-12">  
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Description </span>
                                        <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" value={ data?.description || '' } rows={6} onChange={handleInputs} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Numéro de registre </span>
                                        <input type="text" name="registNumber" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.registNumber || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Ninea </span>
                                        <input type="text" name="ninea" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.ninea || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Lien siteweb </span>
                                        <input type="url" name="website" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.website || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                            </div>
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border bg-white ">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Nom du garant de l'entreprise </span>
                                        <input type="text" name="ownerName" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.ownerName || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Le numéro de téléphone du garant de l'entreprise </span>
                                        <input type="number" name="phone" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.phone || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Email du garant de l'entreprise </span>
                                        <input type="email" name="email" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.email || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Numéro de carte d'identité du garant </span>
                                        <input type="text" name="ownerCni" className="w-100 border input p-3 text-secondary rounded-2" value={ data?.ownerCni || '' } required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Uploader l'image de face et de derière de la carte d'identité [ <span className=" px-2 text-danger"> Format PDF </span>  ] </span>
                                        <input type="file" name="cniImage" className="w-100 border input p-3 text-secondary rounded-2 mb-3" accept="image/*, application/pdf" required onChange={ handleInputs } />
                                        <div className="d-flex justify-content-center align-items-center border">  
                                            <a href={ data?.cniImage } className="btn btn-outline-main" target="_blank" rel="noopener noreferrer"> Voir le CNI [<span className=" px-2 text-danger"> format pdf </span>] </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-3">  
                                        <span className="text-secondary fs-xs mb-1"> Icone de l'entrprise [ <span className=" px-2 text-danger"> Format Image </span>  ] </span>
                                        <input type="file" name="icon" className="w-100 border input p-3 text-secondary rounded-2 mb-3" accept="image/*" required onChange={ handleInputs } />
                                        <div className="d-flex justify-content-center align-items-center border">  
                                            <img src={ data?.icon } height={160} width={200} alt="Logo" className="" /> 
                                        </div>
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
                            <div className="row justify-content-end p-4 mb-4 border bg-white ">
                                <div> <button type="submit" className="btn btn-main"> Enregistrer <i className="bi bi-arrow-right ms-2"></i> </button> </div>
                            </div>

                        </form>
                    </div> 
                    {/* ************************************************************************ */} 
                </div> 
              </div> 
            </div> 
            {/* ************************************************************************ */}
            <div className="row"> 
                <Footer />
            </div> 
        </div>
    )
}


