import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { TextReducer } from "./Component";




export function ServiceContainer({ title, description }) 
{
    return (

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="shadow-sm rounded-2 d-flex flex-column align-items-center p-4 scale bg-white">
          <span className="text-secondatry mb-3"> <i className="bi bi-patch-check fs-1"></i> </span>
          <div className="card-body">
            <p className="lead bold text-secondary text-center"> { title } </p>
            <p className="lead text-secondary text-center"> { description } </p>
          </div>
        </div>
      </div>
    )
}

// ****************************************************************************************************
export function LocationContainer({region, count}) 
{
    return (

      <div className="px-2">
        <div className="region-container rounded-3">
          <div className="region-overlayer py-3 rounded-3">    
            <div className="d-flex flex-column"> 
              <div className="d-flex flex-column align-items-center border-bottom px-4"> 
                <span className="text-light fs-5 mb-3"> { region } </span>
              </div>
              <div className="d-flex flex-column align-items-center pt-4 px-4 pb-3"> 
                <span className="text-light h2 mb-2 py-2 px-4 border border-light border-2"> { count } </span>
                <span className="text-light lead"> propriété(s) </span>
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
}

// ****************************************************************************************************************
export function HouseContainer({ data, onVisit }) 
{
    return (

      <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
        {/* Image principale */}
        <img src={ data?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
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
    
      <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
        {/* Image principale */}
        <img src={ data?.media[0]?.path } className="card-img-top rounded-top-2" alt="Logement extérieur" style={{ height: "250px", objectFit: "cover" }} />
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
                <span className='circle bg-white border-main mb-2' > <img src={'../img/icons8-citation-à-droite-100.png'} alt="Logo" width={60} height={60} /> </span>
                <div className="text-start text-clr mb-3"> < TextReducer text={desc} maxsize={100} /> </div>
                <div className="text-start text-clr h6"> { title }  </div>
            </div>
        </div>      
    )
}

//***********************************************************************************************************************
export function ContactContainer({ tel1 , tel2 }) 
{
    return (
    
        <div className="col-md-6 col-lg-4 mb-3"> 
            <div className="d-flex flex-column border p-4 bg-white"> 
                <div className="d-flex justify-content-center align-items-center my-3 " > 
                    <span className='circle bg-three-clr' > <i className="bi bi-check-circle text-blue-clr fs-1"></i> </span>
                </div>
                <span className="text-center text-secondary lead mb-2 p-2 border rounded-2"> { tel1 } </span>
                <span className="text-center text-secondary lead mb-2 p-2 border rounded-2"> { tel2 } </span>
            </div>
        </div>
    )
}
