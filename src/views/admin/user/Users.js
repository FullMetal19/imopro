import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "../../../services/user.api";
import { Layout } from "../Layout";
import { Modal } from "./Modal";
import { BalanceContainer } from "./Container";


export function Users()
{
    const user = UserApi();
    const [phone, setPhone] = useState();
    const [filteredData, setFilteredData] = useState([]);
            
    const fetchUsers = async () => {
        try {
            const res = await user.findAll();
            return res.data.data; 
         } catch (err) { 
            throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        }
    }
    const { isLoading, data, error } = useQuery({  queryKey: ["users"], queryFn: fetchUsers });
        
    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                        
    const handleInputChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        const filtered = data.filter( (item) => item.phone.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };

   //-------------------------------------------------------------------------
    const [ modalState , setModalState ] = useState(false);
    const [ userId , setUserId ] = useState();
    const [ status , setStatus ] = useState();

    const setModal = (uid, status) => {
        setUserId(uid);
        setStatus(status);
        setModalState(true);
    }
    const closeModal = ( arg ) =>  setModalState( arg );
    //-------------------------------------------------------------------------
    
    return (
        
    <div className="">
        {/* ************************************************************************ */}
        { modalState ? ( <Modal method={ closeModal } uid={userId} state={status}  message={"Etes vous sure de modifier le status de cet utlisateur."} /> ) : null }
        {/* ************************************************************************ */}
        <Layout menu={5}>            
            <div className="container-fluid bg-white">
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">   
                            <div className="row d-flex flex-column bg-three-clr pt-4 px-4 border-bottom"> 
                                <div className="row d-flex justify-content-between gap-4 align-items-center mb-4"> 
                                    <div className="col-md-2" > <span className="h5 text-muted mt-2"> Paramétres </span> </div> 
                                </div>
                            </div>
                            <div className="row">
                                {/* *************************************************************************************** */}
                                <div className="col-md-4 d-flex flex-column p-0">
                                    <BalanceContainer />                                
                                </div>
                                {/* ********************************************************************************************************** */}
                                <div className="col-md-8">
                                    <div className="row px-4">
                                        <div className="col-md-12 border-bottom border-start border-end px-3 py-2 bg-three-clr mb-3">
                                            <div className="d-flex gap-2" > 
                                                <span className="form-control text-muted bg-three-clr"> Filtre num-tel de l'utilisateur </span>
                                                <input type="text" name="companyName" value={phone} className="form-control text-muted" placeholder="exemple : 778807689" required onChange={ handleInputChange } /> 
                                            </div>
                                        </div>
                                        {/* ------------------------------------------------- */}
                                        <div className="col-md-12 scroll d-flex flex-column px-0 pb-4">
                                        { 
                                            isLoading ? (  <div className="col-md-12 d-flex justify-content-center"> <img src={'../../img/icons8-iphone-spinner.gif'} height={50} width={50} alt="Logo" /> </div>  ) : (
                                            filteredData?.map(( item , index ) => { return(
                                                <div className="d-flex flex-column border rounded-3 py-2 mb-3" key={index}>
                                                    <div className="d-flex align-items-center gap-2 px-3 mb-1"> 
                                                        <img src={`${process.env.REACT_APP_PATH}/${item.image}`} height={40} width={40} alt="Logo" className="rounded-circle border border-3 p-1" />  
                                                        <div className="d-flex flex-column"> 
                                                            <span className="color-blue fs-xs"> { item?.fname + ' ' + item?.lname } </span>
                                                            <span className="color-gray fs-xs"> Tel : { item?.phone } </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-top pb-2 pt-3 px-3 gap-3"> 
                                                        <span className="border rounded-4 text-muted py-1 px-4 bg-three-clr"> { (item.status == 1) ? 'Compte actif' : ( ( item.status == 2 ) ? 'Compte admin actif' : ( ( item.status == -2 ) ? 'Compte admin bloqué' : 'Compte bloqué' ) )  } </span>
                                                        <button className="btn btn-sm btn-outline-main rounded-4 px-3" onClick={ () => setModal(item?.id, item?.status ) } > Modifier </button> 
                                                    </div> 
                                                </div>                                    
                                                    )
                                                }))      
                                            }  
                                            {
                                                error ? ( <div className="col-md-12"> <span className="border text-muted px-4 py-2 mt-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </span> </div> ) : null
                                            }
                                            {
                                                ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex bg-white shadow-sm text-muted p-3 border"> La liste des utilisateurs est vide. </div> ) : null
                                            }    

                                        </div>                                
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </div>    
              
    )
}




