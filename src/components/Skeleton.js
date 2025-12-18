import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


export function ServiceSkeleton({value}) 
{
    return (

        Array(value).fill(0).map( (item, index) => { return (
            <div className="col-md-6 col-lg-4 mb-4" key={index}> 
                <div className="d-flex flex-column border p-4 bg-white"> 
                    <div className="d-flex justify-content-center align-items-center mb-2" > 
                        <Skeleton circle  width={120} height={120} /> 
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-2" > 
                        <Skeleton width={200} center /> 
                    </div>
                    <Skeleton count={ 3 } />
                </div>
            </div>
        )})
    )
}


export function LocationSkeleton({value, design}) 
{
    return (

        Array(value).fill(0).map( (item, index) => { return (
            <div className={ design } key={index}> 
                <div className="d-flex flex-column border bg-white mx-2"> 
                    <div className="" >
                        <Skeleton height={270} />
                    </div>
                </div>
            </div>
        )})
    )
}


export function HouseSkeleton({value, design}) 
{   
    return (

        Array(value).fill(0).map( (item, index) => { return (        
            <div className={ design } key={index} > 
                
                <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
                    {/* Image principale */}
                    <Skeleton height={250} />
                    {/* Galerie */}
                    <div className="d-flex gap-3 p-3">
                        <Skeleton width={80} height={60} />
                        <Skeleton width={80} height={60} />
                        <Skeleton width={80} height={60} />
                    </div>
                    {/* Contenu */}
                    <div className="px-3 pb-3 pt-1">
                        <Skeleton width={"70%"} height={25} />
                    </div>
                    <div className="border-top border-bottom py-2 px-3">
                        <Skeleton height={20} />
                        <Skeleton height={18} />
                    </div>
                    {/* Boutons */}
                    <div className="p-3">
                        <Skeleton height={40} />
                    </div>
                </div>

            </div>
        )})
    )
}


export function FieldSkeleton({ value, design}) 
{
    return (

        Array(value).fill(0).map( (item, index) => { return ( 
            <div className={ design } key={index} > 
                
                <div className="d-flex flex-column bg-white my-2 shadow-sm border rounded-2">
                    {/* Image principale */}
                    <Skeleton height={250} />
                    {/* Contenu */}
                    <div className="px-3 py-4">
                        <Skeleton width={"70%"} height={25} />
                    </div>
                    <div className="border-top border-bottom py-2 px-3">
                        <Skeleton height={20} />
                        <Skeleton height={18} />
                    </div>
                    {/* Boutons */}
                    <div className="p-3">
                        <Skeleton height={40} />
                    </div>
                </div>

            </div>
        )})
    )
}


export function TestimonialSkeleton({value})
{
    return (
        Array(value).fill(0).map( (item, index) => { return (
            <div className="col-lg-3 col-md-6 mb-3" key={index}> 
                <div className="d-flex flex-column bg-white p-3 rounded-3 shadow-sm scale">    
                    <div className="mb-2"> <Skeleton circle  width={120} height={120} />  </div>
                    <div className="mb-2"> <Skeleton count={4} /> </div>
                    <div className="mb-2"> <Skeleton width={180} /> </div>
                </div>
            </div> 
        )})     
    )
}