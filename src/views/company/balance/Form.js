import React, { useState } from "react";
import { useParams } from "react-router";
import { PaymentApi } from "../../../services/payment.api";

export function WithdrawForm({refetch})
{
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const {companyId} = useParams();
    const payment = PaymentApi();

    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } );
    }

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(inputs);
        try {
            const res = await payment.NewWithdraw(inputs, companyId);
            setIsLoading(false);
            // console.log(res.data);
            if(res.data.success) {
                setStatus(1);
                refetch();
            }  else { setStatus(-1); }

        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }  
    }

    return (

        <div className="filter border-end pb-4">
            <div className="d-flex py-3 border-bottom mb-4 bg-blue-light-clr"> 
                <span className="lead px-4 text-secondary mt-2"> Retrait d'argent </span> 
            </div>
            <form className="pb-2 px-3 mb-2" onSubmit={ handleForm }>
                <div className="row" > 
                    {
                        isLoading ? ( <div className="col-md-12 mb-4 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                    }
                    {
                        ( status === 1 ) ? 
                        (  <div className="col-md-12 mb-2"> <div className="alert alert-success fs-xs"> Payement effectué avec succes </div> </div> ) :
                        ( status === -1 ) ?
                        (  <div className="col-md-12 mb-2"> <div className="alert alert-danger fs-xs"> Une erreur est survenue lors de l'opération. </div> </div>) : null
                    }
                    <div className="col-md-12 mb-2" > 
                        <div className="d-flex flex-column mb-3">  
                            <span className="text-secondary fs-xs mb-1"> Numéro destinataire </span>
                            <input type="number" name="recipient" className="text-secondary p-2 border rounded-2" placeholder="77000000" required onChange={ handleInputs } />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2" > <span className="text-center fs-xs text-secondary p-2 border rounded-2"> L'opérateur mobile </span> </div>  
                    <div className="col-md-12 mb-3 d-flex flex-column" > 
                        <div className="form-check">
                            <input className="text-secondary p-2 border rounded-2" type="radio" name="operator" value={"wave"} id="flexRadioDefault1" onChange={ handleInputs } />
                            <label className="text-secondary font-xs ms-2" htmlFor="flexRadioDefault1"> wave </label>
                        </div>
                        <div className="form-check">
                            <input className="text-secondary p-2 border rounded-2" type="radio" name="operator" value={"orange money"} id="flexRadioDefault2" onChange={ handleInputs } />
                            <label className="text-secondary font-xs ms-2" htmlFor="flexRadioDefault2"> Orange money </label>
                        </div>
                    </div>
                    <div className="col-md-12 mb-2" > 
                        <div className="d-flex flex-column">  
                            <span className="text-secondary fs-xs mb-1"> Montant à débiter </span>
                            <div className="input-group mb-3">
                                <input type="number" name="amount" className="text-secondary p-2 border rounded-2" required onChange={ handleInputs } />
                            </div> 
                        </div>
                    </div> 
                    <div className="col-md-12 mb-2">
                        <div className="d-flex flex-column">
                            <span className="text-secondary fs-xs mb-1"> Prénom </span>
                            <input type="text" name="fname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2">
                        <div className="d-flex flex-column">
                            <span className="text-secondary fs-xs mb-1"> Nom </span>
                            <input type="text" name="lname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                        </div>
                    </div>
             
                    <div className="col-md-12 my-2 p-3 border-top border-bottom" > 
                        <button type="submit" className="btn btn-sm btn-main"> Envoyez </button> 
                    </div>
                </div> 
            </form>
        </div>
    )
}