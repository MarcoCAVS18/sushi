import logo from "../images/logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-sectionPink shadow-md p-4 fixed w-full z-30">
      <div className="container mx-auto">
        <div className="flex justify-between md:justify-center items-center">
          {/* Logo para móvil - versión simplificada */}
          <div className="md:hidden flex items-center">
            <img 
              src={logo} 
              alt="Sushi Logo" 
              className="h-24 w-auto overflow-visible transform-gpu"
              style={{ maxHeight: "40px" }}
            />
          </div>
          
          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-6 py-2">
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
          
          {/* Botón de inicio para móvil */}
          <a 
            href="#calculator" 
            className="md:hidden text-black font-body text-base font-bold bg-sectionOrange px-4 py-2 rounded-full text-white transition-transform hover:scale-105"
          >
            Let's Begin!
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;