
export function Footer() 
{
  return (

    <footer className="col-lg-12">
      <div className="row justify-content-center bg-dark py-5">
        <div className="col-lg-11">

          <div className="row mt-5">
           
            <div className="col-md-5 mb-4">
              <div className="d-flex flex-column border border-secondary rounded-3 p-4">
                <div className="d-flex gap-3 align-items-center">
                  <div className="fs-3 text-blue-clr mb-2">
                    <i className={`bi bi bi-patch-check`}></i>
                  </div>
                  <h4 className="fs-4 text-secondary"> Diwane plus </h4>
                </div>
                <p className="text-secondary">
                    Diwaneplus est une plateforme immobilière moderne dédiée à la vente, la location et la gestion de propriétés. Nous connectons propriétaires, acheteurs et locataires grâce à des services fiables, transparents et accessibles. Avec Diwane+, trouvez le bien idéal, publiez vos annonces en toute simplicité et gérez vos transactions en toute confiance.
                </p>
              </div>
            </div>
        
            <div className="col-md-1"></div>

            <div className="col-md-3 mb-4">
              <div className="d-flex flex-column">
                <h6 className="border-bottom border-secondary text-secondary lead pb-2 mb-3"> Support clients </h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/service" className="text-decoration-none text-secondary"> Nos services </a></li>
                  <li className="mb-2"><a href="/contact" className="text-decoration-none text-secondary"> Contact </a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="d-flex flex-column">
                <h6 className="border-bottom border-secondary text-secondary lead pb-2 mb-3"> Catlogues </h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/logement" className="text-decoration-none text-secondary"> Logements </a></li>
                  <li className="mb-2"><a href="/terrain" className="text-decoration-none text-secondary"> Terrains </a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="row bg-blue-clr">
        <BottomBar />
      </div>

    </footer>
  );
}



export function BottomBar() 
{
  return (

    <div className="col-lg-12">

        {/* Bottom Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-light py-3">
          <p className="text-light mb-2 mb-md-0">
            © 2025 Diwaneplus. Tout droit réservé.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <p className="text-light mb-2 mb-md-0">
               condition d'utilisation
            </p>
            <p className="text-light mb-2 mb-md-0">
               alimenté par Diwaneplus
            </p>
          </div>
        </div>

    </div>

  );
}
