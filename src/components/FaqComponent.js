import React, { useState } from "react";

const data = [
  {
    title: "Comment puis-je acheter un bien immobilier en ligne au Sénégal ?",
    description: "Vous pouvez consulter nos annonces sur la plateforme, sélectionner le bien qui vous intéresse, faire une demande de visite ou d’achat, puis suivre les étapes de réservation et de paiement sécurisées en ligne avec l’accompagnement de nos agents.",
  },
  { title: "Les biens publiés sur la plateforme sont-ils vérifiés ?", 
    description: "Oui. Tous les biens (logements, terrains, locaux commerciaux) sont vérifiés juridiquement et physiquement avant publication afin de garantir leur authenticité et éviter toute fraude." 
  },
  { title: "Quels documents sont nécessaires pour acheter un terrain ou un logement", 
    description: "Titre foncier ou délibération, Pièce d’identité, contrat de vente ou de bail, acte notarié (pour les ventes), nous vous accompagnons à chaque étape." 
  },
  { title: "Quels moyens de paiement acceptez-vous ?", 
    description: "Nous acceptons plusieurs moyens de paiement sécurisés : mobile Money (Wave, Orange Money, Free Money), virement bancaire, paiement international selon les cas" 
  },
  { title: "Puis-je mettre mon bien en location ou en vente sur votre plateforme ?", 
    description: "Oui. Les propriétaires peuvent publier leurs biens après validation. Notre équipe s’assure de la conformité du bien avant sa mise en ligne." 
  },
  { title: "Quels sont les frais appliqués par la plateforme ?", 
    description: "Les frais dépendent du service (vente, location, gestion locative). Ils sont clairement indiqués avant toute transaction, sans frais cachés." 
  },
  { title: "Proposez-vous un service de gestion locative ?", 
    description: "Oui. Nous proposons un service complet incluant : recherche de locataires, encaissement des loyers, suivi des paiements, gestion des litiges et maintenance" 
  },
  { title: "Les étrangers ou la diaspora peuvent-ils acheter un bien au Sénégal ?", 
    description: "Oui. Les Sénégalais de la diaspora et les étrangers peuvent acheter ou louer des biens au Sénégal, sous réserve du respect des lois foncières et avec l’assistance de nos partenaires juridiques." 
  },
  { title: "Comment contacter le service client ?", 
    description: "Notre service client est disponible via : Téléphone / WhatsApp, Email, formulaire de contact sur la plateforme. Nous vous accompagnons avant, pendant et après votre transaction." 
  },
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
