import React from "react";

export function Footer() 
{
  return (

    <footer className="col-lg-12 pb-3">
      <div className="row justify-content-center bg-dark py-5">
        <div className="col-lg-11">

          <div className="row mt-5">
           
            <div className="col-md-5">
              <div className="d-flex flex-column border border-secondary rounded-3 p-4">
                <div className="d-flex gap-3 align-items-center">
                  <div className="fs-3 text-blue-clr mb-2">
                    <i className={`bi bi bi-patch-check`}></i>
                  </div>
                  <h5 className="fs-5 text-secondary"> Univers service </h5>
                </div>
                <p className="text-secondary">
                    Lors de l’inscription, l’utilisateur recevra un SMS sur son numéro de téléphone contenant un code de validation pour sécuriser et confirmer la création de son compte.
                </p>
              </div>
            </div>
        
            <div className="col-md-1"></div>

            <div className="col-md-3 mb-4">
              <div className="d-flex flex-column">
                <h6 className="border-bottom border-secondary text-secondary lead pb-2 mb-3">Customers</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/support" className="text-decoration-none text-secondary">Support</a></li>
                  <li className="mb-2"><a href="/support" className="text-decoration-none text-secondary">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="d-flex flex-column">
                <h6 className="border-bottom border-secondary text-secondary lead pb-2 mb-3">Customers</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/support" className="text-decoration-none text-secondary">Support</a></li>
                  <li className="mb-2"><a href="/support" className="text-decoration-none text-secondary">FAQ</a></li>
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
            © 2025 Imopro. Tout droit réservé.
          </p>

          <div className="d-flex flex-wrap gap-3">
            <p className="text-light mb-2 mb-md-0">
               condition d'utilisation
            </p>
            <p className="text-light mb-2 mb-md-0">
               powered by Mayama
            </p>
          </div>
        </div>

    </div>

  );
}
