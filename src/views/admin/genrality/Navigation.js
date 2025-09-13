export function Navigation({ page })
{
    return (

        <div className="d-flex gap-4 align-items-center"> 
            <a className={`nav-link link-outline text-muted fs-xs pb-1 ${(page===2) ? 'link-active' : null}`} href="/admin"> Propriétés-en-cours </a>
            <a className={`nav-link link-outline text-muted fs-xs pb-1 ${(page===3) ? 'link-active' : null}`} href="/admin/propriete-invalide"> Propriétés-invalides </a>
        </div>
    )
}