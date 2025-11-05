import React, { useState } from 'react';
import { BottomBar } from "../components/Footer";
import { UserApi } from '../services/user.api';
import { useNavigate } from 'react-router';


export function ValidateAccount(){

    const user = UserApi();
    const [ code, setCode ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);
        setStatus(0);
        try {
            const {data} = await user.activateAccount({ code : code });
            if ( data.success ){
                setStatus(1);
                navigate('/');
            }
            else{
                setStatus(-1);
            }
            setIsLoading(false);
        } catch (err) { 
            setStatus(-1); 
            setIsLoading(false);
        } 
    } 
    
    return (
  
    <div className="container-fluid"> 
      <div className="row vh-100 d-flex align-items-center ">
        <div className="col-lg-12 py-5">
          <div className="row d-flex flex-column align-items-center justify-content-center py-5 px-2">
            <div className="col-lg-6 col-md-9 rounded-4 border py-5 px-4 mb-5 shadow-sm">

              <form onSubmit={ handleForm } className="d-flex flex-column">
                <div className=" d-flex flex-column gap-2 mb-4" > 
                  <div className="d-flex" >
                     <span className="mb-3 hide bg-secondary px-4 py-2 rounded-2 shadow-sm"> <i class="bi bi-house-door-fill fs-3 text-light"></i> </span>
                  </div>
                  <span className="fs-4 text-secondary text-start"> Imopro - Validation compte </span>
                  <span className="text-secondary text-start">
                    Merci de votre inscription ! Un code de validation vous a été envoyé par SMS. Saisissez-le ci-dessous pour activer votre compte.
                  </span>
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
                      <div className="alert alert-danger">
                        Erreur! veillez revérifier le code reçu puis rééssayer.
                      </div>
                    </div>
                  )
                }
                {/* -------------------------------- */}
                <div className="col-md-12 mb-2"> 
                  <div className="d-flex gap-2 mb-2" >
                    <input type="number" name="code" placeholder="Code" className="w-100 border input py-3 px-3 text-muted rounded-2"  required onChange={ e => setCode(e.target.value)  }/>
                    <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                  </div>
                </div>
                {/* -------------------------------- */}
                <div>
                  <button type="submit" className="btn btn-lg bg-blue-clr text-white px-4 mt-2"> 
                    Soumettre <i className="bi bi-arrow-right"></i> 
                  </button> 
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
      
    )
}


