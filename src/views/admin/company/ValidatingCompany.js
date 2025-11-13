import React, { useState, useEffect } from "react";
import { useQuery } from '"@tanstack/react-query";
import { Layout } from '"../Layout";
import { Navigation } from '"./Navigation";
import { CompanyApi } from '"../../../services/company.api";


export function ValidatingCompany()
{
    const [companyName, setCompanyName] = useState();
    const [filteredData, setFilteredData] = useState([]);
        
    const company = CompanyApi();
           
    const fetchCompanies = async () => {
        try {
            const res = await company.findAllValidating();
            console.log(res.data.data)
            return res.data.data; 
        } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["companies"], queryFn: fetchCompanies });
    
    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setCompanyName(value);
        const filtered = data.filter( (item) => item.name.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };
    

    return (

         <Layout menu={3}>            
            <div className="container-fluid bg-white">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">   
                            {/* **************************************************** */}
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="d-flex gap-4 align-items-center mb-4"> 
                                    <span className="h5 text-muted mt-2"> Entreprises </span>                         
                                </div>
                                <Navigation page={2} />
                            </div>
                            {/* **************************************************** */}
                            <div className="row d-flex justify-content-end align-items-center border-bottom py-3 px-4"> 
                                <div className="col-md-8 d-flex gap-2"> 
                                    <span className="form-control bg-light"> Filtre </span>
                                    <input type="text" name="companyName" value={companyName} className="form-control text-muted" placeholder="Recherche entreprise" required onChange={ handleInputChange } /> 
                                </div> 
                            </div>
                            {/* **************************************************** */}
                            <div className="p-4 scroll">
                            { 
                                isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-blue-clr" role="status" aria-label="Chargement"></div> </div>  ) : (
                                filteredData?.map(( item , index ) => { return(
                                    <div className="col-md-12 mb-3" >
                                    <div className="row border rounded-3 py-3" >
                                        <div className="col-sm-9 d-flex align-items-center gap-2 px-3"> 
                                            <img src={ item.icon } height={40} width={40} alt="Logo" className="rounded-circle border border-3 p-1" /> 
                                            <span className="color-blue"> { item.name } </span>
                                            <span className="text-secondary fs-xs"> { (item.status ==== 1) ? '(en cours de validation)' : '(invalidé)'  } </span>
                                        </div>
                                        <div className="col-sm-3"> 
                                            <a className="btn btn-sm btn-outline-main" href={`/admin/entreprise/${item.id}` } > Administrer </a>
                                        </div> 
                                    </div>
                                </div>
                                    
                                    )
                                }))      
                            }  
                            {
                                error ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                            }
                            {
                                ( Array.isArray(data) && data.length ==== 0 ) ? ( <div className="col-md-12"> <span className="d-flex border text-secondary px-4 py-3 mt-3"> La liste des entreprises en cours de validation est vide. </span> </div> ) : null
                            }                             

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

              
    )
}


