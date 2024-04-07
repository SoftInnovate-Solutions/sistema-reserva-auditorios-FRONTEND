import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const btnLink = 'block inline-block py-1 text-white hover:text-secondary cursor-pointer mr-4'
  const activeLink = 'block inline-block py-1 text-secondary mr-4'
  return (
    <header className ="text-gray-600 body-font">
    <div className ="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a className ="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className ="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className ="ml-3 text-xl font-semiblod text-white">SOFTINNOVATE SOLUTIONS</span>
      </a>
      <nav className ="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
       
       <NavLink to="/reserva" className={ ({isActive}) => isActive?activeLink:btnLink}>Reserva</NavLink>
       <NavLink to="/historial"className={ ({isActive}) => isActive?activeLink:btnLink}>Historial</NavLink>
       <NavLink to="/contacto"className={ ({isActive}) => isActive?activeLink:btnLink}>Contacto</NavLink>
      </nav>  
      <NavLink to="/inicio"className={ ({isActive}) => isActive?activeLink:btnLink}>Inicio</NavLink>
      <NavLink to="/registro"className={ ({isActive}) => isActive?activeLink:btnLink}>Registro</NavLink>
        
     {/* <button className ="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className ="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>*/}
    </div>
  </header>
  )
}
export default NavBar;
