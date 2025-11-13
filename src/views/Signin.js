import React, { useState } from 'react';
import { useNavigate } from ''react-router-dom';
import { BottomBar } from '"../components/Footer";
import { Header } from ''../components/Header';
import { UserApi } from ''../services/user.api';
import { PasswordModal } from ''../components/Modal';

export function Signin(){

    const navigate = useNavigate();
    const user = UserApi();

    const [inputs, setInputs] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } ) ;
    }
  
    const handleForm = async ( event ) => {
        event.preventDefault();
        // console.log(inputs);
        setStatus(0);
        setIsLoading(true);
        try {
            const res = await user.auth(inputs);
            setIsLoading(false);
            if( res.data.success ){
                setIsLoading(false);
                // sessionStorage.setItem("uid", res.data.uid);
                localStorage.setItem("token", res.data.token);
                // sessionStorage.setItem("status", res.data.status);
                // sessionStorage.setItem("companyStatus", res.data.companyStatus);
                // sessionStorage.setItem("fname", res.data.fname);
                // sessionStorage.setItem("lname", res.data.lname);
                // sessionStorage.setItem("email", res.data.email);
                // sessionStorage.setItem("phone", res.data.phone);
                navigate('/');
            }
        } catch (err) { 
            setStatus(-1);
            setIsLoading(false);
        }
    } 

    const [ modalState , setModalState ] = useState(false);
    const closeModal = ( arg ) => {  setModalState( arg ) }    
    const setModal = () => setModalState(true);

    return (

        <div>
            { modalState ? ( <PasswordModal method={ closeModal } /> ) : null }
            {/* ************************************************************************ */}   
            <div className="container-fluid">
              <div className="row">
                {/* ************************************************************************ */}  
                <div className="col-md-6 d-flex align-items-center bg-gray-light p-4">
                  <div className="col-md-10 d-flex flex-column p-4" >
                    <div className="d-flex mb-3" >
                      <span className="d-flex align-items-center justify-content-center bg-secondary px-4 py-2 rounded-2 shadow-sm"> 
                        {/* <i class="bi bi-house-door-fill fs-3 text-light"></i>  */}
                        <img src={'../favicon.png'} className="" alt="Logement extérieur" style={{ width: "60px" }} />
                      </span>
                    </div>
                    <span className="h1 text-secondary"> ImoPro votre entreprise immobilière </span>
                    <span className="lead text-secondary" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
                  </div>
                </div>
                {/* ************************************************************************ */}  
                <div className="col-md-6 vh-100 d-flex justify-content-center align-items-center px-4">
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-12 rounded-2 py-4 px-4">

                  <form onSubmit={ handleForm } className="d-flex flex-column">
                    <div className=" d-flex flex-column align-items-center gap-2 mb-4" > 
                      <div className="d-flex mb-3" >
                        <span className="d-flex align-items-center justify-content-center bg-blue-clr border px-4 py-2 rounded-2 shadow-sm"> <i class="bi bi-house-door-fill fs-3 text-white"></i> </span>
                      </div>
                      <span className="lead text-muted text-start"> Imopro - connexion </span>
                    </div>
                    {
                      isLoading && (
                        <div className="d-flex justify-content-center align-items-center mb-3"> 
                          <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div>
                        </div>
                      )
                    }
                    {
                      status ==== -1 && (
                        <div className="col-md-12 mb-2">
                          <div className="alert alert-danger">
                            Erreur d'authentification, rééssayer.
                          </div>
                        </div>
                      )
                    }
                    <input type="text" name="login" className="border text-muted p-3 rounded-2 mb-3" placeholder="Email ou numéro de téléphone" required onChange={ handleInputs } />
                    <input type="password" name="password" className="border text-muted p-3 rounded-2 mb-3" placeholder="Mot de passe" required onChange={ handleInputs } />
                             
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


