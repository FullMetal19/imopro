import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
export function HouseContainer({ data, onVisit, onDetails }) 
{
    return (

      <div className="card my-4 shadow-sm">
        <div className="d-flex px-2 py-1">
         <span className="text-secondary mb-2"> { data?.company?.name} </span>
        </div>
        {/* Image principale */}
        <img src={ data?.media[0]?.path } className="card-img-top" alt="Logement extérieur" style={{ height: "240px", objectFit: "cover" }} />
        {/* Galerie */}
        <div className="d-flex gap-3 p-3">
          <img src={ data?.media[1]?.path } className="rounded" alt="Intérieur 1" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
          <img src={ data?.media[2]?.path } className="rounded" alt="Intérieur 2" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
          <img src={ data?.media[3]?.path } className="rounded" alt="Intérieur 3" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
        </div>
        {/* Contenu */}
        <div className="border-top py-2 px-3">
          <span className="lead bg-gray-light border text-secondary px-3 py-1 rounded-4">
           { data?.price +  ' Fcfa ' } { ( data?.title === "à louer" ) && " / mois" } 
          </span>
        </div>
        <div className="border-top border-bottom py-2 px-3">
          <h5 className="card-title text-secondary"> { data?.subtitle + ' ' + data?.title } </h5>
          <p className="text-secondary mb-2"> { data?.address } </p>
        </div>
        {/* Boutons */}
        <div className="d-flex justify-content-between p-3">
          <a href={"/propriete/" + data?.id } className="btn btn-outline-secondary d-flex align-items-center" onClick={onDetails}  >
            <i className="bi bi-eye me-2"></i> Details
          </a>
          <button className="btn btn-secondary d-flex align-items-center" onClick={onVisit} >
            <i className="bi bi-geo-alt-fill me-2"></i> Visit
          </button>
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
