import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from "libphonenumber-js";



export function Signup(){

    const navigate = useNavigate();
    const user = UserApi();
    const [inputs, setInputs] = useState({
      phone: "",
      phoneIndex: "+221",
      fullPhone: "+221"
    });

    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }

    const handlePhoneChange = (value, data) => {
      const dialCode = "+" + data.dialCode;

      // Toujours forcer la présence du dialCode
      if (!value.startsWith(data.dialCode)) {
        value = data.dialCode;
      }

      const phoneNumber = value.slice(data.dialCode.length);

      setInputs(prev => ({
           ...prev,
           phoneIndex: dialCode,
           phone: phoneNumber,
           fullPhone: dialCode + phoneNumber
      }));
    };



    const [checked, setChecked] = useState(false);
    const handleChange = e => setChecked(e.target.checked)
  
    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
          
        if (!isValidPhoneNumber(inputs.fullPhone)) {
          setStatus(-3);
          return;
        }

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

        <title> Inscription | Diwane-plus </title>
        <meta name="author" content="Diwaneplus" />
        <meta name="keywords" content="entreprise immobilier, immobilier au Sénégal, Immobilier en Afrique, vente et location de maisons, vente et location de terrains, vente et location de biens immobiliers" />
        <meta name="description" content="Créez votre compte gratuitement et accédez à l’ensemble de nos services immobiliers : publication d’annonces, suivi des demandes, gestion de vos favoris et assistance personnalisée. Rejoignez notre plateforme pour acheter, vendre ou louer en toute simplicité et sécurité." />
        <link rel="icon" type="image/png" href="../favicon.png" />

                    <div className="row">
                      {/* ************************************************************************ */}  
                      <div className="col-md-4 d-flex align-items-center bg-gray-light px-4 py-2">
                        <div className="d-flex flex-column p-2" >
                          <div className="d-flex" >
                            <span className="mb-3 hide border border-secondary px-4 py-2 rounded-2"> 
                              <img src={'../favicon.png'} className="" alt="Logement extérieur" style={{ width: "60px" }} />
                            </span>
                          </div>
                          <h1 className="hide h1 text-secondary"> Diwaneplus, la plateforme immobilière de référence </h1>
                          <p className="hide lead text-secondary" > 
                            Inscrivez-vous en quelques clics et découvrez un monde de propriétés à louer, acheter ou vendre, directement depuis votre espace personnel. 
                          </p>
                        </div>
                      </div>
                      {/* ************************************************************************ */}  
                      <div className="col-md-8 min-vh-100 d-flex justify-content-center px-4 align-items-center">
                        <div className="row d-flex justify-content-center px-2">
                          <div className="col-md-12 pt-4">
                            <div className=" d-flex flex-column gap-2" > 
                              <div className="d-flex mb-1" >
                                <span className="d-flex align-items-center justify-content-center bg-blue-clr border px-3 py-2 rounded-2 shadow-sm"> <i className="bi bi-house-door-fill fs-4 text-white"></i> </span>
                              </div>
                              <span className="lead text-muted text-start fs-3"> Diwaneplus - inscription </span>
                            </div>
                          </div>
                          <div className="col-md-12 rounded-2 py-4">
      
                            <form onSubmit={ handleForm } className="row">
                            {
                              isLoading && (
                                <div className="col-lg-12 d-flex justify-content-center align-items-center mb-3"> 
                                  <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div>
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
                            {
                              status === -3 && (
                                <div className="col-md-12 mb-2">
                                  <div className="alert alert-danger">
                                    Numéro de téléphone invalide.
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
                                <select className="w-100 border input py-3 px-3 text-secondary rounded-2" name='sex' onChange={ handleInputs } required >
                                  <option value="" > Choisir sexe </option>
                                  <option value="masculin" > Masculin </option>
                                  <option value="feminin" > Féminin </option>
                                </select>
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* --------------------------------- */}
                            <div className="col-lg-8 mb-2">
                              <div className="d-flex gap-1 mb-2 align-items-center">
                                <PhoneInput country="sn" enableSearch value={inputs.fullPhone} onChange={handlePhoneChange}
                                  inputStyle={{
                                    width: "100%",
                                    height: "56px"
                                  }}
                                  inputProps={{
                                    onKeyDown: (e) => {
                                      const pos = e.target.selectionStart;
                                      const dialLength = inputs.phoneIndex.length;

                                      // Interdire uniquement l'effacement du dialCode
                                      if (
                                        pos <= dialLength &&
                                        (e.key === "Backspace" || e.key === "Delete")
                                      ) {
                                        e.preventDefault();
                                      }
                                    }
                                  }}
                                />

                                <span className="d-flex align-items-center border p-3 rounded-2 text-danger"> * </span>
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
                              <div className="d-flex gap-1 mb-2 align-items-center">
                                <span className="d-flex align-items-center border p-3 rounded-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </span>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={handleInputs} required />
                                <span className="d-flex align-items-center border p-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */}
                            <div className="col-lg-6 mb-2"> 
                              <div className="d-flex gap-1 mb-3 align-items-center">
                                <span className="d-flex align-items-center border p-3 rounded-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => setShowCPassword(!showCPassword)}>
                                  <i className={`bi ${showCPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </span>
                                <input type={showCPassword ? "text" : "password"} name="cpassword" placeholder="Confirmer mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={handleInputs} required />
                                <span className="d-flex align-items-center border p-3 rounded-2 text-danger"> * </span> 
                              </div>
                            </div>
                            {/* -------------------------------- */}
                            <div className="col-md-12 mb-2"> 
                              <div className="d-flex align-items-center gap-2 mb-2" >
                                <input type="checkbox" name="checker" checked={checked} className="border text-muted checkbox" onChange={ handleChange } required />
                                <div className="d-flex align-items-center gap-2 text-secondary"> 
                                  J'accepte les 
                                  <a href="/condition-utilisation" target="outlet" className="nav-link text-blue-clr"> conditions d'utilisation <i className="bi bi-arrow-right"></i></a>
                                  de Diwaneplus
                                </div> 
                              </div>
                            </div>
                            {/* -------------------------------- */} 
                            <div className="col-md-12 mb-2"> 
                              <div className="d-flex pt-1" >
                                <button type="submit" disabled={!checked} className="btn text-white bg-blue-clr px-4 mt-2 mb-4"> Enregistrer maintenant </button> 
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


