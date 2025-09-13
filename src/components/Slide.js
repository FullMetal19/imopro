import React from 'react';
import { NavigationBar, TopBar } from './Header';


export function Slide({page}) {
    return (

        <div className="container-fluid slides pt-2"> 
            <TopBar designClass={'pt-1'} />
            <hr className='border' />
            <NavigationBar page={page} />
            <SlideTextContain />
        </div> 
    )
}
    

function SlideTextContain () {
    return (
             
        <div className="row d-flex justify-content-center mt-5 pt-5" >
            <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center mt-5" >
                <span className="text-center color-gray display-5 bold mb-3"> ImmoPro votre entreprise immobilière </span>
                <span className="text-center color-gray text-clr mb-4" > Lorem Ipsum is simply dummy text of the and typesetting. Lorem Ipsum is simply dummy </span>
                <div> <a className="btn btn-lg btn-main px-5 py-3" href="/connexion"> Bienvenue </a> </div>  
            </div>
         </div>
    )
}