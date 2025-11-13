import React, { useEffect, useState } from "react";
import { BottomBar } from '"../../components/Footer";
import { TextReducer } from '"../../components/Component";


export function Layout({ menu, companyId, children })
{
    const [showSidebar, setShowSidebar] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth <= 900;
            setIsSmallScreen(isSmall);
            (isSmall) ? setShowSidebar(false) : setShowSidebar(true);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setShowSidebar(prev => !prev);

    
    return (

        <div className="p-0">
            <div className="container-fluid border-bottom">
                <div className="d-flex justify-content-between p-2 align-items-center">
                    <div className="d-flex gap-2">
                        <a className="btn btn-sm btn-outline-main" href={ "/mon-compte" } >  <i className="bi bi-arrow-left"></i>   </a>
                        <span className="text-secondary border py-1 px-3 hide"> Diwane <i className="bi bi-plus"></i> </span>    
                    </div> 
                    <div className="d-flex gap-4"> 
                        <div className="d-flex flex-column"> 
                            <span className="fs-xs text-secondary"> < TextReducer text={ localStorage.getItem('cname') } maxsize={20} /> </span>
                            <span className="fs-xs color-gray"> En ligne </span>
                        </div>
                        <img src={ localStorage.getItem('cicon') } height={40} width={40} alt="Logo" className="rounded-circle border border-3 p-1" /> 
                    </div> 
                </div> 
            </div>
            {/* ************************************************************************ */}   
            <div className="container-fluid"> 
                <div className="row"> 
                    {/* ************************************************************************ */}
                    <div className="sidebar d-flex flex-column p-0 pb-4 border-bottom">  
                        <div className="p-3 d-flex justify-content-end bg-blue-light-clr border-bottom"> 
                            <button className={`btn btn-sm rounded-4 text-muted sidebar-trigger`} onClick={toggleSidebar} >  
                                <img src={'../../img/icons8-menu-96.png'} height={34} width={34} alt="Logo" />
                            </button>  
                        </div>
                        {showSidebar && (
                        <div className={`d-flex flex-column p-0`}>
                            <a className={`border-bottom p-3 sidebar-menu ${ (menu ==== 1) ? 'sidebar-menu-active' : null } `} href={ `/entreprise/${companyId}` } >
                                <div className="d-flex flex-column justify-content-center align-items-center"> 
                                    <i class="bi bi-grid-fill fs-3 text-blue-clr"></i>
                                    <span className="text-secondary mt-2"> Généralité </span> 
                                </div>
                            </a>
                            <a className={`border-bottom p-3 sidebar-menu ${ (menu ==== 2) ? 'sidebar-menu-active' : null } `} href={ `/company/${companyId}/solde` } >
                                <div className="d-flex flex-column justify-content-center align-items-center"> 
                                    <i class="bi bi-wallet-fill fs-3 text-blue-clr"></i>
                                    <span className="text-secondary mt-2"> Solde </span> 
                                </div>
                            </a>
                            <a className={`border-bottom p-3 sidebar-menu ${ (menu ==== 3) ? 'sidebar-menu-active' : null } `} href={ `/company/${companyId}/propriete-reserve` } >
                                <div className="d-flex flex-column justify-content-center align-items-center"> 
                                    <i class="bi bi-calendar-check-fill fs-3 text-blue-clr"></i>
                                    <span className="text-secondary mt-2"> Mensualités </span> 
                                </div>
                            </a>
                            <a className={`border-bottom p-3 sidebar-menu ${ (menu ==== 4) ? 'sidebar-menu-active' : null } `} href={ `/company/${companyId}/notifications` } >
                                <div className="d-flex flex-column justify-content-center align-items-center"> 
                                    <i class="bi bi-bell-fill fs-3 text-blue-clr"></i>
                                    <span className="text-secondary mt-2"> Notification </span> 
                                </div>
                            </a>
                        </div>
                        )}
                    </div>
                    {/* ************************************************************************ */}
                    <div className="panel p-0 border-start"> { children } </div>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className="container-fluid level bg-blue-clr"> 
                <BottomBar /> 
            </div>
            {/* ************************************************************************ */} 
        </div>
    )
}


