import React from 'react';
import { NavigationBar, TopBar } from ''./Header';


export function Slide() 
{
    return (

      <div className="slides"> 
        <div className="slides-half-cover"> 
          <div className="row h-100 d-flex align-items-center ps-4" >
            <div className="col-md-10 d-flex flex-column p-4" >
              <div className="d-flex align-items-center  mb-3" >
                <span className="d-flex align-items-center justify-content-center bg-light px-4 py-2 rounded-2 shadow-sm"> 
                  {/* <i class="bi bi-house-door-fill fs-3 text-blue-clr"></i>  */}
                  <img src={'../favicon.png'} className="" alt="Logement extérieur" style={{ width: "80px" }} />
                </span>
              </div>
              <span className="h1 text-light"> ImoPro votre entreprise immobilière </span>
              <span className="lead text-light" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
            </div>
          </div>      
        </div>
      </div>

    )
}
    

function SlideTextContain () {
    return (
             
          <div className="row h-100 d-flex align-items-center" >
            <div className="col-lg-10 d-flex flex-column align-items-center h-100 p-5 border" >
              <span className="h1 text-light"> ImmoPro votre entreprise immobilière </span>
              <span className="lead text-light" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
            </div>
          </div>
    )
}