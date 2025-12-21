import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";

export default function ExpandingGallery() {
  const data = [
    {
      img : "./img/Image_fx-117.jpg",
      title : "Des propriétés soigneusement sélectionnées",
      desc : ""
    },
    {
      img : "./img/Image_fx-92.png",
      title : "Des documents 100 % conformes",
      desc : ""
    },
    {
      img : "./img/Image_fx-133.jpg",
      title : "Des lieux qui font la différence",
      desc : ""
    },
    {
      img : "./img/Image_fx-88.png",
      title : "Une expérience simple et rapide",
      desc : ""
    },
    {
      img : "./img/Image_fx-93.png",
      title : "Des experts à vos côtés",
      desc : ""
    },
    {
      img : "./img/Image_fx-124.jpg",
      title : "Des transactions en toute confiance",
      desc : ""
    }
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
      {data.map((item, i) => (
        <div
          key={i}
          className={`gallery-item ${activeIndex === i ? "active" : ""}`}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
          onClick={() => handleShow(item.img)}
          style={{ backgroundImage: `url(${item.img})` }}
        >
          {/* OVERLAY */}
          <div className="gallery-overlay">
            <span className="mb-2 text-light text-center p-3"> { item.title } </span>
            <span className="text-light text-center p-3"> { item.desc } </span>
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
