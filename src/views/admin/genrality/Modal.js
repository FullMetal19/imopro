import { useState } from '"react";
import { ProductApi } from '"../../../services/product.api";

export function MessageModal({ method, message })
{
    return (

        <div className="modal-container">
            <div className="container pt-5">
                <div className="row d-flex justify-content-center mt-3 px-2">
                    <div className="col-lg-9 col-md-10 bg-three-clr p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between"> 
                            <span className="text-muted"> La raison de l'invalidité de la propriété </span>
                            <button className='btn btn-sm btn-white bold mb-2' onClick={ ()=>{ method ( false ) } } > X </button> 
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


export function Modal({ method, message, propertyId })
{
    const product = ProductApi();
    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const validation = async()=>{
        setStatus(0);
        setIsLoading(true);
        try{
            const res = await product.updateStatus(propertyId, {status : 1});
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    }

    return (

        <div className="modal-container">
            <div className="container pt-5">
                <div className="row d-flex justify-content-center mt-5 px-2">
                    <div className="col-lg-5 col-md-8 bg-three-clr p-4 d-flex flex-column">
                        <div className="text-end"> <button className='btn btn-sm btn-white bold mb-2' onClick={ ()=>{ method ( false ) } } > X </button> </div>
                        <div className="d-flex border-top border-bottom pt-4 pb-2 mb-2">
                            <p className="text-muted"> {message} </p>
                        </div>
                        {
                            isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                        }
                        {
                            ( status ==== 1 ) ? 
                            (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> Propriété validée avec succes </div> </div> ) :
                            ( status ==== -1 ) ?
                            (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                        }
                        {/* ************************************************************************ */}
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


export function UnvalidationForm({ method, propertyId })
{
    const product = ProductApi();
    
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    const handleForm = async ( event ) => {
        event.preventDefault();
        setStatus(0);
        setIsLoading(true);
        const data = {message : message}
        try{
            const res = await product.unvalidate(propertyId, data);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1); 
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    }

    return (

        <div className="modal-container">
            <div className="container pt-5">
                <div className="row d-flex justify-content-center mt-3 px-2">
                    <div className="col-lg-9 col-md-10 bg-white p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between"> 
                            <div className="text-white bg-main px-3 d-flex align-items-center rounded-1"> Etes vous sure d'invalider cette propriété </div>
                            <button className='btn btn-sm btn-white bold mb-2' onClick={ ()=>{ method ( false ) } } > X </button> 
                        </div>
                        <form className="d-flex flex-column mt-4" onSubmit={ handleForm } >
                            <div className="d-flex flex-column mb-4">  
                                <span className="text-muted fs-xs mb-1"> La raison de l'invalidation içi : </span>
                                <textarea className="form-control" name="description" rows={10} onChange={ e=>{ setMessage(e.target.value) } } />
                            </div>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                            }
                            {
                                ( status ==== 1 ) ? 
                                (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> Entreprise invalidée avec succes </div> </div> ) :
                                ( status ==== -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de l'invalidation. </div> </div>) : null
                            }
                            <div className="d-flex justify-content-between ">
                                <span className="btn btn-sm btn-outline-main" onClick={ ()=>{ method ( false ) } } > Annuler </span>
                                <button type="submit" className="btn btn-sm btn-outline-main" > Enregistrer </button>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}