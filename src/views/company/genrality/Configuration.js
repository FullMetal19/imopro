// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Layout } from "../Layout";
// import Skeleton from "react-loading-skeleton";
// import Slider from "react-slick";
// import { LoaderModal, RemovingModal } from "./Modal";

// import { ProductApi } from "../../../services/product.api";
// import { useParams } from "react-router";
// import vector from "../../../config/data";

// import MapPicker from "../../../components/MapPicker" ; // adjust path if needed
// import { Modal } from "react-bootstrap";


// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
// };

// export function Configuration()
// {
//     const product = ProductApi();
//     let { companyId, propertyId } = useParams();

//     const fetchProperty = async (id) => { 
//         try {
//             const res = await product.findOne(id);
//             return res.data.data; 
//         } catch (err) { 
//             throw new Error('Erreur lors de la récupération des utilisateurs : ' + err.message);
//         }
//     }
//     const { isLoading, data, refetch } = useQuery({  queryKey: ["property", propertyId], queryFn: () => fetchProperty(propertyId),  enabled: !!propertyId });

//     // **************************************************************

//     const [selectedRegion, setSelectedRegion] = useState([]);
//     const [selectedType, setSelectedType] = useState([]); 
//     const [showMap, setShowMap] = useState(false);

//     const handleInputs = ( event ) => {
//         const { name , value } =  event.target ;
//         if( name === 'country' ) {
//             const selectedRegionData = vector.listRegion.find(item => item.country === value);
//             setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
//         }
//         if( name === 'type' ) {
//             const selectedTypeData = vector.listOfFieldType.find(item => item.type === value); 
//             setSelectedType(selectedTypeData ? selectedTypeData.subType : []);
//         }
//         setInputs( { ...inputs, [name] : value   } );
//     }

//     // ************************************************************************************
//     const [ inputs, setInputs ] = useState();
//     const [status, setStatus] = useState(0);
//     const [message, setMessage] = useState();
//     const [isLoading1, setIsLoading1] = useState(false);

//     useEffect(() => setInputs(data), [data]);

//     const handleForm = async ( event ) => {
//         event.preventDefault();
//         setIsLoading1(true);

//         try {
//             const res = await product.update(propertyId, inputs);
//             setIsLoading1(false);
//             if(res.data.success){
//                 setStatus(1);
//                 setMessage("Votre propriété a bien été modifiée");
//             }
//             else{
//                 setStatus(-1);
//                 setMessage(res.data.error);
//             }
//         } catch (err) {
//             setStatus(-1);
//             setIsLoading1(false);
//             setMessage('Une erreur est survenue lors de la création. Veuillez réessayer.');
//         }
//     } 

//     //-------------------------------------------------------------------------
//     const [ modalState , setModalState ] = useState(false);
//     const setModal = () => setModalState(true);
//     const closeModal = ( arg ) => setModalState( arg )  

        
//     return (

//     <div className="">
//         {
//             isLoading1 ? ( <LoaderModal /> ) : null 
//         }
//         {/* ************************************************************************ */}
//         { modalState ? ( <RemovingModal method={ closeModal } propertyId={propertyId} refetch={refetch} message={"Voulez vous vraiment supprimer cette propriété."} /> ) : null }
//         {/* ************************************************************************ */}
//         <Layout menu={1} companyId={companyId}>

//             {/* Map Modal */}
//             <Modal show={showMap} onHide={() => setShowMap(false)} centered size="xl" >
//               <Modal.Header closeButton>
//                 <Modal.Title>Choisir la localisation</Modal.Title>
//               </Modal.Header>
//                  <Modal.Body>
//                 <MapPicker
//                   onSelect={(coords) => {
//                     setInputs((prev) => ({ ...prev, latitude: coords.lat, longitude: coords.lng }));
//                     setShowMap(false); // close modal after picking
//                      }}
//                    />
//                 </Modal.Body>
//             </Modal>

//             <div className="container-fluid">
//                 <div className="row d-flex flex-column bg-white">   
//                     <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom"> 
//                         <div className="d-flex justify-content-between gap-4 align-items-center mb-4"> 
//                             <span className="h5 text-secondary mt-2 border px-4 py-2"> Configuration </span>
//                             <button className="btn btn-sm btn-main" onClick={ setModal } > Supprimer </button>
//                         </div>
//                     </div>
//                     <div className="col-md-12">
//                         <div className="row p-4 scroll">

