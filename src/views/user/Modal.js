import { useState } from "react";
import { UserApi } from "../../services/user.api";



export function MessageModal({ method, message })
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="col-lg-9 col-md-10 bg-three-clr p-4 d-flex flex-column">
                        <div className="d-flex"> 
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

// ************************************************************************************************************
export function MonthPayDetailModal({ method, data })
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center vh-100 px-3">
                    <div className="col-lg-6 col-md-8 bg-white rounded-3 p-4 d-flex flex-column">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        <div className="d-flex flex-column border-top border-bottom pt-4 pb-2 mb-2">
                            <div className="rounded-1 bg-blue-light-clr text-secondary p-2 mb-3"> Détail du payment </div>
                            <div className="rounded-1 border bg-light text-secondary p-2 mb-2"> Opérateur : { data?.operator } </div>
                            <div className="rounded-1 border bg-light text-secondary p-2 mb-2"> Compte débité : { data?.senderAccount }  </div>
                            <div className="rounded-1 border bg-light text-secondary p-2 mb-2"> Montant débité : { data?.amount } Fcfa  </div>
                            <div className="rounded-1 border bg-light text-secondary p-2 mb-2"> Mois payé : { data?.month } </div>
                            <div className="rounded-1 border bg-light text-secondary p-2 mb-2"> Date : { data?.createdAt }  </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



// ************************************************************************************************************
export function PaymentFormModal({ method })
{
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const user = UserApi();
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }
      
    const handleForm = async ( event ) => {
        event.preventDefault();
        console.log(inputs);
        setStatus(0);
        setIsLoading(true);  
        try {
            const res = await user.insert(inputs);
            setIsLoading(false);
            (res.data.success) ? setStatus(1) : setStatus(-1);
        } catch (err) { 
            setIsLoading(false);
            setStatus(-1); 
        }
    } 
    

    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center vh-100 px-3">
                    <div className="col-lg-8 col-md-10 bg-white p-4 d-flex flex-column">
                        <div className="text-end"> 
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        </div>
                        <form className="border-top pt-4 pb-2 px-3 mb-2" onSubmit={ handleForm }>
                            <div className="row" > 
                                {
                                    isLoading ? ( <div className="col-md-12 mb-4 d-flex justify-content-center"> <img src={'../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                                }
                                {
                                    ( status === 1 ) ? 
                                    (  <div className="col-md-12 mb-4"> <div className=""> Payement effectué avec succes </div> </div> ) :
                                    ( status === -1 ) ?
                                    (  <div className="col-md-12 mb-4"> <div className=""> Une erreur est survenue lors de l'opération. </div> </div>) : null
                                }
                                <div className="col-md-12 mb-3" > 
                                    <div className="rounded-1 border-blue color-blue p-2 mb-3"> Formulaire de paiement </div>
                                </div> 
                                <div className="col-md-6 mb-2" > 
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Le compte à débiter </span>
                                        <input type="number" name="account" className="form-control" placeholder="77000000" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2" > 
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Le mois à payer </span>
                                        <input type="month" name="month" className="form-control" required onChange={ handleInputs } />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2" > 
                                    <div className="d-flex flex-column">  
                                        <span className="text-muted fs-xs mb-1"> Le montant à débiter </span>
                                        <div className="input-group mb-3">
                                            <input type="text" name="amount" className="form-control" required onChange={ handleInputs } />
                                            <div className="input-group-append">  <span className="input-group-text" > Fcfa </span>  </div>
                                        </div> 
                                    </div>
                                </div> 
                                <div className="col-md-12 mb-2" > <span className="text-center fs-xs color-dark"> L'opérateur mobile </span> </div>  
                                <div className="col-md-12 mb-2 d-flex gap-5" > 
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="source" value={"wave"} id="flexRadioDefault1" onChange={ handleInputs } />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1"> wave </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="source" value={"orange money"} id="flexRadioDefault2" onChange={ handleInputs } />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2"> Orange money </label>
                                    </div>
                                </div>
                                <div className="col-md-12 my-2" > 
                                    <button type="submit" className="btn btn-main px-4"> Envoyez </button> 
                                </div>

                            </div> 
                        </form>
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
                <div className="row d-flex justify-content-center vh-100 px-3">
                    <div className="col-lg-2 bg-white mt-5 p-4 d-flex flex-column">
                        <div className="col-md-12 d-flex justify-content-center p-4"> 
                            <img src={'../../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> 
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}