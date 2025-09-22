
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router";


export function NavigationBar({page=1}) 
{

  const navigate = useNavigate();

  const logout = async () => {
 
    localStorage.clear();  
    navigate('/');      
  } 

  return (
    <div className="col-12">
      <div className={`row bg-white`}> 
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
          <div className="container-fluid py-2">
            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="/">
              <span className="bg-secondary px-2 py-1 text-light fw-bold rounded-start-2 small border border-light"> <i class="bi bi-house-door-fill"></i> </span>
              <span className="bg-secondary border border-light text-light px-2 py-1 fw-bold rounded-end-2 small">  IMOPRO </span>
            </a>
            {/* Burger menu pour mobile */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Liens */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <a className={`nav-link ${(page===1) && 'text-blue-clr'}`} href="/"> <i className="bi bi-plus"></i> Accueil </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${(page===2) && 'text-blue-clr'}`} href="/logement"> <i className="bi bi-plus"></i> Logement </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${(page===3) && 'text-blue-clr'}`} href="/terrain"> <i className="bi bi-plus"></i> Terrain </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${(page===4) && 'text-blue-clr'}`} href="/service"> <i className="bi bi-plus"></i> Service </a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${(page===5) && 'text-blue-clr'}`} href="/contact"> <i className="bi bi-plus"></i> Contact </a>
                </li>
                {
                    ( localStorage.getItem('token') ) && ( 
                    <li className="nav-item mx-2">
                      <a className={`nav-link ${(page===6) && 'text-blue-clr'}`} href="/mon-compte"> <i className="bi bi-plus"></i> Mon-compte </a>
                    </li> )
                }
              </ul>
              {/* Actions à droite */}
              <div className="d-flex align-items-center">
                <a className="btn btn-sm btn-outline-secondary me-2" href="/inscription"> S'inscrire </a>
                {
                  localStorage.getItem('token') ? 
                  ( <button className="btn btn-sm btn-secondary" type="button" onClick={logout} > Se-déconnecter </button> ) :
                  ( <a href="/connexion" className="btn btn-sm btn-secondary" type="button" > Se-connecter </a> ) 
                }     
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}



export function TopBar() 
{
  return (

    <div className="col-12">
      <div className={`row bg-blue-clr d-flex justify-content-between align-items-center py-3`}> 
        {/* ****************************************************************** */}
        <div className="col-lg-5 d-flex align-items-center"> 
          <div className="d-flex align-items-center justify-content-center me-4">
            <i class="bi bi-envelope text-white me-1 mt-1 small hide"></i>
            <span className="color-gray hide"> imopro@gmail.com </span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <i class="bi bi-geo-alt text-white me-1 mt-1 small hide"></i>
            <span className="color-gray hide"> Dakar, Medina </span>
          </div>
        </div>
        {/* ****************************************************************** */}
        <div className="col-lg-6 d-flex align-items-center justify-content-end"> 
          <div className="d-flex gap-2"> 
            <a className="me-2 nav-link border border-light px-1 rounded-2" href="/"> <i class="small bi bi-twitter-x text-white"></i> </a>
            <a className="me-2 nav-link border border-light px-1 rounded-2" href="/"> <i class="small bi bi-facebook text-white"></i> </a>
            <a className="me-2 nav-link border border-light px-1 rounded-2" href="/"> <i class="small bi bi-linkedin text-white"></i> </a>
            <a className="me-2 nav-link border border-light px-1 rounded-2" href="/"> <i class="small bi bi-youtube text-white"></i> </a>
            <a className="me-2 nav-link border border-light px-1 rounded-2" href="/"> <i class="small bi bi-instagram text-white"></i> </a>
          </div>
        </div>
        {/* ****************************************************************** */}
      </div> 
    </div>
  );
}

