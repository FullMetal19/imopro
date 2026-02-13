import React, { useState } from "react";
import { Layout } from "../Layout";
import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";
import { LoaderModal } from "./Modal";
import vector from "../../../config/data";


// import MapPicker from "../../../components/MapPicker"; 
// import { Modal } from "react-bootstrap";



export function AddProperty()
{
    const {companyId} = useParams();
    const product = ProductApi("multipart/form-data");

    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedType, setSelectedType] = useState([]);    
    const [inputs, setInputs] = useState();
    const [previewUrls, setPreviewUrls] = useState([]); // Image previews
    // const [showMap, setShowMap] = useState(false);


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
            const previews = Array.from(files).map((file) => URL.createObjectURL(file) );
            setPreviewUrls(previews);
        } else {
            setInputs((prev) => ({ ...prev, [name]: value }));
        }
    };

     const handleForm = async (event) => {
        event.preventDefault();
        setIsLoading1(true);
        setStatus(0);

        if( !inputs?.latitude || !inputs?.longitude ){
            setIsLoading1(false);
            alert('Veuillez sélectionner la localisation de la propriété.');
            return;
        }

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
                setPreviewUrls([]); 
                setInputs({});
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



    // TO BE DELETE LATER

    const [errCoord, setErrCoord] = useState(false);
    const [ errMsg, setErrMsg ] = useState("");

    const getCoorData = () => {

      if (!navigator.geolocation) {
        setErrCoord(true);
        return;
       }

      navigator.geolocation.getCurrentPosition(
        (item) => {
          setInputs((prev) => ({
            ...prev,
            latitude: item.coords.latitude,
            longitude: item.coords.longitude,
          }));
        },
        (err) => { 
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setErrMsg("Autorisation de géolocalisation refusée. Veuillez autoriser l’accès à la géolocalisation dans votre navigateur et réessayer");
              break;
            case err.POSITION_UNAVAILABLE:
              setErrMsg("Position indisponible. Assurez-vous que la géolocalisation est activée et autorisée dans les paramètres de votre navigateur.");
              break;
            case err.TIMEOUT:
              setErrMsg("La demande de localisation a expiré. Veuillez autoriser à nouveau l’accès à la géolocalisation.");
              break;
            default:
              setErrMsg("Erreur de géolocalisation. Assurez-vous que la géolocalisation est activée et autorisée dans les paramètres de votre navigateur.");
          }
          setErrCoord(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };


    return (
    
    <div>
        {
            isLoading1 ? ( <LoaderModal /> ) : null 
        }
        <Layout menu={1} companyId={companyId}> 

            {/* Map Modal */}
            {/* <Modal show={showMap} onHide={() => setShowMap(false)} centered size="xl" >
              <Modal.Header closeButton>
                <Modal.Title>Choisir la localisation</Modal.Title>
              </Modal.Header>
                 <Modal.Body>
                <MapPicker
                  onSelect={(coords) => {
                    setInputs((prev) => ({ ...prev, latitude: coords.lat, longitude: coords.lng }));
                    setShowMap(false); // close modal after picking
                     }}
                   />
                </Modal.Body>
            </Modal> */}


            <div className="container-fluid bg-light">
                <div className="row d-flex flex-column">   
                    <div className="col-md-12 py-4 px-4 border-bottom bg-blue-light-clr"> 
                        <div className="d-flex justify-content-between gap-4 align-items-center"> 
                            <span className="h5 text-secondary mt-2 border px-4 py-2"> Ajouter nouvelle propriété </span>
                        </div>
                    </div>
                    <div className="col-md-12"> 
                        <div className="row p-4 scroll">
                            <form className="col-md-12" onSubmit={ handleForm } encType="multipart/form-data" >
                                <div className="row d-flex justify-content-center my-4">

                                    <div className="col-lg-10 d-flex flex-column">

                                        <div className="row d-flex align-item-center p-4 mb-4 bg-three-clr border-left-main">
                                          <span className="text-secondary lead py-1"> Formulaire de création d'une propriété </span>
                                        </div>

                                        <div className="row">
                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row"> 

                                              <div className="col-md-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Catégorie de propriété  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <select className="w-100 border input p-3 text-secondary rounded-2" name="type" required onChange={ handleInputs } >
                                                           <option value=""> Choisir une catégorie  </option>
                                                           {
                                                               vector.propertyType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                           }
                                                       </select>
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div> 
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Type de propriété  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <select className="w-100 border input p-3 text-secondary rounded-2" name="subtitle" required onChange={ handleInputs } >
                                                           <option value=""> Choisir un type  </option>
                                                           {
                                                               selectedType?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                           }
                                                       </select>
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Dimension [<span className=" px-2 text-danger"> en metre carré </span>]  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="surface" className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Status de la propriété </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="title" required onChange={ handleInputs } >
                                                            <option value=""> Choisir un status  </option>
                                                            <option value="à louer"> A louer </option>
                                                            <option value="à vendre"> A vendre </option>
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-12">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Ajouter les images de la propriété  [<span className=" px-2 text-danger"> max 6 images </span>] </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <input type="file" name="images" multiple accept="image/*" className="w-100 border input p-3 text-secondary rounded-2" required 
                                                           onChange={(e) => {
                                                             const files = Array.from(e.target.files);
                                                             if (files.length > 6) {
                                                               alert("Désolé, vous ne pouvez télécharger que 6 images au maximum.");
                                                               e.target.value = ""; 
                                                               return;
                                                            }
                                                             handleInputs(e); 
                                                           }} />
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                              { 
                                                previewUrls.length > 0 && (
                                                <div className="col-md-12">
                                                  <div className="d-flex flex-wrap mt-4 mb-2">
                                                    {previewUrls.map((url, i) => (
                                                      <img key={i} src={url} alt="preview" className="border mb-3"
                                                        style={{
                                                          width: "100px",
                                                          height: "100px",
                                                          objectFit: "cover",
                                                          borderRadius: "8px",
                                                          marginRight: "10px",
                                                        }}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                               )}
                                              <div className="col-md-12">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Description [ <span className=" px-2 text-danger"> * </span>  ] </span>
                                                    <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" rows={8} required onChange={handleInputs} />
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* -------------------------------------------------------------------------  */}

                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="price" className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le montant de la garantie (en Fcfa) </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="guaranty" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* -------------------------------------------------------------------------  */}

                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Pays </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="country" required onChange={ handleInputs } >
                                                            <option value=""> Choisir un pays  </option>
                                                            {
                                                                vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                            }
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Région </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="region" required onChange={ handleInputs } >
                                                            <option value=""> Choisir une région  </option>
                                                            {
                                                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                            }
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                               <div className="col-lg-8">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Adresse </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="text" name="address" className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div> 
                                              <div className="col-lg-4"> 
                                                <div className="d-flex flex-column mb-2">
                                                    <span className="text-muted fs-xs mb-1"> Localisation [ <span className=" px-2 text-danger"> * </span>  ]  </span>
                                                    {/* <button type="button" className="btn p-3 btn-outline-main mb-1" onClick={() => setShowMap(true)} > Géolocaliser la propriété </button> */}
                                                    <button type="button" className="btn p-3 btn-outline-main mb-1" onClick={ getCoorData } > Géolocaliser la propriété </button>
                                                </div>
                                              </div>
                                              <div className="col-lg-12"> 
                                                 {inputs?.latitude && inputs?.longitude && (
                                                    <div className="row">
                                                      <div className="col-lg-6" >
                                                        <div className="d-flex flex-column mb-2">  
                                                            <span className="text-muted fs-xs mb-1"> La longitude </span>
                                                            <input type="text" name="longitude" value={ inputs?.longitude } className="w-100 border input p-3 text-secondary rounded-2" />
                                                        </div>
                                                      </div>
                                                      <div className="col-lg-6" >
                                                        <div className="d-flex flex-column mb-2">  
                                                            <span className="text-muted fs-xs mb-1"> La latitude </span>
                                                            <input type="text" name="latitude" value={ inputs?.latitude } className="w-100 border input p-3 text-secondary rounded-2" />
                                                        </div>
                                                      </div>
                                                    </div>
                                                 )}
                                                 {
                                                  errCoord && (
                                                    <div className="alert alert-danger p-2"> { errMsg } </div>
                                                  )
                                                 }
                                              </div>

                                            </div>
                                          </div>

                                          {/* -------------------------------------------------------------------------  */}

                                           {
                                              inputs?.type?.toLowerCase() === "logement" && (

                                          <div className="col-md-12 mb-4 bg-white p-4 border border-primary rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="bedroom" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="livingroom" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="restroom" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="kitchen" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                 <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="floor" className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          )
                                          }  

                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row mb-4 border-bottom"> 
                                                {
                                                ( status === 1 ) ? 
                                                (  <div className="my-3"> <div className="alert alert-primary border py-2 px-4 rounded-1"> { message } </div> </div> ) :
                                                ( status === -1 ) ?
                                                (  <div className="my-3"> <div className="alert alert-danger border py-2 px-4 rounded-1"> { message } </div> </div>) : null
                                                }
                                            </div>
                                            <div className="row"> 
                                               <div> <button type="submit" className="btn btn-main"> Enregistrer </button> </div>
                                            </div>
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


