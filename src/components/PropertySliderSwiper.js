
 import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// import "./HeroSlider.css";

export default function  PropertySliderSwiper() {
  const slides = [
    {
      image: "./img/Image_fx-117.jpg",
      title: "Découvrez nos biens",
      text: "Des maisons modernes et accessibles",
      icon: "🏠",
      largeOverlay: true, // 👉 premier slide
    },
    {
      image: "./img/Image_fx-88.png",
      title: "Achetez en toute sécurité",
      text: "Transactions rapides et fiables",
      icon: "🔐",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Locations flexibles",
      text: "Mensuel ou longue durée",
      icon: "📅",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Terrains disponibles",
      text: "En zones urbaines et rurales",
      icon: "🌍",
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      title: "Support 24/7",
      text: "Une équipe toujours à l'écoute",
      icon: "📞",
    },
  ];


  //  {
  //     image: "./img/Image_fx-117.jpg",
  //     title: "Découvrez nos biens",
  //     text: "Des maisons modernes et accessibles",
  //     icon: "🏠",
  //     largeOverlay: true, // 👉 premier slide
  //   },
  //   {
  //     image: "./img/Image_fx-86.png",
  //     title: "Achetez en toute sécurité",
  //     text: "Transactions rapides et fiables",
  //     icon: "🔐",
  //   },
  //   {
  //     image: "./img/Image_fx-147.jpg",
  //     title: "Locations flexibles",
  //     text: "Mensuel ou longue durée",
  //     icon: "📅",
  //   },
  //   {
  //     image: "./img/Image_fx-88.png",
  //     title: "Terrains disponibles",
  //     text: "En zones urbaines et rurales",
  //     icon: "🌍",
  //   },
  //   {
  //     image: "./img/Image_fx-148.jpg",
  //     title: "Support 24/7",
  //     text: "Une équipe toujours à l'écoute",
  //     icon: "📞",
  //   },

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
                        <div className="overlay-content">
                          <div className="icon">{slide.icon}</div>
                          <h2>{slide.title}</h2>
                          <p>{slide.text}</p>
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
