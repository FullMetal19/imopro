import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';
import { PasswordModal } from '../components/Modal';

export function Signin(){

    const navigate = useNavigate();
    const user = UserApi();

    const [inputs, setInputs] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } ) ;
    }
  
    const handleForm = async ( event ) => {
        event.preventDefault();
        setStatus(0);
        setIsLoading(true);
        try {
            const res = await user.auth(inputs);
            setIsLoading(false);
            if( res.data.success ){
                setIsLoading(false);
                localStorage.setItem("token", res.data.token);
                navigate('/');
            }
            else{
                setStatus(-1);
                setMessage('Veuillez revoir vos informations puis réessayer');
            }
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
            setMessage(err?.response.data.error  || 'Erreur interne du serveur. Veuillez réessayer.' );
        }
    } 

    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }    
    const setModal = () => setModalState(true);

    return (

        <div>

        <title> Connexion | Diwane-plus </title>
        <meta name="author" content="Diwaneplus" />
        <meta name="keywords" content="entreprise immobilier, immobilier au Sénégal, Immobilier en Afrique, vente et location de maisons, vente et location de terrains, vente et location de biens immobiliers" />
        <meta name="description" content="Connectez-vous à votre espace personnel et retrouvez vos annonces, vos recherches enregistrées et votre historique. Accédez rapidement à vos services immobiliers et gérez vos opérations en toute confidentialité grâce à une connexion sécurisée." />
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/daitesqqd/image/upload/v1767627041/favicon_mrsntv.ico" />

            { modalState ? ( <PasswordModal method={ closeModal } /> ) : null }
            {/* ************************************************************************ */}   
            <div className="container-fluid">
              <div className="row">
                {/* ************************************************************************ */}  
                <div className="col-md-6 d-flex align-items-center bg-gray-light p-4">
                  <div className="col-md-10 d-flex flex-column p-4" >
                    <div className="d-flex mb-3" >
                      <span className="d-flex align-items-center justify-content-center border border-secondary px-4 py-2 rounded-2"> 
                        <img src={'https://res.cloudinary.com/daitesqqd/image/upload/v1767627041/favicon_mrsntv.ico'} className="" alt="Logement extérieur" style={{ width: "60px" }} />
                      </span>
                    </div>
                    <h1 className="h1 text-secondary"> Diwaneplus, la plateforme immobilière de référence </h1>
                    <p className="lead text-secondary" > 
                      Connectez-vous et accédez à votre espace personnel pour gérer vos annonces, vos favoris et vos transactions en toute sécurité.
                    </p>
                  </div>
                </div>
                {/* ************************************************************************ */}  
                <div className="col-md-6 min-vh-100 d-flex justify-content-center align-items-center px-4">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-12 rounded-2 py-4 px-4">

                  <form onSubmit={ handleForm } className="d-flex flex-column">
                    <div className=" d-flex flex-column align-items-center gap-2 mb-4" > 
                      <div className="d-flex mb-3" >
                        <span className="d-flex align-items-center justify-content-center bg-blue-clr border px-4 py-2 rounded-2 shadow-sm"> <i className="bi bi-house-door-fill fs-3 text-white"></i> </span>
                      </div>
                      <span className="lead text-muted text-start"> Diwaneplus - connexion </span>
                    </div>
                    {
                      isLoading && (
                        <div className="d-flex justify-content-center align-items-center mb-3"> 
                          <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div>
                        </div>
                      )
                    }
                    {
                      status === -1 && (
                        <div className="col-md-12 mb-2">
                          <div className="alert alert-danger"> { message } </div>
                        </div>
                      )
                    }
                    <input type="text" name="login" className="border text-muted p-3 rounded-2 mb-3" placeholder="Email ou numéro de téléphone" required onChange={ handleInputs } />
                    <div className="d-flex gap-1 mb-2 align-items-center mb-3">
                      <input type={showPassword ? "text" : "password"} name="password" placeholder="Mot de passe" className="w-100 border input py-3 px-3 text-secondary rounded-2" onChange={handleInputs} required />
                      <span className="d-flex align-items-center border p-3 rounded-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </span>
                    </div>
                          
                    {/* <input type="password" name="password" className="border text-muted p-3 rounded-2 mb-3" placeholder="Mot de passe" required onChange={ handleInputs } /> */}
                             
                    <button type="submit" className="btn btn-lg btn-secondary px-4 mt-2"> Connexion </button> 

                    <div className="mt-4 text-muted text-center">──────── ou ────────</div>

                    <div className="d-flex gap-2 border text-secondary rounded-2 py-3 px-4 text-outline-muted mt-4">
                      <span> Pas encore de compte : </span>
                      <a href="/inscription" className="nav-link text-blue-clr"> S'inscrire maintenant <i className="bi bi-arrow-right"></i></a>
                    </div>

                    <div className="d-flex gap-2 border text-secondary rounded-2 py-3 px-4 text-outline-muted mt-3">
                      <span> Mot de passe oublié : </span>
                      <span className="btn nav-link text-blue-clr" target="outlet" onClick={ setModal } > Modifier içi <i className="bi bi-arrow-right"></i> </span>
                    </div>
                   
                  </form>
                </div>
              </div>
          
            </div>
          </div>
          <div className="row bg-blue-clr">
            <BottomBar /> 
          </div>
        </div>
      </div>
    )
}


