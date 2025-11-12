import { useState } from "react";
import { UserApi } from "../../../services/user.api";

export function Modal({ method, message, uid, state })
{
    const user = UserApi();
    const adminId = sessionStorage.getItem('uid');
    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const validation = async()=>{
        setStatus(0);
        setIsLoading(true);
        try{
            const res = await user.setStatus(uid, adminId);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
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
                            ( status === 1 ) ? 
                            (  <div className=""> <div className="alert alert-primary border py-1 px-3 rounded-1 mb-4"> { ( state === 1 || state === 2 ) ? "Utilisateur bloqué avec succes" : "Utilisateur débloqué avec succes" }   </div> </div> ) :
                            ( status === -1 ) ?
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

