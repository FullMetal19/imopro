import React, {useState} from "react";
import { NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyApi } from "../../services/company.api";
import { LoaderModal } from "../company/genrality/Modal";
import vector from "../../config/data";


export function NewCompany(){

    const company = CompanyApi("multipart/form-data");
        
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
        if( name === 'cniImage' ) {
            const file = e.target.files[0];
            if (file && file.type !== "application/pdf") {
              alert("Veuillez télécharger un fichier PDF valide.");
              e.target.value = "";
              return;
            }
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
            const res = await company.insert(formData);
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

        <div className="container-fluid bg-light">
            {
                isLoading1 ? ( <LoaderModal /> ) : null 
            }
            {/* ************************************************************************ */}
            <div className="row"> 
              <TopBar  />
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
                        <div className="row d-flex align-item-center p-4 mb-4 bg-three-clr border-left-main">
                            <span className="text-secondary lead py-1"> Formulaire de création d'entreprise immobilière </span>
                        </div>
                        <form className="" onSubmit={ handleForm } encType="multipart/form-data" >
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border bg-white rounded-3">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Nom de l'entreprise </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="name"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Le pays </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <select className="border w-100 p-3 text-secondary rounded-2" name="country" required onChange={ handleInputs } >
                                            <option value=""> Choisir le pays  </option>
                                            {
                                                vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                            }
                                          </select>
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> La région </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <select className="border w-100 p-3 text-secondary rounded-2" name="region" required onChange={ handleInputs } >
                                            <option value=""> Choisir la région  </option>
                                            {
                                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                            }
                                          </select>
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> L'adresse de l'entreprise </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="address"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">  
                                    <div className="d-flex flex-column mb-4">  
                                        <span className="d-flex text-secondary fs-xs mb-1"> Description [ <span className=" px-2 text-danger"> * </span>  ] </span>
                                        <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" required rows={6} onChange={handleInputs} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Lien siteweb </span>
                                        <input type="url" name="website" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Numéro de registre </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="registNumber"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Ninea </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="ninea"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ************************************************************************ */}
                            <div className="row px-4 py-5 mb-4 border bg-white rounded-3">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Nom du garant de l'entreprise </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="ownerName"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Le numéro de téléphone du garant de l'entreprise </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="number" name="phone" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Email du garant de l'entreprise </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="email" name="email" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Numéro de carte d'identité du garant </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="text" name="ownerCni"  className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Uploader l'image de face et de derière de la carte d'identité [ <span className=" px-2 text-danger"> Format PDF </span>  ] </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="file" name="cniImage" className="w-100 border input p-3 text-secondary rounded-2" accept="application/pdf" required onChange={ handleInputs } />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column mb-2">  
                                        <span className="text-secondary fs-xs mb-1"> Icone de l'entrprise [ <span className=" px-2 text-danger"> Format Image </span>  ] </span>
                                        <div className="d-flex gap-1 mb-3" >
                                          <input type="file" name="icon" className="w-100 border input p-3 text-secondary rounded-2" accept="image/*" required onChange={ handleInputs } />
                                          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                        </div>   
                                    </div>
                                </div>
                            </div>
                            {
                                ( status === 1 ) ? 
                                (  <div className=""> <div className="alert alert-primary border py-2 px-4 rounded-1 mb-4"> { message } </div> </div> ) :
                                ( status === -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-2 px-4 rounded-1 mb-4"> { message } </div> </div>) : null
                            }
                            {/* ************************************************************************ */}
                            <div className="row justify-content-end p-4 mb-4 border bg-white rounded-3">
                                <div> <button type="submit" className="btn btn-main"> Soumettre <i className="bi bi-arrow-right ms-2"></i> </button> </div>
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


