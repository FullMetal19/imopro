
// import { FaHome } from "react-icons/fa";

const data = [
  {
    title: "Appartement",
    count: "17 Propriétiés",
    link : "/search/appartement",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    title: "Maison",
    count: "10 Propriétiés",
    link : "/search/maison",
    image:
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198",
  },
  {
    title: "Studio",
    count: "10 Propriétiés",
    link : "/search/studio",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  {
    title: "Chambre",
    count: "3 Propriétiés",
    link : "/search/chambre",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  },
  {
    title: "Terrain",
    count: "7 Propriétiés",
    link : "/terrain",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    title: "Autres logements",
    count: "3 Propriétiés",
    link : "/search/autres-logements",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
  {
    title: "Salle cérémonie",
    count: "3 Propriétiés",
    link : "/search/salle-ceremonie",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
  },
  {
    title: "Bureau",
    count: "3 Propriétiés",
    link : "/search/bureau",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    title: "Salle co-working",
    count: "17 Propriétiés",
    link : "/search/salle-co-working",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Boutique",
    count: "10 Propriétiés",
    link : "/search/boutique",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
  },
  {
    title: "Autres locales",
    count: "10 Propriétiés",
    link : "/search/autres-locales",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
  }
];


export default function PropertyGrid() {
  return (
    <div className="property-container">
      <h2 className="display-6 text-secondary mb-2" >Display Different Content Types</h2>
      <p className="text-secondary mb-5 lead text-muted">
        Display property types with modern grid style
      </p>

      <div className="row pt-4">
        <div className="col-lg-6 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[0].image} alt={data[0].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[0].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[0].title}</h3>
                  <span>{data[0].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[1].image} alt={data[1].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[1].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[1].title}</h3>
                  <span>{data[1].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[2].image} alt={data[2].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[2].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[2].title}</h3>
                  <span>{data[2].count}</span>
                </div>
            </div>
        </div>


        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[3].image} alt={data[3].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[3].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[3].title}</h3>
                  <span>{data[3].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[4].image} alt={data[4].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[4].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[4].title}</h3>
                  <span>{data[4].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[5].image} alt={data[5].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[5].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[5].title}</h3>
                  <span>{data[5].count}</span>
                </div>
            </div>
        </div>


        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="d-flex justify-content-center align-items-center bg-main shadow-sm rounded py-5 border" style={{ height: "100%" }} >
                <span className="lead text-light fs-2 px-4"> Section Commerciale </span>
            </div>
        </div>
        <div className="col-lg-6 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[6].image} alt={data[6].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[6].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[6].title}</h3>
                  <span>{data[6].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[7].image} alt={data[7].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[7].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[7].title}</h3>
                  <span>{data[7].count}</span>
                </div>
            </div>
        </div>


        <div className="col-lg-6 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[8].image} alt={data[8].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[8].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[8].title}</h3>
                  <span>{data[8].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[9].image} alt={data[9].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[9].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[9].title}</h3>
                  <span>{data[9].count}</span>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4"> 
            <div className="property-card">
                <img src={data[10].image} alt={data[10].title} />
                <div className="overlay">
                  <div className="mb-2">
                    <a href={ data[10].link } className="btn btn-sm px-3 btn-outline-light d-flex align-items-center"> 
                       <i className="bi bi-box-arrow-up-right me-1"></i>  Explorer 
                    </a>
                  </div>
                  <h3>{data[10].title}</h3>
                  <span>{data[10].count}</span>
                </div>
            </div>
        </div>


      </div>

    </div>
  );
}
