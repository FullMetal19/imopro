import React from "react";
import Slider from "react-slick";

import './TestimonialsCarouselStyle.css';


export default function Carousel() 
{
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 992, // Tablets
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576, // Mobile
        settings: { slidesToShow: 1 }
      }
    ]
  };




  const data = [
        {
          name: "Imopro",
          role: "Entreprise immobilière",
          avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
        },
        {
          name: "Imoplus",
          role: "Entreprise immobilière",
          avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
        },
        {
          name: "Imopro",
          role: "Entreprise immobilière",
          avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
        },
        {
          name: "Imopro",
          role: "Entreprise immobilière",
          avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
        },
        {
          name: "Imopro",
          role: "Entreprise immobilière",
          avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
        }
    ]



  return (
    <section className="py-5">
      <div className="container">

        <Slider {...settings}>
          {data.map((t, index) => (
            <div key={index} className="px-3">
              <div className="card shadow-sm border-0 testimonial-card p-3">

                {/* Header */}
                <div className="card-body">
                  <div className="d-flex d-flex flex-column align-items-center mb-3">
                    <img
                      src={t.avatar}
                      className="rounded-circle me-3 avatar-img mb-3"
                      alt={t.name}
                    />
                    <div className="d-flex flex-column align-items-center">
                      <h5 className="card-title mb-0">{t.name}</h5>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
