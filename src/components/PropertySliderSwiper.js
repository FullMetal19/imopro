
 import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// import "./HeroSlider.css";

export default function  PropertySliderSwiper() {
  const slides = [
    {
      image: "./img/Image_fx-117.jpg",
      title: "Trouvez le logement idéal, simplement",
      text: "Appartements et maisons disponibles à la location ou à l’achat, partout au Sénégal, avec des biens vérifiés et un accompagnement personnalisé.",
    },
    {
      image: "./img/Image_fx-88.png",
      title: "Investissez en toute sécurité",
      text: "Des terrains légalement vérifiés, prêts à bâtir, pour vos projets résidentiels ou commerciaux, en ville comme en périphérie.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Donnez vie à votre activité",
      text: "Boutiques, bureaux et espaces commerciaux stratégiquement situés pour développer votre entreprise en toute sérénité.",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Nous gérons, vous investissez",
      text: "De la recherche à la gestion locative, notre équipe s’occupe de tout pour sécuriser et rentabiliser votre patrimoine immobilier.",
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      title: "L’immobilier à portée de clic",
      text: "Achetez, louez ou investissez à distance grâce à notre plateforme en ligne, idéale pour la diaspora et les investisseurs internationaux.",
    },
  ];



  return (

      <div className="col-lg-12 px-0" >
      
          <Swiper modules={[Autoplay, Pagination]} slidesPerView={1} loop speed={1500}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true, // 👉 bullets
              }}
              onAutoplayTimeLeft={(swiper, time, progress) => {
                const bar = document.querySelector(".custom-progress");
                if (bar) {
                  bar.style.transform = `scaleX(${1 - progress})`;
                }
              }}
              className="hero-swiper">

            {
                slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="slide" style={{ backgroundImage: `url(${slide.image})` }} >
                      <div className={`overlay ${ slide.largeOverlay ? "overlay-half" : "overlay-full" }`} >
                        <div className="row w-100 h-100 justify-content-center">
                          <div className="overlay-content col-lg-5 col-md-8">
                              <div className="icon bg-whit-transp shadow-sm rounded p-4">
                                 <img src={'../favicon.png'} className="" alt="Logement extérieur" style={{ width: "80px" }} />
                              </div>
                              <h2 className="text-center">{slide.title}</h2>
                              <p className="text-center">{slide.text}</p>
                            </div>
                          </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
            }
          </Swiper>

          <div className="progress-wrapper">
            <div className="custom-progress"></div>
          </div>

      </div>  
  );
}
