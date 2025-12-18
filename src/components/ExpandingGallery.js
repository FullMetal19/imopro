import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";

export default function ExpandingGallery() {
  const images = [
    "./img/Image_fx-117.jpg",
    "./img/Image_fx-92.png",
    "./img/Image_fx-133.jpg",
    "./img/Image_fx-88.png",
    "./img/Image_fx-93.png",
    "./img/Image_fx-124.jpg",
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleShow = (img) => {
    setCurrentImage(img);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="gallery-container">
      {images.map((img, i) => (
        <div
          key={i}
          className={`gallery-item ${activeIndex === i ? "active" : ""}`}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
          onClick={() => handleShow(img)}
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* OVERLAY */}
          <div className="gallery-overlay">
            {/* <FaEye size={24} /> */}
            <span>Voir l’image</span>
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          {currentImage && (
            <img
              src={currentImage}
              alt="large"
              className="w-100 h-auto"
              style={{ maxHeight: "90vh", objectFit: "contain" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
