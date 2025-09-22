import React, { useState } from "react";
import vector from "../config/data";
import { ContactContainer } from "../components/Container";
import { Header, NavigationBar, TopBar } from "../components/Header";
import { Footer } from "../components/Footer";
import { MessageApi } from "../services/messsage.api";
import { LoginCheckerModal } from "../components/Modal";


export function Contact(){

    const message = MessageApi();

    const [ inputs, setInputs ] = useState();
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputs = ( event ) => {
        const { name , value } =  event.target ;
        setInputs( { ...inputs, [name] : value   } );
    }

    const [ loginChecker , setloginChecker ] = useState(false);
    const closeoginCheckerModal = ( arg ) => {  setloginChecker( arg ) }  

    const handleForm = async ( event ) => {
        event.preventDefault();
        setIsLoading(true);

         if (sessionStorage.getItem('token')) {
            setloginChecker(false);
            const uid = sessionStorage.getItem('uid');
            try {
                const res = await message.insert(inputs, uid);
                setIsLoading(false);
                (res.data.success) ? setStatus(1) : setStatus(-1); 
            } catch (err) { 
                setStatus(-1);
                setIsLoading(false);
            }
        } 
        else{
            setloginChecker(true);  
        }
    } 

    return (

        <div className="container-fluid bg-light">
            { loginChecker ? ( <LoginCheckerModal method={ closeoginCheckerModal } message={" Refus d'accès !!! veuillez vous authentifier dabord avant d'envoyer un message."}  />  ) : null }
            <div className="row"> 
              <TopBar  />
            </div> 
            <div className="row sticky-top"> 
              <NavigationBar page={5} />
            </div>
            {/* ************************************************************************ */}   
            <div className="row bg-three-clr py-5 px-4 d-flex justify-content-center"> 
               <span className="lead fs-2 text-center text-secondary"> Nos contacts </span>
            </div>
            {/* ************************************************************************ */}
            <div className="row justify-content-center py-5" > 
              <div className="col-lg-9 pt-4" >
                <div className="row" > 
                { 
                    vector.contact?.map(( item , index ) => { return(
                        <ContactContainer image={ item.image } tel1={ item.tel1 } tel2={ item.tel2 } key={index} />
                    )}) 
                }
                </div>
              </div> 
            </div> 
            {/* ************************************************************************ */}
            <div className="row justify-content-center">

              <div className="col-lg-9 py-5 mb-5" >
                <form className="row px-3 py-5 border bg-white rounded-3" onSubmit={handleForm} > 
                    <div className="col-md-12 mb-5" > 
                        <div className=" d-flex flex-column border-left-main px-3 ms-1 bg-gray-light py-3" > 
                            <span className="lead fs-4 text-secondary mb-1"> Lorem Ipsum is simply dummy </span>
                            <span className="text-secondary"> Lorem Ipsum is simply dummy text of the and typesetting </span>
                        </div> 
                    </div> 
                    {
                        isLoading ? ( <div className="col-md-12 d-flex justify-content-center mb-4"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div> ) : null 
                    }
                    {
                        (status === 1) ? ( <div className="col-md-12 mb-4"> <div className="alert alert-success">  Message envoyé avec succés. Notre équipe vous contactera d'ici peu. Merci  </div> </div> ) : 
                        ( (status === -1) ?  ( <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Oops ! une erreur est survenue durant l'envoir. Veuillez réessayer à nouveau  </div> </div> ) : null ) 
                    }
                    <div className="col-md-12 mb-4" > 
                        <input type="text" name="title" className="border p-3 rounded-2 text-secondary w-100" placeholder="Objet du message" required onChange={handleInputs} />
                    </div>
                    <div className="col-md-12 mb-4" > 
                        <textarea className="border p-3 rounded-2 text-secondary w-100" name="message" rows={10} placeholder="Contenu du message message" onChange={handleInputs} />
                    </div>
                    <div className="col-md-12 mb-4" > 
                        <button type="submit" className="btn btn-main"> Envoyez maintenant <i class="bi bi-arrow-right"></i>  </button> 
                    </div>
                </form> 
              </div>
            </div>
            {/* ************************************************************************ */}
            <div className="row"> 
                <Footer />
            </div>
        </div>
    )
}


