import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../services/user.api";
import { PaymentApi } from "../services/payment.api";
import { ProductApi } from "../services/product.api";
import vector from "../config/data";


export function VideoModal( { method, url })
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-lg-8 col-md-11 bg-white shadow-sm border p-4 d-flex flex-column rounded-3">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        <iframe height="315" src={ url } className="img-slide" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ************************************************************************************************************


export function GeolocalisationModal( { method, latitude, longitude })
{
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

    return (

        <div className="modal-container">
            <div className="container"> 
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    
                    <div className="col-md-9 bg-white p-4 d-flex flex-column rounded-3">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        <div className="d-flex p-4 border">
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export function LoginCheckerModal({ method, message })
{
    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-md-6 bg-white shadow-sm border p-4 d-flex flex-column rounded-3">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        <div className="d-flex border-top border-bottom p-3 bg-three-clr mb-3">
                            <div className="text-secondary"> {message} </div>
                        </div>
                        <div> <a className="btn btn-outline-secondary" href="/connexion">  Se-connecter maintenant </a> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ************************************************************************************************************
export function PasswordModal({ method })
{
    const navigate = useNavigate();
    const user = UserApi();
    
    const [phone, setPhone] = useState();

    const [ inputs, setInputs ] = useState();
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }
    

    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await user.genPasswordToken(inputs);
            setIsLoading(false);
            if(res.data.success){
                setStatus(1);
                navigate('/mot-de-passe-oublie');
            }  
            else{ setStatus(-1); } 
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    }

    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-2">
                    <div className="col-lg-6 col-md-9 bg-white shadow-sm border p-4 d-flex flex-column rounded-3">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        <span className="text-secondary small mt-4"> Etes vous sure de vouloir changé de mot de passe </span>
                        <div className="d-flex border-top py-4 mb-2">

                          <form onSubmit={ handleForm } className="d-flex flex-column mt-2">
                            <div className="d-flex flex-column align-items-center gap-2 mb-4" > 
                              <div className="d-flex mb-1" >
                                <span className="d-flex align-items-center justify-content-center bg-blue-clr border px-3 py-2 rounded-2 shadow-sm"> <i class="bi bi-house-door-fill fs-4 text-white"></i> </span>
                              </div>
                              <span className="fs-4 text-muted"> Imopro - Mot de passe oublié </span>
                              <span className="text-muted text-center px-4 mb-4">
                                Saisissez votre numéro de téléphone, et nous vous enverrons un code de validation pour réinitialiser rapidement et en toute sécurité votre mot de passe."  
                              </span>
                            </div>
                            {
                              isLoading && (
                                <div className="d-flex justify-content-center align-items-center mb-3"> 
                                   <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
                                </div>
                              )
                            }
                            {
                              status === -1 && (
                                <div className="col-md-12 mb-2">
                                  <div className="alert alert-danger">
                                    Une erreur est survenue durant le traitement. Vérifiez votre numéro puis réessayez.
                                  </div>
                                </div>
                              )
                            }
                            {/* -------------------------------- */}
                            <div className="col-md-12 mb-2"> 
                              <div className="d-flex gap-2 mb-2">
                                <select className="border input py-3 px-3 text-secondary rounded-2 " name='phoneIndex' required onChange={ handleInputs }>
                                  <option value=""> index </option>
                                  {
                                    vector.phoneIndex.map( (item, index) => (
                                       <option key={index} value={item}> {item} </option>
                                     ) )
                                  }
                                </select> 
                                <input type="number" name="phone" placeholder="Numéro de téléphone" className="w-100 border input py-3 px-3 text-muted rounded-2" required onChange={ handleInputs } />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */}
                            <button type="submit" className="btn btn-lg btn-secondary px-4 mt-2"> 
                              Soumettre <i className="bi bi-arrow-right"></i> 
                            </button> 
                    
                          </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



//****************************************************************************************************** */
export function VisitBookingModal({ method, refetch, propertyId }) 
{
    const payment = PaymentApi();

    const [inputs, setInputs] = useState({ type: 'Visit' });
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Base price you want to start with
    const BASE_PRICE = 5000; 
    const DAILY_DISCOUNT = 25; 

    const handleInputs = (event) => {
        const { name, value } = event.target;

        if (name === "date") 
        {
            const today = new Date();
            const selectedDate = new Date(value);

            // Empêcher dates passées
            if (selectedDate < today) {
                alert("Veuillez choisir une date à partir d'aujourd'hui.");
                return;
            }

            // Calcul de la différence en jours
            const diffTime = selectedDate.getTime() - today.setHours(0, 0, 0, 0);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let price = BASE_PRICE - diffDays * DAILY_DISCOUNT;
            if (price < 2000) price = 2000; 

            setInputs(prev => ({
                ...prev,
                date: value,
                amount: price
            }));
        } else {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleForm = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const res = await payment.insert( inputs, propertyId);
            setIsLoading(false);
            console.log(res.data)
            res.data.success ? setStatus(1) : setStatus(-1);
            refetch();

        } catch (err) {
            setStatus(-1);
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="col-lg-6 col-md-8 bg-white p-4 d-flex flex-column rounded-2">
                        <div className="d-flex justify-content-between gap-4">
                            <div className="text-muted border px-4 small py-2 bg-three-clr d-flex align-items-center rounded-2">
                                Prise de rendez vous de visite
                            </div>
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        </div>
                        <form className="row mt-4" onSubmit={handleForm}>
                            {isLoading && (
                                <div className="d-flex justify-content-center mb-4">
                                    <img src={"../img/icons8-iphone-spinner.gif"} height={34} width={34} alt="Logo" />
                                </div>
                            )}
                            {status === 1 && (
                                <div className="">
                                    <div className="alert alert-primary text-secondary border py-1 px-3 rounded-1 mb-4"> Rendez-vous ajouté avec succès </div>
                                </div>
                            )}
                            {status === -1 && (
                                <div className="">
                                    <div className="alert alert-danger text-secondary border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div>
                                </div>
                            )}

                            <div className="col-md-6 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Date de rendez-vous </span>
                                    <input type="date" name="date" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} min={new Date().toISOString().split("T")[0]} max={`${new Date().getFullYear()}-12-31`} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Heure du rendez-vous </span>
                                    <input type="time" name="time" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2 bg-light py-2">
                                <span className="text-center fs-xs text-secondary"> Choisir l'opérateur de paiement </span>
                            </div>
                            <div className="col-md-12 mb-3 d-flex gap-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"wave"} id="flexRadioDefault1" onChange={handleInputs} />
                                    <label className="text-secondary font-xs" htmlFor="flexRadioDefault1"> wave </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"orange money"} id="flexRadioDefault2" onChange={handleInputs} />
                                    <label className="text-secondary font-xs" htmlFor="flexRadioDefault2"> Orange moneey </label>
                                </div>
                            </div>
                            <div className="col-md-8 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Prénom </span>
                                    <input type="text" name="fname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Nom </span>
                                    <input type="text" name="lname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Montant à débiter ( Fcfa ) </span>
                                    <input type="number" name="amount" value={inputs.amount || ''} className="text-secondary p-2 border rounded-2 me-1" required readOnly />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Numéro du compte à débiter </span>
                                    <input type="number" name="account" className="text-secondary p-2 border rounded-2" placeholder="77000000" min="100000000" max="999999999" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="alert alert-danger p-2">
                                    <span className="fs-xs text-secondary"> Assurer d'avoir ce montant dans votre compte. </span>
                                </div>
                            </div>
                            
                            <div className="d-flex pt-2">
                                <button type="submit" className="btn btn-outline-secondary"> Enregistrer </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export function ValidationPaymentModal({ method, propertyId, guaranty })
{
    const uid = sessionStorage.getItem('uid');
    const payment = PaymentApi();

    const [inputs, setInputs] = useState({
        amount: guaranty || 0,
        type: "Guaranty"
    });
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInputs = (event) => {
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: name === "amount" ? parseFloat(value) || 0 : value,
        });
    };
    
    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const res = await payment.insert( inputs, uid, propertyId);
            setIsLoading(false);
            console.log(res.data)
            res.data.success ? setStatus(1) : setStatus(-1);
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    } 
    

    return (

        <div className="modal-container">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100 px-3">
                    <div className="col-lg-6 col-md-8 bg-white p-4 d-flex flex-column rounded-3">
                        <div className="d-flex"> 
                            <div className="text-secondary py-2 border px-4 bg-three-clr d-flex align-items-center rounded-2"> Payement de la caution pour la validation </div>
                            <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        </div>
                        <form className="row d-flex flex-column mt-4" onSubmit={ handleForm }>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                            }
                            {
                                ( status === 1 ) ? 
                                (  <div className=""> <div className="alert alert-primary text-secondary border py-1 px-3 rounded-1 mb-4"> Caution payée avec succes </div> </div> ) :
                                ( status === -1 ) ?
                                (  <div className=""> <div className="alert alert-danger text-secondary border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                            }
                            <div className="col-md-12 mb-2 bg-light py-2">
                                <span className="text-center fs-xs text-secondary"> Choisir l'opérateur de paiement </span>
                            </div>
                            <div className="col-md-12 mb-3 d-flex gap-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"wave"} id="flexRadioDefault1" onChange={handleInputs} />
                                    <label className="text-secondary font-xs" htmlFor="flexRadioDefault1"> wave </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"orange money"} id="flexRadioDefault2" onChange={handleInputs} />
                                    <label className="text-secondary font-xs" htmlFor="flexRadioDefault2"> Orange moneey </label>
                                </div>
                            </div>
                            <div className="col-md-8 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Prénom </span>
                                    <input type="text" name="fname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="d-flex flex-column">
                                    <span className="text-secondary fs-xs mb-1"> Nom </span>
                                    <input type="text" name="lname" className="text-secondary p-2 border rounded-2" required onChange={handleInputs} />
                                </div>
                            </div>
                            <div className="col-md-6" > 
                                <div className="d-flex flex-column">  
                                    <span className="text-muted fs-xs mb-1"> Montant à débiter </span>
                                    <div className="input-group mb-2">
                                        <input type="text" name="amount" value={ guaranty || 0} className="text-secondary p-2 border rounded-2" required onChange={ handleInputs } />
                                        <div className="input-group-append">  <span className="input-group-text" > Fcfa </span>  </div>
                                    </div> 
                                </div>
                            </div> 
                            <div className="col-md-6 mb-2" > 
                                <div className="d-flex flex-column">  
                                    <span className="text-muted fs-xs mb-1"> Numéro du compte à débiter </span>
                                    <input type="number" name="account" className="text-secondary p-2 border rounded-2" placeholder="77000000" required onChange={ handleInputs } />
                                </div>
                            </div>
                            <div className="col-md-12" > 
                                <div className="alert alert-danger p-2">  
                                    <span className="fs-xs"> Assurer d'avoir ce montant dans votre compte. </span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-sm btn-outline-main"> Enregistrer </button>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export function MonthPaymentModal({ method, refetch, propertyId })
{
    const uid = sessionStorage.getItem('uid');
    const payment = PaymentApi();
    const product = ProductApi();

    const fetchProperty = async (id) => { 
        try {
            const res = await product.findOne(id);
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { data } = useQuery({  queryKey: ["property", propertyId], queryFn: () => fetchProperty(propertyId),  enabled: !!propertyId });

    // ******************************************************************************************
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const [inputs, setInputs] = useState({
        amount: 0,
        type: "MonthPay"
    });

    useEffect(() => {
        if (data?.price) {
            setInputs(prev => ({
                ...prev,
                amount: data.price
            }));
        }
    }, [data]);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        
        try{
            const res = await payment.insert( inputs, uid, propertyId);
            setIsLoading(false);
            if (res.data.success) {
               setStatus(1);
               refetch(); 
            } else {
                setStatus(-1);
            }
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    } 


    return (

        <div className="modal-container">
            <div className="container pt-5">
                <div className="row d-flex justify-content-center mt-5 px-2">
                    <div className="col-lg-6 col-md-8 bg-white p-4 d-flex flex-column rounded-3">
                        <div className="d-flex justify-content-between gap-4"> 
                            <div className="text-muted border px-4 bg-three-clr d-flex align-items-center rounded-2"> Payement mensuel </div>
                            <button className='btn btn-sm btn-white bold mb-2' onClick={ ()=>{ method ( false ) } } > X </button> 
                        </div>
                        <form className="d-flex flex-column mt-4" onSubmit={ handleForm }>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../img/icons8-iphone-spinner.gif'} height={34} width={34} alt="Logo" /> </div> ) : null 
                            }
                            {
                                ( status === 1 ) ? 
                                (  <div className=""> <div className="alert alert-success border py-1 px-3 rounded-1 mb-4"> Service ajouté avec succes </div> </div> ) :
                                ( status === -1 ) ?
                                (  <div className=""> <div className="alert alert-danger border py-1 px-3 rounded-1 mb-4"> Une erreur est survenue lors de la validation. </div> </div>) : null
                            }
                            <div className="col-md-12 mb-2" > 
                                <div className="d-flex flex-column">  
                                    <span className="text-muted fs-xs mb-1"> Mois à payer </span>
                                    <input type="month" name="month" className="form-control" required onChange={ handleInputs } />
                                </div>
                            </div>
                             <div className="col-md-12 mb-2" > 
                                <div className="d-flex flex-column">  
                                    <span className="text-muted fs-xs mb-1"> Montant à débiter </span>
                                    <div className="input-group">
                                        <input type="text" name="amount" value={inputs.amount} className="form-control" required onChange={handleInputs} />
                                        <div className="input-group-append">  <span className="input-group-text" > Fcfa </span>  </div>
                                    </div> 
                                </div>
                            </div> 
                            <div className="col-md-12" > 
                                <div className="alert alert-danger py-1">  
                                    <span className="fs-xs"> Assurer d'avoir ce montant dans votre compte. </span>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2" > 
                                <div className="d-flex flex-column">  
                                    <span className="text-muted fs-xs mb-1"> Numéro du compte à débiter </span>
                                    <input type="number" name="account" className="form-control" placeholder="77000000" required onChange={ handleInputs } />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2" > <span className="text-center fs-xs color-dark"> Choisir l'opérateur de paiement </span> </div>  
                            <div className="col-md-12 mb-2 d-flex gap-4" > 
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"wave"} id="flexRadioDefault1" onChange={ handleInputs } />
                                    <label className="text-muted font-xs" htmlFor="flexRadioDefault1"> wave </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="operator" value={"orange money"} id="flexRadioDefault2" onChange={ handleInputs } />
                                    <label className="text-muted font-xs" htmlFor="flexRadioDefault2"> Orange money </label>
                                </div>
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

