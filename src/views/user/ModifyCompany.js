import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { CompanyApi } from "../../services/company.api";
import { LoaderModal } from "../company/genrality/Modal";
import vector from "../../config/data";
import { useParams } from "react-router";

export function ModifyCompany() {
  const { companyId } = useParams();
  const company = CompanyApi("multipart/form-data");

  const fetchCompany = async () => {
    try {
      const res = await company.findOne(companyId);
      return res.data.data;
    } catch (err) {
      throw new Error("Erreur lors de la récupération : " + err.message);
    }
  };

  const { data } = useQuery({ queryKey: ["company", companyId], queryFn: fetchCompany });

  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState([]);

  useEffect(() => {
    if (data) {
      setInputs(data);
      const selectedRegionData = vector.listRegion.find(
        (item) => item.country === data.country
      );
      setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
    }
  }, [data]);

  const handleInputs = (event) => {
    const { name, value, files, type } = event.target;

    if (name === "country") {
      const selectedRegionData = vector.listRegion.find((item) => item.country === value);
      setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
    }

    setInputs((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setIsLoading1(true);

    try {
      const formData = new FormData();
      for (const key in inputs) {
        if ((key === "icon" || key === "cniImage") && inputs[key] instanceof File) {
          formData.append(key, inputs[key]);
        } else {
          formData.append(key, inputs[key]);
        }
      }

      const res = await company.update(companyId, formData);
      setIsLoading1(false);
      console.log(res.data);

      if (res.data.success) {
        setStatus(1);
        setMessage("Les informations de l'entreprise ont été mises à jour avec succès.");
      } else {
        setStatus(-1);
        setMessage(res.data.error || "Erreur lors de la mise à jour.");
      }
    } catch (err) {
      setStatus(-1);
      setIsLoading1(false);
      setMessage("Une erreur est survenue lors de la mise à jour. Veuillez réessayer.");
    }
  };

  return (
    <div className="container-fluid bg-light">
      {isLoading1 && <LoaderModal />}

      <div className="row">
        <TopBar />
      </div>
      <div className="row sticky-top">
        <NavigationBar />
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-9 py-5">
          <div className="row mt-4 px-2 mb-5">
            <div className="col-lg-12 rounded-top-2">
              <div className="row d-flex align-item-center py-3 px-4 mb-4 bg-gray-light border-secondary border-start border-5">
                <span className="text-secondary lead py-1">
                  Formulaire de modification de l'entreprise{" "}
                  <span className="color-blue"> ** {inputs?.name || ""} ** </span>
                </span>
              </div>

              <form onSubmit={handleForm} encType="multipart/form-data">
                <div className="row px-4 py-5 mb-4 border bg-white ">

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Nom de l'entreprise</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="name" value={inputs?.name || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Pays</label>
                    <div className="d-flex gap-1 mb-3" >
                        <select className="border w-100 p-3 text-secondary rounded-2" name="country" value={inputs?.country || ""} required onChange={ handleInputs } >
                          <option value=""> Choisir le pays  </option>
                          {
                              vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                          }
                        </select>
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Région</label>
                    <div className="d-flex gap-1 mb-3" >
                        <select className="border w-100 p-3 text-secondary rounded-2" name="region" value={inputs?.region || ""} required onChange={ handleInputs } >
                          <option value=""> Choisir la région  </option>
                          {
                              selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                          }
                        </select>
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Adresse</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="address" value={inputs?.address || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                     </div>
                  </div>

                  <div className="col-md-12">
                    <label className="text-secondary fs-xs mb-1">Description [ <span className=" px-2 text-danger"> * </span>  ]  </label>
                    <textarea className="w-100 border input p-3 text-secondary rounded-2 mb-3" name="description" value={inputs?.description || ""} rows={6} onChange={handleInputs} />
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Numéro de registre</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="registNumber" value={inputs?.registNumber || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Ninea</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="ninea" value={inputs?.ninea || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-8">
                    <label className="text-secondary fs-xs mb-1">Site web</label>
                    <input type="url" name="website" value={inputs?.website || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={handleInputs} />
                  </div>

                </div>

                {/* ==================== GARANT ==================== */}
                <div className="row px-4 py-5 mb-4 border bg-white ">

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Nom du garant</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="ownerName" value={inputs?.ownerName || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1"> Téléphone du garant </label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="number" name="phone" value={inputs?.phone || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">Email du garant</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="email" name="email" value={inputs?.email || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1">CNI du garant</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="text" name="ownerCni" value={inputs?.ownerCni || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } required />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1"> Carte d'identité (PDF)</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="file" name="cniImage" className="w-100 border input p-3 text-secondary rounded-2" accept="application/pdf" onChange={ handleInputs } />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                    {inputs?.cniImage && typeof inputs.cniImage === "string" && (
                      <div className="d-flex justify-content-start align-items-center">
                        <a href={inputs.cniImage} className="btn btn-outline-main px-4" target="_blank" rel="noopener noreferrer" >
                          Voir le CNI [ <span className=" px-2 text-danger"> Format PDF </span>  ]
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="text-secondary fs-xs mb-1"> Icône de l'entreprise (image)</label>
                    <div className="d-flex gap-1 mb-3" >
                        <input type="file" name="icon" className="w-100 border input p-3 text-secondary rounded-2" accept="image/*" onChange={ handleInputs } />
                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div> 
                    {inputs?.icon && typeof inputs.icon === "string" && (
                      <div className="d-flex justify-content-center align-items-center border">
                        <img src={inputs.icon} height={160} width={200} alt="Logo" />
                      </div>
                    )}
                  </div>
                </div>

                {status !== 0 && (
                  <div className="col-md-6 py-2 rounded-1 mb-4">
                    <div className={`alert ${ status === 1 ? "alert-primary" : "alert-danger" }`}>
                      {message}
                    </div>
                  </div>
                )}
                <div className="row justify-content-end p-4 mb-4 border bg-white">
                  <div>  
                    <button type="submit" className="btn btn-main px-4 py-2">
                      Mettre à jour <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
