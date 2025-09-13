import React from "react";
import { TextReducer } from "./Component";




export function ServiceContainer({children, title , desc}) 
{
    return (

        <div className="col-md-6 col-lg-4 mb-4"> 
            <div className="d-flex flex-column border p-4 bg-white"> 
                <div className="d-flex justify-content-center align-items-center mb-2" > 
                    <span className='circle bg-snd-clr' > <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="" /> </span>
                </div>
                <span className="text-center text-clr h4 mb-2" width="200" height="200" > { title }  </span>
                <span className="text-center text-clr mb-3" width="200" height="200" > { desc }  </span>
                <div className="text-center"> { children } </div>
            </div>
        </div>
    )
}

// ****************************************************************************************************
export function LocationContainer({title , desc, id}) 
{
    return (

        <div className="d-flex flex-column border p-2 bg-white border-btm-main mx-2"> 
            <div className="d-flex flex-column justify-content-center align-items-center mb-2" >
                {/* <span className="text-start property text-clr px-4" > 10 propriétés </span> */}
                <img src={'../img/pexels-pixabay-534228.jpg'} alt="Logo" height={200} className="w-100" />
            </div>
            <span className="text-start text-clr mb-1" > { desc } </span>
            <span className="text-start text-clr h5 mb-1" > { title } </span>
            <a className="mb-2 nav-link text-start main-color link" href={ "/proprietes/" + id } > Plus d'information </a>
        </div>
    )
}

// ****************************************************************************************************************
export function HouseContainer({image, price, desc, title, id, companyName}) 
{
    return (
        
        <div className="d-flex flex-column border bg-white mx-2"> 
            <div className="d-flex flex-column justify-content-center align-items-center mb-3" >
                <img alt="Logo" height={200} className="w-100" src={`${process.env.REACT_APP_PATH}/${image}`} />
            </div>
            <div className="d-flex flex-column px-3" >
                <span className="text-start main-color h6 mb-1" > { price } Fcfa/mois </span>
                <span className="text-start text-clr h6 mb-1" > { title } </span>
                <span className="text-start text-clr" > < TextReducer text={ desc } maxsize={80} /> </span>
            </div>
            <hr />
            <div className="row d-flex justify-content-between px-3" >   
                <div className="col-7 d-flex align-items-center mb-3">
                    <span className="main-color px-2 py-1 fs-xs border" > < TextReducer text={companyName} maxsize={12} /> </span>
                </div>
                <div className="col-4">
                    <a className="mb-3 btn btn-main text-center nav-link text-white fs-xs py-1 link" href={ "/propriete/" + id } > voir plus </a>
                </div>
            </div>
        </div>        
    )
}

//******************************************************************************************************************
export function FieldContainer({image, price, desc, title, id}) {

    return (
    
        <div className="d-flex flex-column border bg-white mx-2"> 
            <div className="d-flex flex-column justify-content-center align-items-center mb-3" >
               <img alt="Logo" height={200} className="w-100" src={`${process.env.REACT_APP_PATH}/${image}`} />
            </div>
            <div className="d-flex flex-column px-3" >
                <span className="text-start main-color h5 mb-1" > { title } </span>
                <span className="text-start text-clr" > < TextReducer text={desc} maxsize={80} /> </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between px-3 mb-1" >
                <div className="d-flex align-items-center mb-3">
                    <img src={'../img/icons8-calendrier-96.png'} alt="Logo" width={20} height={20} className="me-1" />
                    <span className="text-start" > { price } Fcfa </span>
                </div>
                <a className="mb-3 px-2 btn btn-main text-center nav-link text-white fs-xs py-1 link" href={ "/propriete/"+ id }> voir plus </a>
            </div>
        </div>
    )
}

//*****************************************************************************************************************
export function TestimonialContainer({title, desc}) 
{
    return (
             
        <div className="mb-3 px-2"> 
            <div className="d-flex flex-column bg-snd-clr px-4 py-3 rounded-4 w-100"> 
                <span className='circle bg-white border-main mb-2' > <img src={'../img/icons8-citation-à-droite-100.png'} alt="Logo" width={60} height={60} className="" /> </span>
                <div className="text-start text-clr mb-3"> < TextReducer text={desc} maxsize={100} /> </div>
                <div className="text-start text-clr h6"> { title }  </div>
            </div>
        </div>      
    )
}

//***********************************************************************************************************************
export function ContactContainer({image, tel1 , tel2}) 
{
    return (
    
        <div className="col-md-6 col-lg-4 mb-3"> 
            <div className="d-flex flex-column border p-4 bg-white"> 
                <div className="d-flex justify-content-center align-items-center mb-2" > 
                    <span className='circle bg-snd-clr' > <img src={ image } alt="Logo" width={60} height={60} className="" /> </span>
                </div>
                <span className="text-center text-clr mb-2" width="200" height="200" > { tel1 } </span>
                <span className="text-center text-clr mb-3" width="200" height="200"> { tel2 } </span>
            </div>
        </div>
    )
}
