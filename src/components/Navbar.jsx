import logo from "../images/logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-sectionPink shadow-md p-4 fixed w-full z-30 h-24 flex items-center">
      <div className="container mx-auto flex justify-between items-center relative">
        
        {/* Logo más grande en móviles sin afectar el navbar */}
        <div className="absolute left-2">
          <img 
            src={logo} 
            alt="Sushi Logo" 
            className="h-24 w-auto"
          />
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center space-x-6 py-2 mx-auto">
          <a href="#calculator" className="text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2">
            <span className="bg-sectionOrange rounded-full w-3 h-3 mr-2"></span>
            Rice Calculator
          </a>
          <a href="#procedure" className="text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2">
            <span className="bg-sectionOrange rounded-full w-3 h-3 mr-2"></span>
            Procedure
          </a>
          <a href="#video" className="text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2">
            <span className="bg-sectionOrange rounded-full w-3 h-3 mr-2"></span>
            Watch & Learn
          </a>
          <a href="#sushi-facts" className="text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2">
            <span className="bg-sectionOrange rounded-full w-3 h-3 mr-2"></span>
            Facts
          </a>
        </div>
        
        {/* Botón de inicio para móvil alineado a la derecha */}
        <a 
          href="#calculator" 
          className="md:hidden text-black font-body text-base font-bold bg-sectionOrange px-4 py-2 rounded-full text-white transition-transform hover:scale-105 ml-auto"
        >
          Let's Begin!
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
