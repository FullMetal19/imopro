import React, { useState } from "react";

const data = [
  {
    title: "What does it cost to work with you?",
    description:
      "If you need to exchange a product, please contact us within 14 days of receiving your order. We will determine the best course of action and guide you through the exchange process.",
  },
  { title: "How do I make a warranty claim?", description: "Lorem ipsum..." },
  { title: "Where can I change or cancel my order?", description: "Lorem ipsum..." },
  { title: "What's your return policy?", description: "Lorem ipsum..." },
  { title: "Do I have to pay customs fees or duty on my package?", description: "Lorem ipsum..." },
  { title: "How do I track my shipment?", description: "Lorem ipsum..." },
];

export default function FaqComponent() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (

      <div className="row g-4">
        {data.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <FAQItem
              title={item.title}
              desc={item.description}
              open={openIndex === index}
              onClick={() => toggle(index)}
            />
          </div>
        ))}
      </div>

  );
}

function FAQItem({ title, desc, open, onClick }) {
  return (
    <div className={`faq-box p-4 ${open ? "active" : ""}`}>
      <div className="d-flex justify-content-between align-items-start">
        <h5 className="fw-semibold">{title}</h5>

        <button className="btn btn-sm d-flex align-items-center btn-light faq-btn" onClick={onClick}>
          <i className={`bi ${open ? "bi-dash" : "bi-plus"} fs-4`}></i>
        </button>
      </div>

      <div className={`faq-desc text-secondary mt-3 ${open ? "open" : ""}`}>
        {desc}
      </div>
    </div>
  );
}
