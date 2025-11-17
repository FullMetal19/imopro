
export function Slide() 
{
    return (

      <div className="slides"> 
        <div className="slides-half-cover"> 
          <div className="row h-100 d-flex align-items-center ps-4" >
            <div className="col-md-10 d-flex flex-column p-4" >
              <div className="d-flex align-items-center  mb-3" >
                <span className="d-flex align-items-center justify-content-center bg-light px-4 py-2 rounded-2 shadow-sm"> 
                  <img src={'../favicon.png'} alt="Logement extérieur" style={{ width: "80px" }} />
                </span>
              </div>
              <h1 className="h1 text-light"> Diwane+, la plateforme immobilière de référence. </h1>
              <p className="lead text-light"> Accédez dès maitenant aux meilleures opportunités immobilières du secteur sans effort. Un catalogue actualisé de biens d'exception, du terrain à la villa, à portée de clic. </p>
            </div>
          </div>      
        </div>
      </div>

    )
}
    