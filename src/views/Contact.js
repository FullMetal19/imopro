import React, { useState } from "react";
import vector from "../config/data";
import { ContactContainer } from "../components/Container";
import { Header } from "../components/Header";
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

        <div>
            { loginChecker ? ( <LoginCheckerModal method={ closeoginCheckerModal } message={" Refus d'accès !!! veuillez vous authentifier dabord avant d'envoyer un message."}  />  ) : null }
            <Header designClass={'row shadow'} page={5} />
            {/* ************************************************************************ */}   
            <div className="container-fluid bg-three-clr py-5 px-4 d-flex justify-content-center"> 
               <span className="h3 text-center bold color-blue px-5 py-2 border-blue rounded-1"> Nos contacts </span>
            </div>
            {/* ************************************************************************ */}
            <div className="container" >
                <div className="row py-5" > 
                { 
                    vector.contact?.map(( item , index ) => { return(
                        <ContactContainer image={ item.image } tel1={ item.tel1 } tel2={ item.tel2 } key={index} />
                    )}) 
                }
                </div> 
            </div>
            {/* ************************************************************************ */}
            <div className="container py-5" >
                <form className="row p-5 border mb-5" onSubmit={handleForm} > 
                    <div className="col-md-12 mb-5" > 
                        <div className=" d-flex flex-column border-left-main ps-2 ms-1" > 
                            <span className="fs-lg bold text-clr"> Lorem Ipsum is simply dummy </span>
                            <span className="text-clr"> Lorem Ipsum is simply dummy text of the and typesetting </span>
                        </div> 
                    </div> 
                    {
                        isLoading ? ( <div className="col-md-12 mb-4"> loading... </div> ) : null 
                    }
                    {
                        (status === 1) ? ( <div className="col-md-12 mb-4"> <div className="alert alert-success">  Message envoyé avec succés. Notre équipe vous contactera d'ici peu. Merci  </div> </div> ) : 
                        ( (status === -1) ?  ( <div className="col-md-12 mb-4"> <div className="alert alert-danger"> Oops ! une erreur est survenue durant l'envoir. Veuillez réessayer à nouveau  </div> </div> ) : null ) 
                    }
                    <div className="col-md-12 mb-4" > 
                        <input type="text" name="title" className="form-control" placeholder="Objet du message" required onChange={handleInputs} />
                    </div>
                    <div className="col-md-12 mb-4" > 
                        <textarea className="form-control" name="message" rows={10} placeholder="Contenu du message message" onChange={handleInputs} />
                    </div>
                    <div className="col-md-12 mb-4" > 
                        <button type="submit" className="btn btn-main "> Envoyez </button> 
                    </div>
                </form> 
            </div>
            {/* ************************************************************************ */}
            <Footer /> 
        </div>
    )
}


