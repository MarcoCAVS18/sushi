import { useState, useEffect, useMemo } from "react";
import logo from "../images/logo.svg";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  // Usamos useMemo para evitar que sectionOrder cambie en cada render
  const sectionOrder = useMemo(() => ["calculator", "procedure", "video", "sushi-facts"], []);

  // Textos de botones para cada sección
  const buttonTexts = {
    "": "Let's Begin!",
    "calculator": "Next: Procedure",
    "procedure": "Next: Watch Video",
    "video": "Next: Sushi Facts",
    "sushi-facts": "Back to Calculator"
  };

  // Detectar la sección actual en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      // Si estamos cerca del inicio
      if (scrollPosition < 300) {
        setActiveSection("");
        return;
      }

      // Verificar cada sección en el DOM
      for (const id of [...sectionOrder].reverse()) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    // Inicialización y configuración de listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionOrder]); // Ahora sectionOrder está memorizado y no causará re-renders innecesarios

  // Función simplificada para manejar el click del botón
  const handleButtonClick = () => {
    // Determinar el destino basado en la sección actual
    let targetId;

    if (!activeSection || activeSection === "sushi-facts") {
      targetId = "calculator"; // Ir al inicio o volver al inicio desde facts
    } else {
      // Encontrar el índice actual y avanzar al siguiente
      const currentIndex = sectionOrder.indexOf(activeSection);
      targetId = sectionOrder[currentIndex + 1];
    }

    // Implementación directa de scroll
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Scroll con offset básico para navbar
      const yOffset = -100; 
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  // Determinar el texto del botón basado en la sección activa
  const buttonText = buttonTexts[activeSection] || "Let's Begin!";

  return (
    <nav className="bg-sectionPink shadow-md p-4 fixed w-full z-30 h-24 flex items-center">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="absolute left-2">
          <img src={logo} alt="Sushi Logo" className="h-24 w-auto" />
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center space-x-6 py-2 mx-auto">
          <a href="#calculator" className={`text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2 ${activeSection === "calculator" ? 'font-bold' : ''}`}>
            <span className={`rounded-full w-3 h-3 mr-2 ${activeSection === "calculator" ? 'bg-sectionDarkPurple' : 'bg-sectionOrange'}`}></span>
            Rice Calculator
          </a>
          <a href="#procedure" className={`text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2 ${activeSection === "procedure" ? 'font-bold' : ''}`}>
            <span className={`rounded-full w-3 h-3 mr-2 ${activeSection === "procedure" ? 'bg-sectionDarkPurple' : 'bg-sectionOrange'}`}></span>
            Procedure
          </a>
          <a href="#video" className={`text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2 ${activeSection === "video" ? 'font-bold' : ''}`}>
            <span className={`rounded-full w-3 h-3 mr-2 ${activeSection === "video" ? 'bg-sectionDarkPurple' : 'bg-sectionOrange'}`}></span>
            Watch & Learn
          </a>
          <a href="#sushi-facts" className={`text-black font-body relative group flex items-center transition-transform hover:scale-110 cursor-pointer p-2 ${activeSection === "sushi-facts" ? 'font-bold' : ''}`}>
            <span className={`rounded-full w-3 h-3 mr-2 ${activeSection === "sushi-facts" ? 'bg-sectionDarkPurple' : 'bg-sectionOrange'}`}></span>
            Sushi Facts
          </a>
        </div>

        {/* Botón móvil simplificado */}
        <button 
          onClick={handleButtonClick}
          className="md:hidden text-black font-body text-base font-bold bg-sectionOrange px-4 py-2 rounded-full text-white transition-all hover:scale-105 ml-auto"
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
