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
        else setStatus(2)
    } 

    return (

        <div>
            <Header designClass={'row shadow'} />
            {/* ************************************************************************ */}
            <div className="container" >
                <div className="row py-5 d-flex justify-content-center" > 
                    <div className="col-lg-12 mb-4" >
                        <div className="d-flex flex-column align-items-center ps-2 ms-1" > 
                            <span className="circle bg-snd-clr"> <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="mb-2" /> </span>
                            <span className="fs-lg color-blue"> Univers service </span>
                        </div>
                    </div> 
                    <div className="col-lg-8 mb-5 border p-5" >
                        <form className="" onSubmit={ handleForm }>
                            {
                                isLoading ? ( <div className="d-flex justify-content-center mb-4"> <img src={'../img/icons8-iphone-spinner.gif'} height={24} width={24} alt="Logo" /> </div> ) : null 
                            }
                            {
                               ( status === 1 ) ? 
                               (  <div className="col-md-12 mb-4"> <div className="alert alert-success"> Veillez consulter votre messagerie un code de validation vous sera envoyé pour finaliser la creation de votre compte. </div> </div> ) :
                               ( status === -1 ) ?
                               (  <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Une erreur est survenue lors de la creation de votre veillez rééssayer s'il vous plait. </div> </div>) :
                               ( status === 2 ) ?
                               ( <div className="col-md-12 mb-4"> <div className="alert alert-warning"> Erreur! veillez revoir votre mot de passe et la confirmation. </div> </div> )
                               : null
                            }
                            <div className="row" >
                                <div className="col-md-12 mb-5" > 
                                    <div className="d-flex flex-column border-left-main ps-2 ms-1" > 
                                        <span className="fs-lg bold main-color"> Creation de compte utilisateur </span>
                                        <span className="text-clr"> Lorem ipsum is simply dummy text of the and typesetting ipsum is simply dummy text of the and typesetting </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3" >
                                    <input type="text" name="fname" className="form-control" placeholder="prénom" required onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-6 mb-3" >
                                    <input type="text" name="lname" className="form-control" placeholder="nom" required onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-6 mb-3" >
                                    <select className="form-select" name='sex' aria-label="Default select example"  onChange={ handleInputs }>
                                        <option value="" > sexe </option>
                                        <option value="masculin" > Masculin </option>
                                        <option value="feminin" > Féminin </option>
                                    </select>
                                </div>
                                <div className="col-lg-6 mb-3" >
                                    <input type="text" name="phone" className="form-control" placeholder="numéro de tel" onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-6 mb-3" >
                                    <input type="text" name="email" className="form-control" placeholder="email" onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-6 mb-3" >
                                    <input type="password" name="password" className="form-control" placeholder="mot de passe" required onChange={ handleInputs } />
                                </div>
                                <div className="col-lg-6 mb-4" >
                                    <input type="password" name="cpassword" className="form-control" placeholder="confirmer mot de passe" required onChange={ handleInputs } />
                                </div>
                                <div className="col-md-12 mb-3" > 
                                    <button type="submit" className="btn btn-main"> S'inscrire </button> 
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 my-5" >
                        <div className=" d-flex flex-column border-left-main ps-2 ms-1 mb-5" > 
                            <span className="fs-lg bold text-clr"> Lorem Ipsum is simply dummy </span>
                            <span className="text-clr"> Lorem ipsum is simply dummy text of the and typesetting ipsum is simply dummy text of the and typesetting </span>
                        </div>
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