//                             <form className="col-md-12" onSubmit={ handleForm } >
//                                 <div className="row d-flex justify-content-center my-4">
                                 
//                                     <div className="col-lg-10 d-flex flex-column">

//                                         <div className="row d-flex align-item-center p-4 mb-4 bg-three-clr border-left-main">
//                                           <span className="text-secondary lead py-1"> Formulaire de mise à jour d'une propriété </span>
//                                         </div>

//                                         <div className="row">
//                                           {/* -------------------------------------------------------------------------  */}
//                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
//                                             <div className="row"> 

//                                               <div className="col-md-6">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Catégorie de propriété  </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="type" value={ inputs?.type || "" } required onChange={ handleInputs } >
//                                                            <option value=""> Choisir une catégorie  </option>
//                                                            {
//                                                                vector.propertyType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
//                                                            }
//                                                        </select>
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div> 
//                                                 </div>
//                                               </div>
//                                               <div className="col-md-6">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Type de propriété  </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="subtitle" value={ inputs?.subtitle || "" } required onChange={ handleInputs } >
//                                                            <option value=""> Choisir un type  </option>
//                                                            {
//                                                                selectedType?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
//                                                            }
//                                                        </select>
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-md-6">
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Dimension [<span className=" px-2 text-danger"> en metre carré </span>]  </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="number" name="surface" value={inputs?.surface || ""} className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-md-6">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Status de propriété </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                         <select className="w-100 border input p-3 text-secondary rounded-2" name="title" value={inputs?.title || ""} required onChange={ handleInputs } >
//                                                             <option value=""> Choisir un status  </option>
//                                                             <option value="à louer"> A louer </option>
//                                                             <option value="à vendre"> A vendre </option>
//                                                         </select>
//                                                         <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-md-12">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Description [ <span className=" px-2 text-danger"> * </span>  ] </span>
//                                                     <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" value={inputs?.description || ""} rows={8} required onChange={handleInputs} />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                            {/* -------------------------------------------------------------------------  */}
//                                            {
//                                               inputs?.type?.toLowerCase() === "logement" && (

