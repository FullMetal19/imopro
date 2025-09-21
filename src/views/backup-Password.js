import React, { useState } from 'react';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';


export function Password(){

    const user = UserApi();
    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInputs = ( event ) => {
        const { name , value } =  event.target;
        setInputs( { ...inputs, [name] : value   } );
    }

    const handleForm = async ( event ) => {
        event.preventDefault();
        console.log(inputs);
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
        else{ setStatus(-2) }
    } 
    
    return (

        <div>
            {/* ************************************************************************ */}   
            <div className="container-fluid bg-three-clr p-4"> 
                <div className="d-flex justify-content-center" > 
                    <span className="bg-three-clr px-4 py-2 fs-lg color-blue border rounded-1"> Modification de mot de passe </span>
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
                               (  <div className="col-md-12 mb-4"> <div className="alert alert-success"> Mot de passe mise à jour avec succès. </div> </div> ) :
                               ( status === -1 ) ?
                               (  <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Une erreur est survenue pendant le traitement. </div> </div>) :
                               ( status === 2 ) ?
                               ( <div className="col-md-12 mb-4"> <div className="alert alert-warning"> Erreur! veillez revoir votre mot de passe et la confirmation. </div> </div> )
                               : null
                            }
                            <div className="row" >
                                <div className="col-lg-12 mb-3 d-flex flex-column">
                                    <span className="border-left-main fs-xs color-blue ps-1 mb-1"> Veuillez mettre le code que vous avez reçu ici </span>
                                    <input type="text" name="code" className="form-control" placeholder="code" required onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-12 mb-3 d-flex flex-column">
                                    <span className="border-left-main fs-xs color-blue ps-1 mb-1"> Votre nouveau mot de passe </span>
                                    <input type="password" name="password" className="form-control" required onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-12 mb-4 d-flex flex-column">
                                    <span className="border-left-main fs-xs color-blue ps-1 mb-1"> Confirmer votre nouveau mot de passe </span>
                                    <input type="password" name="cpassword" className="form-control" required onChange={ handleInputs } />
                                </div>
                                <div className="col-md-12" > 
                                    <button type="submit" className="btn btn-main"> Enregistrer </button> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-7 col-md-8 d-flex justify-content-end" >
                        {
                            ( status === 1 ) ? ( <a href="/connexion" className="link btn-white btn main-color"> Se connecter </a> ) : null
                        }    
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


