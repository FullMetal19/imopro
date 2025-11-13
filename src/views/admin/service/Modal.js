import React, {useState} from "react";
import { ServiceApi } from '"../../../services/service.api";

export function Modal({ method, message, serviceId, serviceStatus, refetch })
{
    const service = ServiceApi();
    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const validation = async()=>{
        setStatus(0);
        setIsLoading(true);
        try{
            const res = await service.setStatus(serviceId);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
            refetch();
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);  
        }
    }

    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-lg-5 col-md-8 bg-three-clr p-4 d-flex flex-column">
                        <div className="text-end"> <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button> </div>
                        <div className="d-flex border-top border-bottom pt-4 pb-2 mb-2">
                            <p className="text-muted"> {message} </p>
                        </div>
                        {
                            isLoading ? ( <div className="d-flex justify-content-center mb-4"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div> ) : null 
                        }
                        {
                            ( status ==== 1 ) ? 
                            (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> { ( serviceStatus ==== 1 ) ? "Service désactivé avec succes" : "Utilisateur activé avec succes" }   </div> </div> ) :
                            ( status ==== -1 ) ?
                            (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                        }
                        {/* ************************************************************************************** */}
                        <div className="d-flex justify-content-between align-items-center px-3"> 
                            <button className="btn btn-sm btn-outline-main" onClick={ validation } > Oui </button>
                            <button className="btn btn-sm btn-main" onClick={ ()=>{ method ( false ) } }  > Non </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export function NewServiceModal({ method, refetch })
{
    const service = ServiceApi();

    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } );
    }
    
    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const res = await service.insert(inputs);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
            refetch();
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    } 
    

    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-lg-9 col-md-10 bg-white p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between"> 
                            <div className="text-muted border px-4 bg-three-clr d-flex align-items-center rounded-2"> Formulaire d'ajout de service  </div>
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button> 
                        </div>
                        <form className="d-flex flex-column mt-4" onSubmit={ handleForm }>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div> ) : null 
                            }
                            {
                                ( status ==== 1 ) ? 
                                (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> Service ajouté avec succes </div> </div> ) :
                                ( status ==== -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                            }
                            <div className="d-flex flex-column mb-2">  
                                <span className="text-muted fs-xs mb-1"> Titre du service </span>
                                <input type="text" name="title" className="form-control" required onChange={ handleInputs } />
                            </div>
                            <div className="d-flex flex-column mb-4">  
                                <span className="text-muted fs-xs mb-1"> Description du service </span>
                                <textarea className="form-control" name="description" rows={8} required onChange={ handleInputs }  />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-sm btn-outline-main" > Enregistrer </button>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function UpdatingServiceModal({ method, serviceId, title, desc, refetch })
{
    
    const service = ServiceApi();

    const [ inputs, setInputs ] = useState({ title : title, description : desc });
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } );
    }
    
    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const res = await service.update(serviceId, inputs);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
            refetch();
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    } 
    
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-lg-9 col-md-10 bg-white p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between"> 
                            <div className="text-muted border px-4 bg-three-clr d-flex align-items-center rounded-2"> Formulaire de modification de service  </div>
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        </div>
                        <form className="d-flex flex-column mt-4" onSubmit={ handleForm }>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div> ) : null 
                            }
                            {
                                ( status ==== 1 ) ? 
                                (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> Service modifié avec succes </div> </div> ) :
                                ( status ==== -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                            }
                            <div className="d-flex flex-column mb-2">  
                                <span className="text-muted fs-xs mb-1"> Titre du service </span>
                                <input type="text" name="title" value={ inputs.title } className="form-control" required onChange={ handleInputs } />
                            </div>
                            <div className="d-flex flex-column mb-4">  
                                <span className="text-muted fs-xs mb-1"> Description du service </span>
                                <textarea className="form-control" value={ inputs.description } name="description" rows={8} required onChange={ handleInputs }  />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-sm btn-outline-main" > Enregistrer </button>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}