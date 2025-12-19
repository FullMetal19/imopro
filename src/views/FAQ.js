import React, { useState } from "react";
// import vector from "../config/data";
import { NavigationBar, TopBar } from "../components/Header";
import { Footer } from "../components/Footer";
import vector from "../config/data";
import FaqComponent from "../components/FaqComponent";
import { TextExpandable } from "../components/Component";

export function FAQ()
{

    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (index) => {
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };



    const data = [
        {
            img : "./img/Image_fx-75.png",
            title : "Titre du blog",
            desc : "Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance. Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.",
            date : ""
        },
        {
            img : "./img/home-top-img.png",
            title : "Titre du blog",
            desc : "Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.",
            date : ""
        },
        {
            img : "./img/Image_fx-94.png",
            title : "Titre du blog",
            desc : "Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.",
            date : ""
        },
        {
            img : "./img/Image_fx-130.jpg",
            title : "Titre du blog",
            desc : "Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.",
            date : ""
        },
        {
            img : "./img/Image_fx-136.jpg",
            title : "Titre du blog",
            desc : "Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.",
            date : ""
        }
    ]

    return (

        <div className="container-fluid bg-light">

            <title> FAQ | Diwane-plus </title>
            <meta name="author" content="Diwaneplus" />
            <meta name="keywords" content="entreprise immobilier, immobilier au Sénégal, Immobilier en Afrique, vente et location de maisons, vente et location de terrains, vente et location de biens immobiliers" />
            <meta name="description" content="Besoin d’informations ou d’un accompagnement personnalisé ? Contactez notre équipe via notre formulaire, téléphone ou email. Nous sommes disponibles pour répondre à vos questions et vous aider à concrétiser votre projet immobilier rapidement et efficacement." />
            <link rel="icon" type="image/png" href="../favicon.png" />

            <div className="row"> 
              <TopBar  />
            </div> 
            <div className="row"> 
              <NavigationBar page={6} />
            </div>

             <div className="row d-flex justify-content-center my-5">
                    <div className="col-lg-10 py-5">
                        <div className="row d-flex justify-content-between flex-lg-row">
            
                          {/* Main content: on lg it’s left, on md it goes after */}
                          <div className="col-lg-8 d-flex flex-column rounded-3">

                            {
                                data?.map( (item, index) => (

                                    <div className="d-flex flex-column bg-white mb-5 shadow-sm border rounded-2" key={index}>
                                        {/* Image principale */}
                                        <img src={ item.img } className="card-img-top img-fluid rounded-top-2" alt={ 'image-'+ index } />
                                        {/* Contenu */}
                                        <div className="border-top border-bottom p-4">
                                          <h5 className="fs-4 text-secondary mb-3"> { item.title } </h5>
                                          <TextExpandable text={item.desc} wordLimit={60} isExpanded={!!expandedItems[index]} />
                                        </div>
                                        {/* Boutons */}
                                        <div className="d-flex justify-content-between p-4">
                                          <span className="d-flex align-items-center text-secondary" >
                                            <i className="bi bi-grid me-2"></i> Details
                                          </span>
                                          <button className="btn btn-main rounded-0 d-flex align-items-center" onClick={() => toggleExpand(index)}>     
                                            { expandedItems[index] ? "Réduire" : "Voir plus" }
                                            <i className={`bi ${ expandedItems[index] ? 'bi-arrow-left' : 'bi-arrow-right'} ms-1`} ></i>
                                          </button>
                                        </div>
                                    </div>

                                ) )
                            }
                          </div>

                          {/* Sidebar: on lg it’s right, but on md it goes first */}
                          <div className="col-lg-4"> 
                            <div className="row mb-4 px-4 sticky-top">
                              <div className="col-lg-12 d-flex flex-column">

                                <div className="p-3 bg-secondary rounded-top-3 shadow-sm border mb-4">
                                   <span className="fs-4 text-light"> Catégories </span>
                                </div>
                                {
                                   
                                    vector?.listOfFieldType.map((items, index) => (
                                               
                                        <div className="bg-white d-flex flex-column border mb-4" key={index}>
                                            <span className="p-3 bg-white border-bottom text-dark lead"> { items.type } </span>
                                            <ul className="navbar-nav p-3">
                                                {
                                                    items.subType.map((item, i) => (
                                                        <li className="nav-item" key={i}>
                                                          <a className={`nav-link main-color`} href={`/search/${item.name.charAt(0).toLowerCase() +  item.name.slice(1)}`}> 
                                                             <i className="bi bi-arrow-right-circle me-2"></i>
                                                             { item.content } 
                                                          </a>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                    ))
                                }
                              </div>
                            </div>
                          </div>

                        </div>
                    </div>
            </div>

            <div className="row bg-three-clr py-5 justify-content-center"> 
                        <div className="col-lg-10 py-5">
                            {/* Titre */}
                            <div className="row mb-5">
                              <div className="col-12 col-md-6">
                                <h1 className="display-6 fw-bold text-dark">FAQ Diwaneplus</h1>
                              </div>
                              <div className="col-12 col-md-6 text-secondary d-flex align-items-center lead">
                                When detailing testimonials it’s important to include key elements that provide context and authenticity
                              </div>
                            </div>
                        </div>
                        <div className="col-lg-10 pb-5">
                          <FaqComponent />
                        </div>
                    </div>


            {/* ************************************************************************ */}
            <div className="row"> 
                <Footer />
            </div>
        </div>
    )
}


