import React from 'react';

export function Footer() 
{
    return (

        <div className="container-fluid bg-blue-clr pt-5 mt-5"> 
            <FootBar />
            <BottomBar />
        </div>  
    )
}


function FootBar ()
{
    return (

        <div className="px-4"> 
            {/* *********************************************************************** */}
            <div className="row bg-main p-4 marge-m-60 mx-4">
                <div className="col-lg-9 d-flex flex-column mb-4">
                    <span className="color-gray h2 mb-2 text-start" > Lorem Ipsum is simply dummy text. </span>
                    <span className="color-gray text-start" > Lorem Ipsum is simply dummy text of the and. </span>
                </div>
                <div className="col-lg-3">
                    <button type="submit" className="btn btn-lg btn-white main-color"> Explorer plus </button> 
                </div>
            </div>
            {/* *********************************************************************** */}
            <div className="row mb-5"> 
                <div className="col-lg-4 col-md-6 mb-5 pe-5"> 
                    <div className="d-flex flex-column"> 
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="" />
                            <span className="h1 ms-2 color-gray" > USVC </span>
                        </div>
                        <span className="color-gray mb-3 text-start" > Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.  text of the and typesetting industry. Lorem Ipsum is dummy text of the printing. </span>
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-position-100.png'} alt="Logo" width={20} height={20} className="me-1" />
                            <span className="color-gray" > Sanar,Saint Louis </span>
                        </div>
                        <div className="col-md-4 d-flex"> 
                            <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-twitter-100.png'} alt="Logo" width={20} height={20} className="" /> </a>
                            <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-facebook-90.png'} alt="Logo" width={20} height={20} className="" /> </a>
                            <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-instagram-100.png'} alt="Logo" width={20} height={20} className="" /> </a>
                            <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-lecture-de-youtube-100.png'} alt="Logo" width={20} height={20} className="" /> </a>
                            <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-tic-tac-100.png'} alt="Logo" width={20} height={20} className="" /> </a>
                         </div>
                    </div>
                </div>
                {/* *********************************************************************** */}
                <div className="col-lg-3 col-md-6 mb-5"> 
                    <div className="d-flex flex-column"> 
                        <span className="h1 color-gray text-start mb-4" > Contact </span>
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-position-100.png'} alt="Logo" width={20} height={20} className="me-1" />
                            <span className="color-gray" > Sanar,Saint Louis </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-téléphone-débranché-100-1.png'} alt="Logo" width={20} height={20} className="me-1" />
                            <span className="color-gray" > +221 77 000 00 00 </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-téléphone-débranché-100-1.png'} alt="Logo" width={20} height={20} className="me-1" />
                            <span className="color-gray" > +221 77 000 00 00 </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <img src={'../img/icons8-nouveau-message-52-2.png'} alt="Logo" width={20} height={20} className="me-1" />
                            <span className="color-gray" > usvc@gmail.com </span>
                        </div>
                    </div>
                </div>
                {/* *********************************************************************** */}
                <div className="col-lg-2 col-md-6"> 
                    <div className="d-flex flex-column"> 
                        <span className="h1 color-gray text-start mb-4" > Service </span>
                        <a className="mb-3 nav-link text-start color-gray link-outline" href="/"> S'inscrire </a>
                        <a className="mb-3 nav-link text-start color-gray link-outline" href="/"> Apropros </a>
                        <a className="mb-3 nav-link text-start color-gray link-outline" href="/"> Aide </a>
                        <a className="mb-3 nav-link text-start color-gray link-outline" href="/"> Mon compte </a>
                        <a className="mb-3 nav-link text-start color-gray link-outline" href="/"> Service </a>
                    </div>
                </div>
                {/* *********************************************************************** */}
                <div className="col-lg-3 col-md-6"> 
                    <div className="d-flex flex-column"> 
                        <span className="h1 color-gray text-start mb-4" > Newsletter </span>
                        <span className="color-gray mb-3 text-start" > Lorem Ipsum is simply dummy text of the and typesetting industry. </span>
                        <div className="input-group mb-4">
                            <input type="text" name="" className="form-control form-control-lg fs-xs" placeholder="email" required />
                            <button type="submit" className="btn btn-lg btn-main "> s </button> 
                        </div>
                        <span className="h4 color-gray text-start mb-3" > Modele de paiement </span>
                        <div className="d-flex justify-content-center bg-white p-2"> 
                            <img src={'../img/icons8-paypal-96.png'} alt="Logo" width={60} height={40} className="" /> 
                            <img src={'../img/wa-removebg-preview.png'} alt="Logo" width={90} height={40} className="" /> 
                            <img src={'../img/wav-removebg-preview.png'} alt="Logo" width={90} height={40} className="" /> 
                        </div>
                    </div>
                </div>
                {/* *********************************************************************** */}
            </div>
        </div>
    )
}


export function BottomBar ()
{
    return (

        <div className="row bg-black d-flex justify-content-between align-items-center p-4"> 
            <div className="col-md-6 d-flex align-items-center"> 
                <span className="color-gray" > Copyright@usvc2024 </span>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end"> 
                <a className="me-4 nav-link color-gray link-outline" href="/"> Condition d'utilisation </a>
                <a className="me-4 nav-link color-gray link-outline" href="/"> Politique privée </a>
            </div>
        </div>
    )
}



