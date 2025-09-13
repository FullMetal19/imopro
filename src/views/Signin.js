import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomBar } from "../components/Footer";
import { Header } from '../components/Header';
import { UserApi } from '../services/user.api';
import { PasswordModal } from '../components/Modal';

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
        console.log(inputs);
        setStatus(0);
        setIsLoading(true);
        try {
            const res = await user.auth(inputs);
            setIsLoading(false);
            if( res.data.success ){
                setIsLoading(false);
                sessionStorage.setItem("uid", res.data.uid);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("status", res.data.status);
                sessionStorage.setItem("companyStatus", res.data.companyStatus);
                sessionStorage.setItem("fname", res.data.fname);
                sessionStorage.setItem("lname", res.data.lname);
                sessionStorage.setItem("email", res.data.email);
                sessionStorage.setItem("phone", res.data.phone);
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
            <Header designClass={'row shadow'} />
            {/* ************************************************************************ */}   
            <div className="container-fluid bg-three-clr py-5 px-4 d-flex justify-content-center"> 
               <span className="h3 text-center color-blue px-5 py-2 border-blue rounded-1"> Connexion </span>
            </div>
            {/* ************************************************************************ */}
            <div className="container py-5" >
                <form onSubmit={ handleForm }>
                    <div className="row py-5 d-flex justify-content-between" > 
                        <div className="col-md-5 mb-5" > 
                            <div className=" d-flex flex-column border-left-main ps-2 ms-1 mb-5" > 
                                <span className="fs-lg bold color-blue"> Formulaire d'authenfication </span>
                                <span className="color-gray font-xs"> Veuillez saisir les informations de connexion pour chaque champs corespondant specifiés ci-dessous  </span>
                            </div>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../img/icons8-iphone-spinner.gif'} height={24} width={24} alt="Logo" /> </div> ) : null 
                            }
                            {
                               (status === -1) ? ( <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Erreur d'authenfication. Veuillez vérifier vos informations de connexion et réessayer. </div> </div> ) : null
                            }
                            <input type="text" name="login" className="form-control mb-3" placeholder="Email ou numéro de téléphone" required onChange={ handleInputs } />
                            <input type="password" name="password" className="form-control mb-3" placeholder="mot de passe" required onChange={ handleInputs } />
                            <div className="col-md-12 mb-4" > 
                                <button type="submit" className="btn btn-main"> Envoyez </button> 
                            </div>
                            <span className="btn link-outline cursor" onClick={ setModal } > Mot de passe oublié ? </span> 
                        </div> 
                        <div className="col-md-4 my-4" > 
                            <div className=" d-flex flex-column align-items-center" >
                                <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={80} height={80} className="mb-4" /> 
                                <span className="text-center fs-lg bold color-blue mb-3"> Création de compte utilisateur </span>
                                <span className="text-center text-clr mb-4"> Cliquez sur le bouton ci-dessous, remplissez le formulaire d'inscription facilement et profitez de nos services. </span>
                                <div className="col-md-12 mb-4 text-center" > 
                                    <a href="/inscription" className="btn btn-white"> S'inscrire </a>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </form>
            </div>
            {/* ************************************************************************ */}
            <div className="container-fluid"> 
                <BottomBar /> 
            </div>
        </div>
    )
}


