import React from "react";
import Slider from "react-slick";

import './TestimonialsCarouselStyle.css';


export default function TestimonialsCarousel() 
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


  const testimonials = [
    {
      name: "Maboubacar FALL",
      role: "Client locataire",
      avatar: "/img/home-top-img.jpg",
      text: "Grâce à DiwanePlus, j’ai trouvé un appartement moderne et conforme à toutes mes attentes en un temps record. Le suivi administratif et la réactivité de l’équipe m’ont vraiment impressionné. ",
      date: "Feb 24, 2025"
    },
    {
      name: "Thérèse GOMIS",
      role: "Client Acheteur",
      avatar: "/img/home-top-img.jpg",
      text: "DiwanePlus nous a accompagnés de A à Z dans l’achat de notre maison. L’équipe a fait preuve d’un grand professionnalisme, de transparence et d’une parfaite connaissance du marché.",
      company: "Diwaneplus",
      date: "Mars 03, 2025"
    },
    {
      name: "Moustapha KANTE",
      role: "Propriétaire immobilier",
      avatar: "/img/home-top-img.jpg",
      text: "J’ai confié la vente de ma maison à DiwanePlus et tout s’est déroulé avec sérieux et efficacité. La communication était régulière et la transaction s’est faite rapidement et en toute sécurité.",
      company: "Diwaneplus",
      date: "Mars 03, 2025"
    },
    {
      name: "Alioune DIOP",
      role: "Client locataire",
      avatar: "/img/home-top-img.jpg",
      text: "DiwanePlus se distingue par son sens du service et son engagement envers ses clients. On se sent accompagné, écouté et conseillé à chaque étape. Une agence immobilière digne de confiance.",
      company: "Diwaneplus",
      date: "Juillet 12, 2025"
    },
     {
      name: "Mamadou DIAO",
      role: "Investissement immobilier",
      avatar: "/img/home-top-img.jpg",
      text: "En tant qu’investisseur, je recherchais une agence fiable et structurée. DiwanePlus m’a proposé des opportunités rentables et sécurisées. Les conseils étaient clairs, précis.",
      company: "Diwaneplus",
      date: "Septembre 25, 2025"
    }
  ];

  return (
    <section className="py-5">
      <div className="container">

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <div className="card shadow-sm border-0 testimonial-card">

                {/* Header */}
                <div className="card-body">
                  <div className="d-flex align-items-center mb-1 border-bottom pb-3">
                    <img
                      src={t.avatar}
                      className="rounded-circle me-3 avatar-img"
                      alt={t.name}
                    />
                    <div>
                      <h5 className="card-title mb-0">{t.name}</h5>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>

                  {/* Text */}
                  <p className="card-text text-secondary mb-4 pt-3 border-top-dashed px-3">{t.text}</p>

                  {/* Footer */}
                  <div className="d-flex justify-content-between px-3 py-2">
                    <span className="text-muted small">
                      <i className="bi bi-building me-1"></i> {t.company}
                    </span>
                    <span className="text-muted small">{t.date}</span>
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
