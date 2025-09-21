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
export function HouseContainer({ data, onVisit }) 
{
    return (

      <div className="card my-4 shadow-sm border-0">
        {/* Image principale */}
        <img src={ data?.media[0]?.path } className="card-img-top" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
        {/* Galerie */}
        <div className="d-flex gap-3 p-3">
          <img src={ data?.media[1]?.path } className="rounded" alt="Intérieur 1" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
          <img src={ data?.media[2]?.path } className="rounded" alt="Intérieur 2" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
          <img src={ data?.media[3]?.path } className="rounded" alt="Intérieur 3" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
        </div>
        {/* Contenu */}
        <div className="px-3 pb-3 pt-1">
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
          <a href={"/propriete/" + data?.id } className="btn btn-outline-secondary d-flex align-items-center"  >
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
export function FieldContainer({ data, onVisit }) {

    return (
    
        <div className="card my-4 shadow-sm border-0">
        {/* Image principale */}
        <img src={ data?.media[0]?.path } className="card-img-top" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
        {/* Contenu */}
        <div className="px-3 py-4">
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
          <a href={"/propriete/" + data?.id } className="btn btn-outline-secondary d-flex align-items-center" >
            <i className="bi bi-eye me-2"></i> Details
          </a>
          <button className="btn btn-secondary d-flex align-items-center" onClick={onVisit} >
            <i className="bi bi-geo-alt-fill me-2"></i> Visit
          </button>
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
