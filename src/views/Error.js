import React from "react";


export function Error()
{
    return(

        <div className="container-fluid">
          <div className="row justify-content-center align-items-center bg-light vh-100">
            <div className="col-lg-5 col-md-9">
               <div className="d-flex flex-column justify-content-center align-items-center bg-light border border-secondary rounded-3 p-4">
                  <img src={'https://res.cloudinary.com/daitesqqd/image/upload/v1767627041/favicon_mrsntv.ico'} className="mb-4" alt="logo-diwane-plus" style={{ width: "120px" }} />
                  <span className="display-1 mb-4"> PAGE 404</span>
                  <span className="lead border px-5 py-1"> Diwane-plus </span>
               </div>
            </div>
          </div>
        </div>

    )
}