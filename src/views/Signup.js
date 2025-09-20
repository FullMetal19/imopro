import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from "../components/Footer";
import { Header } from '../components/Header';
import { UserApi } from '../services/user.api';


export function Signup(){

    const navigate = useNavigate();
    const user = UserApi();
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }

    const [checked, setChecked] = useState(false);
    const handleChange = e => setChecked(e.target.checked)
  
    const handleForm = async ( event ) => {
        event.preventDefault();
        console.log(inputs);
        setIsLoading(true);
        if(inputs.password === inputs.cpassword )
        {   
            try {
                const res = await user.insert(inputs);
                setIsLoading(false);
                if(res.data.success){
                    setStatus(1);
                    navigate('/validation-compte');
                }  
                else{ setStatus(-1); } 
            } catch (err) { 
                setIsLoading(false);
                setStatus(-1); 
            }
        }
        else setStatus(-2)
    } 
    

    return (

      <div className="container-fluid">
                    <div className="row">
                      {/* ************************************************************************ */}  
                      <div className="col-md-4 d-flex align-items-center bg-gray-light p-4">
                        <div className="d-flex flex-column p-4" >
                          <div className="d-flex mb-3" >
                            <span className="d-flex align-items-center justify-content-center bg-secondary px-4 py-2 rounded-2 shadow-sm"> <i class="bi bi-house-door-fill fs-3 text-light"></i> </span>
                          </div>
                          <span className="h1 text-secondary"> ImoPro votre entreprise immobilière </span>
                          <span className="lead text-secondary" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
                        </div>
                      </div>
                      {/* ************************************************************************ */}  
                      <div className="col-md-8 vh-100 d-flex justify-content-center px-4 align-items-center">
                        <div className="row d-flex justify-content-center px-4">
                          <div className="col-md-12 pt-4">
                            <div className=" d-flex flex-column gap-2 mb-4" > 
                              <div className="d-flex mb-1" >
                                <span className="d-flex align-items-center justify-content-center bg-blue-clr border px-4 py-2 rounded-2 shadow-sm"> <i class="bi bi-house-door-fill fs-3 text-white"></i> </span>
                              </div>
                              <span className="lead text-muted text-start fs-3"> Imopro - inscription </span>
                            </div>
                          </div>
                          <div className="col-md-12 rounded-2 py-4">
      
                            <form onSubmit={ handleForm } className="row">
                            {
                              isLoading && (
                                <div className="col-lg-12 d-flex justify-content-center align-items-center mb-3"> 
                                  <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
                                </div>
                              )
                            }
                            {
                              status === -1 && (
                                <div className="col-lg-12 mb-2">
                                  <div className="alert alert-danger">
                                     Une erreur est survenue lors de la creation de votre compte, veuillez rééssayer s'il vous plaît.
                                  </div>
                                </div>
                              )
                            }
                            {
                              status === -2 && (
                                <div className="col-md-12 mb-2">
                                  <div className="alert alert-danger">
                                    Erreur! Veuillez revoir votre mot de passe et la confirmation.
                                  </div>
                                </div>
                              )
                            }  
                            {/* --------------------------------- */}
                            <div className="col-lg-8 mb-2">
                              <div className="d-flex gap-1 mb-2" >
                                <input type="text" name="fname" placeholder="Prénom" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-4 mb-2">
                              <div className="d-flex gap-1 mb-2" >
                                <input type="text" name="lname" placeholder="Nom" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-8 mb-2">
                              <div className="d-flex gap-1 mb-2" >
                                <select className="w-100 border input py-3 px-3 text-secondary rounded-2" name='sex' onChange={ handleInputs }>
                                  <option value="" > Choisir sexe </option>
                                  <option value="masculin" > Masculin </option>
                                  <option value="feminin" > Féminin </option>
                                </select>
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-8 mb-2">
                              <div className="d-flex gap-1 mb-2" >
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> +221 </span> 
                                <input type="number" name="phone" placeholder="Numéro de téléphone joignable" className="w-100 border input py-3 px-3 text-muted rounded-2 text-secondary" onChange={ handleInputs } required />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-8 mb-2">
                              <div className="d-flex gap-1 mb-2" >
                                 <input type="email" name="email" placeholder="Email" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={ handleInputs } />
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-6 mb-2"> 
                              <div className="d-flex gap-1 mb-2" >
                                <input type="password" name="password" placeholder="Mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */}
                            <div className="col-lg-6 mb-2"> 
                              <div className="d-flex gap-1 mb-4" >
                                <input type="password" name="cpassword" placeholder="Confirmer mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={ handleInputs } required />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */}
                            <div className="col-md-12 mb-2"> 
                              <div className="d-flex align-items-center gap-2 mb-2" >
                                <input type="checkbox" name="checker" checked={checked} className="border text-muted checkbox" onChange={ handleChange } required />
                                <span className="d-flex align-items-center gap-2 text-secondary"> 
                                  <span> J'accepte les  </span>  
                                  <a href="/" target="outlet" className="nav-link text-blue-clr"> conditions d'utilisation <i className="bi bi-arrow-right"></i></a>
                                  <span> d'Imopro </span> 
                                  </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */} 
                            <div className="col-md-12 mb-2"> 
                              <div className="d-flex pt-3" >
                                <button type="submit" disabled={!checked} className="btn btn-lg text-white bg-blue-clr px-4 mt-2 mb-4"> Enregistrer maintenant </button> 
                              </div>
                            </div>
                            {/* -------------------------------- */}             

                            </form>
                      </div>
                    </div>
                  
                
                     </div>
                    </div>
                    <div className="row bg-blue-clr">
                      <BottomBar /> 
                    </div>
                  </div>

    )
}


