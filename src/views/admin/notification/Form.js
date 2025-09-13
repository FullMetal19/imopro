import vector from "../../../config/data";

export function FilterForm({filter, country, region, setCountry, setRegion, s})
{
    // const [filter, setFilter] = useState(false);

    return (

        <div className={`border-end pb-4 ${filter ? 'col-md-3' : 'col-md-12'} `}>
            
            <div className="row d-flex py-3 border-bottom mb-4 bg-three-clr"> 
                <span className="h5 px-4 text-muted mt-2"> Filtrer </span> 
            </div>

            <form className="d-flex flex-column px-3">
                <div className="d-flex flex-column mb-3">  
                    <span className="text-muted fs-xs mb-1"> Filter par entreprise </span>
                    <select className="form-control text-muted" value={country} name="country" onChange={(e) => setCountry(e.target.value)} >
                        <option value=""> Choisir une entreprise  </option>
                        {
                            vector?.region.map((item, index)=> ( <option value={item.name} key={index}> {item.content} </option> ))
                        }
                    </select>
                </div>
                <div className="d-flex flex-column mb-3">  
                    <span className="text-muted fs-xs mb-1"> Filter par mois </span>
                    <input type="month" name="month" className="form-control mb-2" required />
                </div>
                                 
            </form>
        </div>
    )
}