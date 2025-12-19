import React, { useState } from 'react';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';


export function Password()
{

    const user = UserApi();
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        if(inputs.password ===inputs.cpassword )
        {    
            try {
                const res = await user.updatePassword(inputs);
                (res.data.success) ? setStatus(1) : setStatus(-1);
                setIsLoading(false);
            } catch (err) { 
                setStatus(-1); 
                setIsLoading(false);
            }   
        }
        else{ setStatus(2) }
    } 
    
    return (

        <div className="container-fluid"> 
              <div className="row min-vh-100 d-flex align-items-center ">
                <div className="col-lg-12 py-5">
                  <div className="row d-flex flex-column align-items-center justify-content-center py-5 px-2">
                    <div className="col-lg-5 col-md-8 d-flex flex-column rounded-4 border py-5 px-4 mb-5 shadow-sm">
        
                      <div className=" d-flex flex-column align-items-center gap-2 mb-4" > 
                          <div className="d-flex" >
                            <span className="d-flex align-items-center justify-content-center bg-white border px-3 py-2 rounded-2 shadow-sm"> 
                                <img src={'../favicon.png'} className="" alt="Logement extérieur" style={{ width: "60px" }} />
                            </span>
                          </div>
                          <span className="lead text-secondary text-center"> Diwaneplus </span>
                          <span className="fs-4 text-secondary text-center"> Mise à jour mot de passe  </span>
                          <span className="text-secondary text-center mb-3">
                            Saisir le code reçu par message ainsi que votre nouveau mot de passe.
                          </span>
                      </div>

                      <form onSubmit={ handleForm } className="d-flex flex-column">
                        {
                          isLoading && (
                            <div className="d-flex justify-content-center align-items-center mb-3"> 
                               <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div>
                            </div>
                          )
                        }
                        {
                          status === 1 && (
                            <div className="col-md-12 mb-2">
                              <div className="alert alert-primary">
                                Votre mot de passe est modifié avec succès
                              </div>
                            </div>
                          )
                        }
                        {
                          status === -1 && (
                            <div className="col-md-12 mb-2">
                              <div className="alert alert-danger">
                                Une erreur est survenue durant le traitement. Vérifiez réessayer.
                              </div>
                            </div>
                          )
                        }
                        {
                          status === -2 && (
                            <div className="col-md-12 mb-2">
                              <div className="alert alert-danger">
                                Veuillez vérifier vos mot de passe puis réessayez.
                              </div>
                            </div>
                          )
                        }
                        {/* -------------------------------- */}
                        <div className="col-md-12 mb-2"> 
                          <div className="d-flex gap-2 mb-2" >
                            <input type="number" name="code" placeholder="Code" className="w-100 border input py-3 px-3 text-muted rounded-2" onChange={ handleInputs } required />
                            <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                          </div>
                        </div>
                        {/* -------------------------------- */}
                        <div className="col-md-12 mb-2"> 
                          <div className="d-flex gap-1 mb-2 align-items-center">
                            <span className="d-flex align-items-center border p-3 rounded-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </span>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={handleInputs} required />
                            <span className="d-flex align-items-center border p-3 rounded-2 text-danger"> * </span> 
                          </div>
                        </div>
                        {/* -------------------------------- */}
                        <div className="col-md-12 mb-2"> 
                          <div className="d-flex gap-1 mb-3 align-items-center">
                            <span className="d-flex align-items-center border p-3 rounded-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => setShowCPassword(!showCPassword)}>
                              <i className={`bi ${showCPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </span>
                            <input type={showCPassword ? "text" : "password"} name="cpassword" placeholder="Confirmer mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={handleInputs} required />
                            <span className="d-flex align-items-center border p-3 rounded-2 text-danger"> * </span> 
                          </div>
                        </div>
                        {/* -------------------------------- */}   
                        <button type="submit" className="btn btn-lg btn-secondary px-4 mt-2"> Enregistrer </button> 
                   
                      </form>    
                      {
                          status === 1 && (
                            <div className="d-flex justify-content-center p-4 mt-4 bg-white rounded-3 border">
                              <a className="btn btn-sm btn-outline-secondary d-flex align-items-center px-4" href="/">
                                Retour à la page d'accueil <i className="bi bi-arrow-right ms-2"></i>
                              </a>
                            </div>
                          )
                      }

                        
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


