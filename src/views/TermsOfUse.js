import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavigationBar, TopBar } from '../components/Header';
import { Footer } from '../components/Footer';

const termsData = [
  { 
    id: 'acceptation', 
    title: '1. Acceptation et accès à la plateforme', 
    content:`En accédant ou en utilisant notre plateforme, vous acceptez pleinement et sans réserve les présentes conditions d’utilisation. 
    L’accès au service peut être temporairement limité ou interrompu pour des raisons de maintenance, de mise à jour, de sécurité, ou de force majeure. 
    Nous nous réservons le droit de restreindre ou suspendre l’accès à certains utilisateurs en cas de non-respect des règles ou d’utilisation abusive.`
  },
  { 
    id: 'compte', 
    title: '2. Compte utilisateur', 
    content: `La création d’un compte peut être requise pour accéder à certaines fonctionnalités. Lors de l’inscription, l’utilisateur s’engage à fournir 
    des informations exactes, complètes et à jour. Vous êtes seul responsable de la confidentialité de vos identifiants et de toutes les actions 
    effectuées via votre compte. Le partage, le prêt ou la cession d’un compte à un tiers est strictement interdit.`
  },
  { 
    id: 'utilisation', 
    title: "3. Utilisation et contenu",
    content: `L’utilisateur s’engage à utiliser la plateforme de manière légale et respectueuse envers les autres membres. 
    Toute publication (annonces, messages, images, vidéos, etc.) reste sous votre responsabilité. 
    Les contenus illicites, diffamatoires, discriminatoires, violents, ou contraires aux bonnes mœurs sont strictement interdits. 
    La plateforme se réserve le droit de modérer, supprimer ou bloquer tout contenu jugé inapproprié ou signalé par d’autres utilisateurs.`
  },
  { 
    id: 'propriete', 
    title: "4. Propriété intellectuelle et données personnelles",
    content: `Tous les éléments constituant la plateforme (textes, logos, images, graphiques, codes sources, bases de données, etc.) 
    sont protégés par les lois sur la propriété intellectuelle et ne peuvent être copiés, modifiés ou exploités sans autorisation préalable. 
    Concernant les données personnelles, celles-ci sont collectées et traitées dans le respect de la réglementation en vigueur (RGPD ou équivalent local). 
    Elles ne sont utilisées qu’aux fins de fournir et améliorer les services, et ne sont jamais revendues à des tiers sans consentement.`
  },
  { 
    id: 'paiements', 
    title: "5. Paiements et responsabilités",
    content: `Les prix, frais de service ou commissions applicables sont communiqués clairement avant toute transaction. 
    Les paiements doivent être effectués via les moyens de paiement autorisés sur la plateforme. 
    La responsabilité de la plateforme ne saurait être engagée en cas de litige entre utilisateurs, de fraude, de perte financière, 
    ou d’utilisation non conforme du service. L’utilisateur demeure pleinement responsable de ses actions et engagements contractés 
    par le biais de la plateforme.`
  },
  { 
    id: 'suspension', 
    title: "6. Suspension, modification et juridiction",
    content: `En cas de non-respect des conditions d’utilisation, la plateforme pourra suspendre ou supprimer le compte d’un utilisateur, 
    sans préavis ni indemnité. Les conditions d’utilisation peuvent être modifiées à tout moment pour s’adapter à l’évolution du service, 
    de la législation ou des pratiques. Les présentes conditions sont régies par la loi du pays d’exploitation de la plateforme. 
    Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux compétents.`
  },
];

export default function TermsOfUse() {
  const [activeSectionId, setActiveSectionId] = useState('');
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = '';
      const offset = 150;

      for (let i = termsData.length - 1; i >= 0; i--) {
        const ref = sectionRefs.current[termsData[i].id];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            currentActiveId = termsData[i].id;
            break;
          }
        }
      }
      setActiveSectionId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavLinkClick = (id) => {
    const section = sectionRefs.current[id];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container-fluid bg-light">

      <div className="row"> 
        <TopBar  />
      </div> 
      <div className="row sticky-top z-index-md"> 
        <NavigationBar page={0} />
      </div>

      <Container fluid="lg" className="p-0 pt-3">
        <Row className="g-0 mt-5 px-0">
          <Col
            md={3}
            className="bg-light flex-column p-4 shadow-sm sticky-top d-none d-md-flex z-index-sm"
            style={{ top: 0, height: '100vh', overflowY: 'auto' }}
          >
            <div className="d-flex flex-column py-5">
              <span className="fs-3">Nos conditions d'utilisation</span>
              <p className="text-muted lead">Veuillez lire attentivement ces conditions d'utilisation.</p>
            </div>
            <Nav className="flex-column" activeKey={activeSectionId}>
              {termsData.map((item) => (
                <Nav.Link
                  key={item.id}
                  eventKey={item.id}
                  onClick={() => handleNavLinkClick(item.id)}
                  className={`py-3 d-flex align-items-center lead ${
                    activeSectionId === item.id ? 'text-blue-clr' : 'text-muted'
                  }`}
                >
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col md={9} className="py-5 px-4">
            {termsData.map((item) => (
              <div
                key={item.id}
                id={item.id}
                ref={(el) => (sectionRefs.current[item.id] = el)}
                className="mb-4 pb-4"
              >
                <h2 className="fs-4 mb-3 ">{item.title}</h2>
                <p className="text-muted lead">{item.content}</p>
              </div>
            ))}
          </Col>
        </Row>
      </Container>

      <div
        className="d-md-none bg-light p-2 shadow-lg fixed-bottom"
        style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
      >
        <Nav className="justify-content-center" activeKey={activeSectionId}>
          {termsData.map((item) => (
            <Nav.Link
              key={item.id}
              eventKey={item.id}
              onClick={() => handleNavLinkClick(item.id)}
              className="py-1 px-3 d-inline-block text-center"
              style={{
                color: '#025114',
                borderBottom: activeSectionId === item.id ? '2px solid #025114' : 'none',
                backgroundColor: activeSectionId === item.id ? 'rgba(236,241,241,255)' : '#fff',
              }}
            >
              <div className="d-block mb-1 mx-auto">{item.icon}</div>
              <small>{item.title.split('.')[0]}.</small>
            </Nav.Link>
          ))}
        </Nav>
      </div>

      
       <div className="row"> 
          <Footer />
        </div>

    </div>
  );
}
