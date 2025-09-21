export function Navigation({ page, companyId })
{
    return (

        <div className="d-flex gap-4 align-items-center"> 
            <a className={`nav-link link-outline text-text-secondary fs-xs pb-1 ${(page===1) ? 'link-active' : null}`} href={`/entreprise/${companyId}`}> Propriétés-valides </a>
            <a className={`nav-link link-outline text-text-secondary fs-xs pb-1 ${(page===2) ? 'link-active' : null}`} href={`/entreprise/${companyId}/propriete-en-cours`}> Propriétés-en-cours </a>
            <a className={`nav-link link-outline text-text-secondary fs-xs pb-1 ${(page===3) ? 'link-active' : null}`} href={`/entreprise/${companyId}/propriete-invalide`}> Propriétés-invalides </a>
        </div>
    )
}