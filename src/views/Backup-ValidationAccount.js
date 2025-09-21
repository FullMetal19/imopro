import React, { useState } from 'react';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';


export function ValidateAccount(){

    const user = UserApi();
    const [ code, setCode ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const res = await user.activateAccount({ code : code });
            (res.data.success) ? setStatus(1) : setStatus(-1);
            setIsLoading(false);
        } catch (err) { 
            setStatus(-1); 
            setIsLoading(false);
        } 
    } 
    
    return (

        <div>
            {/* ************************************************************************ */}   
            <div className="container-fluid bg-three-clr p-4"> 
                <div className="d-flex flex-column align-items-center ps-2 ms-1" > 
                    <span className="circle bg-snd-clr"> <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="mb-2" /> </span>
                    <span className="fs-lg color-blue"> Univers service </span>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className="container" >
                <div className="row py-5 d-flex justify-content-center" >
                    <div className="col-lg-7 col-md-8 mb-5 border py-5 px-4" >
                        <form className="" onSubmit={ handleForm }>  
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../img/icons8-iphone-spinner.gif'} height={24} width={24} alt="Logo" /> </div> ) : null 
                            }
                            {
                                ( status === 1 ) ? 
                                ( <div className="col-md-12 mb-4"> <div className="alert alert-success"> USVC vous remercie, votre compte est créé avec succes. </div> </div> ) :
                                ( status === -1 ) ?
                                ( <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Erreur! veillez revoir le code reçu. </div> </div> ) 
                                : null
                            }
                            <div className="row" >
                                <div className="col-md-12 mb-5" > 
                                    <div className="d-flex flex-column border-left-main ps-2 ms-1" > 
                                        <span className="fs-lg bold main-color"> Validation de compte utilisateur </span>
                                        <span className="color-blue"> Veillez consulter votre messagerie un code de validation vous sera envoyé pour finaliser la creation de votre compte. </span>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2" > 
                                    <span className="border-left-main fs-xs ps-1"> Veuillez mettre le code que vous avez reçu ici </span> 
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <input type="text" name="code" className="form-control" placeholder="code" required onChange={ e => setCode(e.target.value)  } />
                                </div>
                                <div className="col-md-12 mb-3" > 
                                    <button type="submit" className="btn btn-main"> Valider compte </button> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-7 col-md-8 d-flex justify-content-end" >
                        <a href="/" className="link btn-white btn main-color"> Acceuil </a>
                    </div>
                </div> 
            </div>
            {/* ************************************************************************ */}
            <div className="container-fluid"> 
                <BottomBar /> 
            </div>
        </div>
    )
}