//                                           <div className="col-md-12 mb-4 bg-white p-4 border border-primary rounded-2">
//                                             <div className="row"> 
//                                               <div className="col-lg-6">
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="number" name="bedroom" value={inputs?.bedroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                       <input type="number" name="livingroom" value={inputs?.livingroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="number" name="restroom" value={inputs?.restroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="number" name="kitchen" value={inputs?.kitchen || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                  <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                       <input type="number" name="floor" value={inputs?.floor || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           )
//                                           }  
//                                           {/* -------------------------------------------------------------------------  */}
//                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
//                                             <div className="row"> 
//                                               <div className="col-lg-6">
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                       <input type="number" name="price" value={inputs?.price || ""} className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
//                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                 <div className="d-flex flex-column">  
//                                                     <span className="text-muted fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="number" name="guaranty" value={inputs?.guaranty || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           {/* -------------------------------------------------------------------------  */}
//                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
//                                             <div className="row d-flex justify-content-center"> 
//                                               <div className="col-md-8">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-3"> Images des propriétés  </span>
//                                                     <div className="d-flex gap-1 mb-2 border rounded-3 p-3" >
//                                                        { 
//                                                             isLoading ? ( <Skeleton height={300} /> ) : (
//                                                             <div className="slider-container mb-4">
//                                                                 <Slider {...settings}> 
//                                                                     { 
//                                                                         data?.media.map( (item , index) => { return (
//                                                                             <div className="d-flex" key={index} > <img src= {`${item.path}`} alt="Logo" height={300} className="img-fluid" />  </div>
//                                                                         )}) 
//                                                                     }    
//                                                                 </Slider>
//                                                             </div>  ) 
//                                                        } 
//                                                     </div> 
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           {/* -------------------------------------------------------------------------  */}
//                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
//                                             <div className="row"> 
//                                               <div className="col-lg-6">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Pays </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                         <select className="w-100 border input p-3 text-secondary rounded-2" name="country" value={inputs?.country || ""} required onChange={ handleInputs } >
//                                                             <option value=""> Choisir un pays  </option>
//                                                             {
//                                                                 vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
//                                                             }
//                                                         </select>
//                                                         <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6"> 
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Région </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                         <select className="w-100 border input p-3 text-secondary rounded-2" name="region" value={inputs?.region || ""} required onChange={ handleInputs } >
//                                                             <option value=""> Choisir une région  </option>
//                                                             {
//                                                                 selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
//                                                             }
//                                                         </select>
//                                                         <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
//                                                     </div>
//                                                 </div>
//                                               </div>
//                                                <div className="col-lg-9">
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> Adresse </span>
//                                                     <div className="d-flex gap-1 mb-2" >
//                                                        <input type="text" name="address" value={ inputs?.address  || "" } className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
//                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
//                                                     </div>
//                                                 </div>
//                                               </div> 
//                                               <div className="col-lg-3"> 
//                                                 <div className="d-flex flex-column mb-2">
//                                                     <span className="text-muted fs-xs mb-1"> Localisation [ <span className=" px-2 text-danger"> * </span>  ]  </span>
//                                                     <button type="button" className="btn p-3 btn-outline-main mb-1" onClick={() => setShowMap(true)} > Géolocaliser la propriété </button>
                                                    
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6" >
//                                                 <div className="d-flex flex-column mb-2">  
//                                                   <span className="text-muted fs-xs mb-1"> La longitude </span>
//                                                   <input type="text" name="longitude" value={inputs?.longitude || ""} className="w-100 border input p-3 text-secondary rounded-2" />
//                                                 </div>
//                                               </div>
//                                               <div className="col-lg-6" >
//                                                 <div className="d-flex flex-column mb-2">  
//                                                     <span className="text-muted fs-xs mb-1"> La latitude </span>
//                                                     <input type="text" name="latitude" value={inputs?.latitude || ""} className="w-100 border input p-3 text-secondary rounded-2" />
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           </div>
//                                           {/* -------------------------------------------------------------------------  */}
//                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
//                                             <div className="row mb-4 border-bottom"> 
//                                                 {
//                                                 ( status === 1 ) ? 
//                                                 (  <div className="my-3"> <div className="alert alert-success border py-2 px-4 rounded-1"> { message } </div> </div> ) :
//                                                 ( status === -1 ) ?
//                                                 (  <div className="my-3"> <div className="alert alert-danger border py-2 px-4 rounded-1"> { message } </div> </div>) : null
//                                                 }
//                                             </div>
//                                             <div className="row"> 
//                                                <div> <button type="submit" className="btn btn-main"> Mettre à jour </button> </div>
//                                             </div>
//                                           </div>

//                                           {/* -------------------------------------------------------------------------  */}
    
//                                         </div>
//                                     </div>

//                                 </div>
//                             </form>
                                                    
//                         </div>
//                     </div> 
//                 </div>                    
//             </div>
//             {/* ************************************************************************ */} 
//         </Layout>    
//     </div>

//     )
// }



import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../Layout";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import { LoaderModal, RemovingModal } from "./Modal";
import { ProductApi } from "../../../services/product.api";
import { useParams } from "react-router";
import vector from "../../../config/data";
import MapPicker from "../../../components/MapPicker"; 
import { Modal } from "react-bootstrap";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export function Configuration() {
  const product = ProductApi();
  const { companyId, propertyId } = useParams();

  // Fetch property details
  const fetchProperty = async (id) => {
    const res = await product.findOne(id);
    return res.data.data;
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchProperty(propertyId),
    enabled: !!propertyId,
  });

  // States
  const [inputs, setInputs] = useState({});
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState(false);

  // Sync fetched data into form
  useEffect(() => {
    if (data) {
      setInputs(data);
       console.log(data);
      // Preload regions and types based on data
      const selectedRegionData = vector.listRegion.find(
        (item) => item.country === data.country
      );
      setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);

      const selectedTypeData = vector.listOfFieldType.find(
        (item) => item.type === data.type
      );
      setSelectedType(selectedTypeData ? selectedTypeData.subType : []);
    }
  }, [data]);

  // Input handler
  const handleInputs = (event) => {
    const { name, value } = event.target;

    if (name === "country") {
      const selectedRegionData = vector.listRegion.find(
        (item) => item.country === value
      );
      setSelectedRegion(selectedRegionData ? selectedRegionData.region : []);
    }

    if (name === "type") {
      const selectedTypeData = vector.listOfFieldType.find(
        (item) => item.type === value
      );
      setSelectedType(selectedTypeData ? selectedTypeData.subType : []);
    }

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleForm = async (event) => {
    event.preventDefault();
    setIsLoading1(true);
    setStatus(0);
    setMessage("");

    try {
      const res = await product.update(propertyId, inputs);
      setIsLoading1(false);

      if (res.data.success) {
        setStatus(1);
        setMessage("Votre propriété a bien été mise à jour");
        refetch();
      } else {
        setStatus(-1);
        setMessage(res.data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setIsLoading1(false);
      setStatus(-1);
      setMessage("Une erreur est survenue. Veuillez réessayer");
    }
  };

  //  Modal functions
  const openModal = () => setModalState(true);
  const closeModal = (arg) => setModalState(arg);

  return (
    <div>
      {isLoading1 && <LoaderModal />}
      {modalState && (
        <RemovingModal
          method={closeModal}
          propertyId={propertyId}
          refetch={refetch}
          message={"Voulez-vous vraiment supprimer cette propriété ?"}
        />
      )}

      <Layout menu={1} companyId={companyId}>
        {/* Map Picker Modal */}
        <Modal show={showMap} onHide={() => setShowMap(false)} centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Choisir la localisation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapPicker
              onSelect={(coords) => {
                setInputs((prev) => ({
                  ...prev,
                  latitude: coords.lat,
                  longitude: coords.lng,
                }));
                setShowMap(false);
              }}
            />
          </Modal.Body>
        </Modal>

        <div className="container-fluid">
          <div className="row d-flex flex-column bg-white">
            <div className="d-flex flex-column bg-blue-light-clr pt-4 px-4 border-bottom">
              <div className="d-flex justify-content-between gap-4 align-items-center mb-4">
                <span className="h5 text-secondary mt-2 border px-4 py-2">
                  Configuration
                </span>
                <button className="btn btn-sm btn-main" onClick={openModal}>
                  Supprimer
                </button>
              </div>
            </div>

            <div className="col-md-12">
              <div className="row p-4 scroll">
                {isLoading ? (
                  <Skeleton height={400} />
                ) : (
                  <form className="col-md-12" onSubmit={handleForm}>
                    
                    <div className="row d-flex justify-content-center my-4">
                                 
                                     <div className="col-lg-10 d-flex flex-column">

                                         <div className="row d-flex align-item-center p-4 mb-4 bg-three-clr border-left-main">
                                            <span className="text-secondary lead py-1"> Formulaire de mise à jour d'une propriété </span>
                                         </div>

                                         <div className="row">
                                           {/* -------------------------------------------------------------------------  */}
                                           <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                             <div className="row"> 

                                               <div className="col-md-6">
                                                 <div className="d-flex flex-column mb-2">  
                                                     <span className="text-muted fs-xs mb-1"> Catégorie de propriété  </span>
                                                     <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="type" value={ inputs?.type || "" } required onChange={ handleInputs } >
                                                            <option value=""> Choisir une catégorie  </option>
                                                            {
                                                               vector.propertyType.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                           }
                                                       </select>
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div> 
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Type de propriété  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <select className="w-100 border input p-3 text-secondary rounded-2" name="subtitle" value={ inputs?.subtitle || "" } required onChange={ handleInputs } >
                                                           <option value=""> Choisir un type  </option>
                                                           {
                                                               selectedType?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                           }
                                                       </select>
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Dimension [<span className=" px-2 text-danger"> en metre carré </span>]  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="surface" value={inputs?.surface || ""} className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Status de propriété </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="title" value={inputs?.title || ""} required onChange={ handleInputs } >
                                                            <option value=""> Choisir un status  </option>
                                                            <option value="à louer"> A louer </option>
                                                            <option value="à vendre"> A vendre </option>
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-md-12">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Description [ <span className=" px-2 text-danger"> * </span>  ] </span>
                                                    <textarea className="w-100 border input p-3 text-secondary rounded-2" name="description" value={inputs?.description || ""} rows={8} required onChange={handleInputs} />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                           {/* -------------------------------------------------------------------------  */}
                                           {
                                              inputs?.type?.toLowerCase() === "logement" && (

                                          <div className="col-md-12 mb-4 bg-white p-4 border border-primary rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1">  Nombre de chambre  </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="bedroom" value={inputs?.bedroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de Salon </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="livingroom" value={inputs?.livingroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de toilette </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="restroom" value={inputs?.restroom || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de cuisine </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="kitchen" value={inputs?.kitchen || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                 <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Nombre de niveau </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="floor" value={inputs?.floor || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          )
                                          }  
                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le prix de la propriété (en Fcfa) </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                      <input type="number" name="price" value={inputs?.price || ""} className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column">  
                                                    <span className="text-muted fs-xs mb-1"> Le montant de la guarantie (en Fcfa) </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="number" name="guaranty" value={inputs?.guaranty || ""} className="w-100 border input p-3 text-secondary rounded-2" onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row d-flex justify-content-center"> 
                                              <div className="col-md-8">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-3"> Images des propriétés  </span>
                                                    <div className="d-flex gap-1 mb-2 border rounded-3 p-3" >
                                                      {
                                                        isLoading ? (
                                                          <Skeleton height={300} />
                                                        ) : (
                                                          <div className="slider-container mb-4">
                                                            <Slider {...settings}>
                                                              {inputs?.media && inputs.media.length > 0 ? (
                                                                inputs.media.map((item, index) => {
                                                                  const imageUrl = item?.path?.startsWith("http") ? item.path : `${process.env.REACT_APP_API_URL || ""}${item.path}`;
                                                                  return (
                                                                    <div className="d-flex justify-content-center" key={index}>
                                                                      <img src={imageUrl} alt={`Image ${index + 1}`}  height={300} className="img-fluid rounded-3 border" />
                                                                    </div>
                                                                 );
                                                                })
                                                              ) : (
                                                               <div className="text-center text-muted py-4">
                                                                  Aucune image disponible
                                                                </div>
                                                              )}
                                                            </Slider>
                                                          </div>
                                                        )
                                                      }
                                                    </div> 
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row"> 
                                              <div className="col-lg-6">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Pays </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="country" value={inputs?.country || ""} required onChange={ handleInputs } >
                                                            <option value=""> Choisir un pays  </option>
                                                            {
                                                                vector.listCountry.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                                                            }
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                              <div className="col-lg-6"> 
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Région </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                        <select className="w-100 border input p-3 text-secondary rounded-2" name="region" value={inputs?.region || ""} required onChange={ handleInputs } >
                                                            <option value=""> Choisir une région  </option>
                                                            {
                                                                selectedRegion?.map((item, index)=> ( <option value={item?.name} key={index}> {item?.content} </option> ))
                                                            }
                                                        </select>
                                                        <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div>
                                               <div className="col-lg-9">
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> Adresse </span>
                                                    <div className="d-flex gap-1 mb-2" >
                                                       <input type="text" name="address" value={ inputs?.address  || "" } className="w-100 border input p-3 text-secondary rounded-2" required onChange={ handleInputs } />
                                                       <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                                                    </div>
                                                </div>
                                              </div> 
                                              <div className="col-lg-3"> 
                                                <div className="d-flex flex-column mb-2">
                                                    <span className="text-muted fs-xs mb-1"> Localisation [ <span className=" px-2 text-danger"> * </span>  ]  </span>
                                                    <button type="button" className="btn p-3 btn-outline-main mb-1" onClick={() => setShowMap(true)} > Géolocaliser la propriété </button>
                                                    
                                                </div>
                                              </div>
                                              <div className="col-lg-6" >
                                                <div className="d-flex flex-column mb-2">  
                                                  <span className="text-muted fs-xs mb-1"> La longitude </span>
                                                  <input type="text" name="longitude" value={inputs?.longitude || ""} className="w-100 border input p-3 text-secondary rounded-2" />
                                                </div>
                                              </div>
                                              <div className="col-lg-6" >
                                                <div className="d-flex flex-column mb-2">  
                                                    <span className="text-muted fs-xs mb-1"> La latitude </span>
                                                    <input type="text" name="latitude" value={inputs?.latitude || ""} className="w-100 border input p-3 text-secondary rounded-2" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* -------------------------------------------------------------------------  */}
                                          <div className="col-md-12 mb-4 bg-white p-4 border rounded-2">
                                            <div className="row mb-4 border-bottom"> 
                                                {
                                                ( status === 1 ) ? 
                                                (  <div className="my-3"> <div className="alert alert-primary border py-2 px-4 rounded-1"> { message } </div> </div> ) :
                                                ( status === -1 ) ?
                                                (  <div className="my-3"> <div className="alert alert-danger border py-2 px-4 rounded-1"> { message } </div> </div>) : null
                                                }
                                            </div>
                                            <div className="row"> 
                                               <div> <button type="submit" className="btn btn-main"> Mettre à jour </button> </div>
                                            </div>
                                          </div>

                                          {/* -------------------------------------------------------------------------  */}
    
                                        </div>
                                    </div>

                                </div>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}



