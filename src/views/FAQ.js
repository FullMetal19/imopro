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
            title : "Des propriétés sélectionnées pour leur qualité et leur durabilité",
            desc : "La qualité de nos propriétés est au cœur de notre engagement. Chaque logement, terrain ou local commercial proposé sur notre plateforme fait l’objet d’une sélection rigoureuse avant sa mise en ligne. Nous évaluons plusieurs critères essentiels : l’état général du bien, la qualité des matériaux, l’environnement immédiat, l’accessibilité et le potentiel de valorisation. Cette démarche permet de proposer des biens répondant aux standards de confort, de sécurité et de durabilité. Qu’il s’agisse d’un logement résidentiel, d’un terrain à bâtir ou d’un espace commercial, notre objectif est d’offrir des propriétés fiables, adaptées aux réalités du marché immobilier sénégalais et capables de répondre aux attentes des particuliers comme des investisseurs.",
            date : ""
        },
        {
            img : "./img/home-top-img.png",
            title : "Une assistance personnalisée avec des agents dédiés",
            desc : "L’achat, la vente ou la location d’un bien immobilier est une décision importante qui nécessite un accompagnement fiable et humain. C’est pourquoi notre plateforme met à votre disposition des agents immobiliers expérimentés, présents à chaque étape de votre projet. Nos agents vous assistent dès la recherche du bien, en tenant compte de vos besoins réels, de votre budget et de vos objectifs à court et long terme. Ils vous conseillent sur les zones à fort potentiel, les types de biens adaptés à votre situation et les démarches administratives à entreprendre. Au-delà de la simple mise en relation, nos équipes assurent un suivi continu : organisation des visites physiques ou virtuelles, explication des documents juridiques, assistance lors de la signature des contrats et accompagnement après la transaction. Cette approche humaine garantit une expérience immobilière sécurisée, transparente et sans stress.",
            date : ""
        },
        {
            img : "./img/Image_fx-94.png",
            title : "Fiabilité, transparence et sécurité des transactions",
            desc : "La confiance est un pilier fondamental de notre plateforme. Nous avons mis en place des procédures strictes afin de garantir la fiabilité de chaque annonce et la sécurité de chaque transaction. Avant publication, les documents juridiques des biens sont vérifiés (titre foncier, délibération, autorisations légales). Cette vérification réduit considérablement les risques liés aux litiges fonciers, un enjeu majeur dans le secteur immobilier. Les paiements effectués sur la plateforme sont sécurisés et traçables. Chaque étape est clairement expliquée afin d’éviter toute ambiguïté. Cette transparence permet à nos clients d’investir ou de louer en toute sérénité, même à distance.",
            date : ""
        },
        {
            img : "./img/Image_fx-130.jpg",
            title : "Une plateforme digitale pensée pour la simplicité",
            desc : "Notre solution immobilière a été conçue pour faciliter l’accès à l’immobilier grâce au numérique. La plateforme permet de rechercher, comparer et sélectionner des biens en quelques clics, depuis un ordinateur ou un smartphone. Les utilisateurs bénéficient d’une interface intuitive, de fiches détaillées avec photos, descriptions complètes et informations clés. Des options de contact rapide et de réservation permettent d’accélérer les démarches sans déplacements inutiles. Cette digitalisation offre un avantage majeur aux Sénégalais de la diaspora et aux investisseurs internationaux, qui peuvent gérer leurs projets immobiliers à distance tout en restant informés en temps réel.",
            date : ""
        },
        {
            img : "./img/Image_fx-136.jpg",
            title : "Une vision orientée investissement et avenir",
            desc : "Au-delà des transactions, notre mission est d’accompagner durablement nos clients dans leurs projets immobiliers. Nous mettons un accent particulier sur les opportunités d’investissement à fort potentiel, qu’il s’agisse de location résidentielle, de commerce ou de développement foncier. Nos analyses du marché local permettent d’orienter les investisseurs vers des zones prometteuses et des biens susceptibles de générer des revenus stables et durables. Nous proposons également des services de gestion locative afin d’assurer la rentabilité des biens sur le long terme. En combinant expertise humaine, technologie et connaissance du marché sénégalais, nous construisons une plateforme fiable, moderne et tournée vers l’avenir de l’immobilier.",
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
                                Cette foire aux questions a été conçue pour répondre aux interrogations les plus fréquentes concernant l’achat, la vente et la location de biens immobiliers sur notre plateforme.
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


