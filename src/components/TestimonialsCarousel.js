import React from "react";
import Slider from "react-slick";


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
      name: "Eleanor Pena",
      role: "Software Engineer at TechCorp",
      avatar: "https://images.pexels.com/photos/4482961/pexels-photo-4482961.jpeg",
      text: "Sed rem perspiciatis unde omnis iste natus quae ab illo inventore veritatis et quasi.",
      company: "Frendoz",
      date: "Feb 24, 2024"
    },
    {
      name: "Theresa Webb",
      role: "UX Specialist at Designify",
      avatar: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
      text: "Sed rem perspiciatis unde omnis iste natus quae ab illo inventore veritatis et quasi.",
      company: "Frendoz",
      date: "Mar 03, 2024"
    },
    {
      name: "Darlene Robertson",
      role: "Marketing Lead at InnovateHub",
      avatar: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
      text: "Sed rem perspiciatis unde omnis iste natus quae ab illo inventore veritatis et quasi.",
      company: "Frendoz",
      date: "Feb 17, 2024"
    },
    {
      name: "Marvin McKinney",
      role: "Manager at Lattice",
      avatar: "https://images.pexels.com/photos/4482961/pexels-photo-4482961.jpeg",
      text: "Sed rem perspiciatis unde omnis iste natus quae ab illo inventore veritatis et quasi.",
      company: "Frendoz",
      date: "Jan 12, 2024"
    }
  ];

  return (
    <section className="py-5">
      <div className="container">

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-3">
              <div className="card shadow-sm border-0 testimonial-card p-3">

                {/* Header */}
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
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
                  <p className="card-text text-muted mb-4 pt-3 border-top-dashed">{t.text}</p>

                  {/* Footer */}
                  <div className="d-flex justify-content-between">
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
