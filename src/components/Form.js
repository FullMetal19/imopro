
export function PaymentForm({ amount, getValue, source, children }) 
{
    return (

    <div className="row py-5 px-4 rounded-3 border"> 
        <div className="col-md-12 mb-5" > 
            <div className="d-flex flex-column btn-white p-2" >
                <span className="text-center"> Veillez verifier en amont si le montant à débiter est actuellement sur votre compte </span>
            </div> 
        </div> 
        <div className="col-md-12" > <span className="text-center fs-xs color-dark"> Le numero de téléphone du compte à débiter </span> </div>  
        <div className="col-md-12 mb-3" > 
            <input type="text" name="phone" className="form-control" placeholder="numero de téléphone" required onChange={getValue} />
        </div>
        <div className="col-md-12" > <span className="text-center fs-xs color-dark"> Le mois à payer </span> </div> 
        { children }
        <div className="col-md-12" > <span className="text-center fs-xs color-dark"> Le montant à débiter </span> </div>  
        <div className="col-md-12 mb-3" > 
            <div className="input-group mb-3">
               <input type="text" value={amount} name="amount" className="form-control" placeholder="montant" required onChange={getValue} />
                <div className="input-group-append">  <span className="input-group-text" id="basic-addon2"> Fcfa </span>  </div>
            </div>   
        </div>
        <div className="col-md-12 mb-2" > <span className="text-center fs-xs color-dark"> L'opérateur mobile </span> </div>  
        <div className="col-md-12 mb-3" > 
            <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="source" value={"wave"} id="flexRadioDefault1" checked={source === 'wave'}  onChange={getValue}/>
                <label className="form-check-label" for="flexRadioDefault1"> wave </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="source" value={"orange money"} id="flexRadioDefault2" onChange={getValue}  />
                <label className="form-check-label" for="flexRadioDefault2"> Orange money </label>
            </div>
        </div>
        <div className="col-md-12 my-2" > 
            <button type="submit" className="btn btn-main px-4"> Envoyez </button> 
        </div>
    </div>
    )
}