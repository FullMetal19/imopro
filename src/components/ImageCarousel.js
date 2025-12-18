// ImageCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/effect-coverflow";


const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

export default function ImageCarousel() {
  return (
        <div className="carousel-wrapper">
            <Swiper
               modules={[EffectCoverflow, Pagination]}
               effect="coverflow"
               loop={true}
               centeredSlides={true}
               slidesPerView={3}
               grabCursor={true}
               pagination={{
                 clickable: true,
               }}
               coverflowEffect={{
                 rotate: 0,
                 stretch: 0,
                 depth: 120,
                 modifier: 1,
                 slideShadows: false,
               }}
              className="swiper-container">

            {
                images.map((img, index) => (
                  <SwiperSlide key={index} className="custom-slide">
                    <div
                      className="slide"
                      style={{ backgroundImage: `url(${img})` }}
                    >
                      <div className="overlay">
                        <div className="content">
                          <span className="icon">📍</span>
                          <h3>Beautiful Place</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
  );
}
