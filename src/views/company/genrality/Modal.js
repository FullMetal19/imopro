import { useState } from "react";
import { ProductApi } from "../../../services/product.api";

export function MessageModal({ method, message })
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="col-lg-9 col-md-10 bg-three-clr p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between"> 
                            <span className="text-muted"> La raison de l'invalidité de la propriété </span>
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button> 
                        </div>
                        <div className="d-flex border-top scroll-md border p-4 mb-2">
                            {message} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function RemovingModal({ method, message, propertyId, refetch })
{
    const product = ProductApi();
    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const removeFunction = async()=>{
        setStatus(0);
        setIsLoading(true);
        try{
            const res = await product.remove(propertyId);
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
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="col-lg-5 col-md-8 bg-three-clr p-4 d-flex flex-column">
                        <div className="text-end"> <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button> </div>
                        <div className="d-flex border-top border-bottom pt-4 pb-2 mb-2">
                            <p className="text-muted"> {message} </p>
                        </div>
                        {
                            isLoading ? ( <div className="d-flex justify-content-center mb-4"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div> ) : null 
                        }
                        {
                            ( status === 1 ) ? 
                            (  <div className=""> <div className="alert alert-primary border py-1 px-3 rounded-1 mb-4"> Propriété supprimée avec succes </div> </div> ) :
                            ( status === -1 ) ?
                            (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                        }
                        {/* ************************************************************************ */}
                        <div className="d-flex justify-content-between align-items-center px-3"> 
                            <button className="btn btn-sm btn-outline-main" onClick={ removeFunction } > Oui </button>
                            <button className="btn btn-sm btn-main" onClick={ ()=>{ method ( false ) } }  > Non </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function LoaderModal()
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="spinner-border text-white fs-1" role="status" aria-label="Chargement"></div>
                </div>
            </div>
        </div>
    )
}