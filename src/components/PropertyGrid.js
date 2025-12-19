import React from "react";
import { ProductApi } from "../services/product.api";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';



const PROPERTY_CONFIG = [
  {
    title: "Appartement",
    link: "/search/appartement",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    title: "Maison",
    link: "/search/maison",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
  },
  {
    title: "Studio",
    link: "/search/studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  {
    title: "Chambre",
    link: "/search/chambre",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  },
  {
    title: "Terrain",
    link: "/terrain",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    title: "Autres logements",
    link: "/search/autres-logements",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
  {
    title: "Salle cérémonie",
    link: "/search/salle-ceremonie",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
  },
  {
    title: "Bureau",
    link: "/search/bureau",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    title: "Salle co-working",
    link: "/search/salle-co-working",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Boutique",
    link: "/search/boutique",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
  },
  {
    title: "Autres locales",
    link: "/search/autres-locales",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  }
];



export default function PropertyGrid() {

  const product = ProductApi();
   
  const fetchStats = async () => {    
    const {data} = await product.getStatBySubtitle();
    console.log(data.data)
    return data.data; 
  }

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dataStatBySubtitle"],
    queryFn: fetchStats
  });

  const mergedData = PROPERTY_CONFIG.map(item => {
    const stat = stats.find(s => s.subtitle === item.title);
    return {
      ...item,
      count: stat ? `${stat.count} Propriétés` : "0 Propriété"
    };
  });

    

  return (

    <div className="property-container">

      <h2 className="display-6 text-secondary mb-2" >Display Different Content Types</h2>
      <p className="text-secondary mb-5 lead text-muted">
        Display property types with modern grid style
      </p>

      <div className="row pt-4">

        { 
            isLoading ? (
                <div className="col-lg-6 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[0].image} alt={mergedData[0].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[0].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[0].title}</h3>
                      <span>{mergedData[0].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[1].image} alt={mergedData[1].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[1].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[1].title}</h3>
                      <span>{mergedData[1].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[2].image} alt={mergedData[2].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[2].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[2].title}</h3>
                      <span>{mergedData[2].count}</span>
                    </div>
                  </div>
                </div>
            )
        }


        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[3].image} alt={mergedData[3].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[3].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[3].title}</h3>
                      <span>{mergedData[3].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[4].image} alt={mergedData[4].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[4].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[4].title}</h3>
                      <span>{mergedData[4].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-6 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[5].image} alt={mergedData[5].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[5].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[5].title}</h3>
                      <span>{mergedData[5].count}</span>
                    </div>
                  </div>
                </div>
            )
        }


        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="d-flex justify-content-center align-items-center bg-main shadow-sm rounded py-5 border" style={{ height: "100%" }} >
                <span className="lead text-light fs-2 px-4"> Section Commerciale </span>
            </div>
        </div>
        { 
            isLoading ? (
                <div className="col-lg-6 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[6].image} alt={mergedData[6].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[6].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[6].title}</h3>
                      <span>{mergedData[6].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[7].image} alt={mergedData[7].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[7].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[7].title}</h3>
                      <span>{mergedData[7].count}</span>
                    </div>
                  </div>
                </div>
            )
        }


        { 
            isLoading ? (
                <div className="col-lg-6 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-6 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[8].image} alt={mergedData[8].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[8].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[8].title}</h3>
                      <span>{mergedData[8].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[9].image} alt={mergedData[9].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[9].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[9].title}</h3>
                      <span>{mergedData[9].count}</span>
                    </div>
                  </div>
                </div>
            )
        }
        { 
            isLoading ? (
                <div className="col-lg-3 col-md-6 mb-4">
                    <Skeleton height={260} />
                </div>
            ) :       
            (
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="property-card">
                    <img src={mergedData[10].image} alt={mergedData[10].title} />
                    <div className="overlay">
                     <div className="mb-2">
                        <a
                          href={mergedData[10].link}
                          className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-up-right me-1"></i> Explorer
                       </a>
                      </div>
                      <h3>{mergedData[10].title}</h3>
                      <span>{mergedData[10].count}</span>
                    </div>
                  </div>
                </div>
            )
        }


      </div>

    </div>
  );
}
