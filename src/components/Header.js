import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../services/user.api';


export function TopBar ({designClass=null}){

    return (
  
      <div className={`row d-flex justify-content-between align-items-center px-4 ${designClass}`}> 
          {/* ****************************************************************** */}
          <div className="col-md-5 d-flex align-items-center"> 
              <div className="d-flex align-items-center justify-content-center me-5">
                  <img src={'../img/icons8-nouveau-message-96.png'} alt="Logo" width={20} height={20} className="hide me-1" />
                  <span className="color-gray hide" > immoPro@gmail.com </span>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                  <img src={'../img/icons8-position-100-3.png'} alt="Logo" width={20} height={20} className="me-1 hide" />
                  <span className="color-gray hide" > Sanar,Saint Louis </span>
              </div>
          </div>
          {/* ****************************************************************** */}
          <div className="col-lg-6 d-flex align-items-center justify-content-end"> 
              {/* <a className="me-5 nav-link" href="/recherche"> <img src={'../img/icons8-search-50.png'} alt="Logo" title="recherche" width={20} height={20} className="" /> </a> */}
              <span className="color-gray me-5"> Français </span>
              <div className="d-flex"> 
                  <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-twitter-100.png'} alt="Logo" title="twitter" width={20} height={20} className="" /> </a>
                  <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-facebook-90.png'} alt="Logo" title="facebook" width={20} height={20} className="" /> </a>
                  <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-instagram-100.png'} alt="Logo" title="instagram" width={20} height={20} className="" /> </a>
                  <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-lecture-de-youtube-100.png'} alt="Logo" title="youtube" width={20} height={20} className="" /> </a>
                  <a className="me-2 nav-link" href="/"> <img src={'../img/icons8-tic-tac-100.png'} alt="Logo" title="tik tok" width={20} height={20} className="" /> </a>
              </div>
          </div>
          {/* ****************************************************************** */}
      </div>
    )
  }
  

export function NavigationBar ({designClass, page}) {

    const navigate = useNavigate();
    const user = UserApi();

    const logout = async () => {
        try {
            sessionStorage.clear();  
            navigate('/');
            // const res = await user.logout();
            // if(res.status) {
            //     sessionStorage.clear();  
            //     navigate('/');
            // }      
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    } 

    const [isSticky, setIsSticky] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 60); 
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (

        <nav className={`navbar navbar-expand-lg ${designClass} ${isSticky ? "fixed-top shadow navBar-outline" : "transition-2"}`} >
            <div className="container-fluid px-4">
                {/* ********************************************************* */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* ********************************************************* */}
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={'../img/icons8-accueil-128.png'} alt="Logo" width={60} height={60} className="" />
                            {/* <span className="h1 ms-2 color-gray" > USVC </span> */}
                        </div>
                    </div>
                    <div className="navbar-nav gap-4">          
                        <a className={`nav-link link-outline ${ (page === 1) ? 'main-color' : 'color-gray' }`} href="/"> Accueil </a>
                        <a className={`nav-link link-outline ${ (page === 2) ? 'main-color' : 'color-gray' }`} href="/logement"> Logement + </a>
                        <a className={`nav-link link-outline ${ (page === 3) ? 'main-color' : 'color-gray' }`} href="/terrain"> Terrain + </a>
                        <a className={`nav-link link-outline ${ (page === 4) ? 'main-color' : 'color-gray' }`} href="/service"> Service + </a>
                        <a className={`nav-link link-outline ${ (page === 5) ? 'main-color' : 'color-gray' }`} href="/contact"> Contact </a>
                        {
                            ( sessionStorage.getItem('token') ) ?
                            (   <div className='d-flex align-items-center justify-content-center' >
                                    <a className={`nav-link link-outline me-4 ${ (page === 6) ? 'main-color' : 'color-gray' }`} href={ '/mon-compte' } > mon-compte </a>
                                    <button className="btn btn-main" onClick={logout} > Deconnexion </button>
                                </div>   
                            ) :
                            ( <a className="btn btn-main" href="/connexion">  Se-connecter </a> )           
                        } 
                    </div>
                </div>
  
            </div>
        </nav>
    )
}

export function Header({designClass, page}) 
{
    return (
    
        <div className="container-fluid"> 
            <TopBar designClass={'bg-blue-clr py-2'} />
            <NavigationBar designClass={designClass} page={page} />
        </div>
    )
}

