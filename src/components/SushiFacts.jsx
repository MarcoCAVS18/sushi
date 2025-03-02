import { useState, useEffect } from "react";
import { getAllFacts } from "../services/factService";

const SushiFacts = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar facts de Firestore
  useEffect(() => {
    const fetchFacts = async () => {
      setLoading(true);
      try {
        const fetchedFacts = await getAllFacts();
        setFacts(fetchedFacts);
        
        // Seleccionar un fact aleatorio si hay facts disponibles
        if (fetchedFacts.length > 0) {
          const randomIndex = Math.floor(Math.random() * fetchedFacts.length);
          setCurrentFact(fetchedFacts[randomIndex]);
          setRotation(Math.random() * 12 - 6);
        }
      } catch (err) {
        console.error("Error fetching facts:", err);
        setError("Could not load sushi facts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, []);

  // Mostrar estado de carga
  if (loading) {
    return (
      <section id="sushi-facts" className="relative bg-sectionPurple py-12 px-4 sm:py-20 md:py-32 overflow-hidden">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-white text-xl">Loading facts...</div>
        </div>
      </section>
    );
  }

  // Mostrar error si ocurre
  if (error || !currentFact) {
    return (
      <section id="sushi-facts" className="relative bg-sectionPurple py-12 px-4 sm:py-20 md:py-32 overflow-hidden">
        <div className="flex justify-center items-center h-40">
          <div className="text-white text-xl">{error || "No facts available."}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="sushi-facts" className="relative bg-sectionPurple py-12 px-4 sm:py-20 md:py-32 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-[-30px] right-[-30px] sm:top-[-50px] sm:right-[-50px] w-40 sm:w-64 h-40 sm:h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-12">
          <circle cx="50" cy="50" r="40" fill="white" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="white" />
        </svg>
      </div>
      
      <div className="absolute bottom-[-20px] left-[-20px] sm:bottom-[-30px] sm:left-[-30px] w-32 sm:w-48 h-32 sm:h-48 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-12">
          <rect x="25" y="25" width="50" height="50" fill="white" />
          <rect x="30" y="30" width="40" height="40" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* Contenedor de fact con animación */}
      <div 
        className="group select-none relative max-w-sm sm:max-w-xl md:max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl 
                 shadow-xl transform transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                 hover:scale-[1.15] hover:rotate-[12deg] hover:shadow-2xl hover:bg-white/20 cursor-pointer
                 animate-float"
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={() => {
          // Opcionalmente, cambiar a otro fact al hacer clic
          if (facts.length > 1) {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * facts.length);
            } while (facts[newIndex].id === currentFact.id);
            
            setCurrentFact(facts[newIndex]);
            setRotation(Math.random() * 12 - 6);
          }
        }}
      >
        {/* Icono decorativo */}
        <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-4xl sm:text-6xl select-none
                    transition-transform duration-500 ease-out
                    group-hover:scale-150 group-hover:rotate-[360deg] group-hover:animate-bounce">
          {currentFact.icon}
        </div>

        {/* Contenido principal */}
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-4 sm:mb-6 tracking-wide
                       transform transition-all duration-500
                       group-hover:scale-110 group-hover:translate-y-[-5px]">
            Did you know?
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl font-body font-medium text-white leading-relaxed
                     transform transition-all duration-500 delay-100
                     group-hover:scale-105 group-hover:translate-x-2">
            {currentFact.text}
          </p>
        </div>

        {/* Línea decorativa */}
        <div className="absolute bottom-4 left-8 right-8 h-1 bg-white/20 rounded-full
                     transform transition-all duration-500
                     group-hover:scale-x-110 group-hover:bg-white/40" />
        
        {/* Elementos decorativos adicionales */}
        <div className="absolute -left-4 -top-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/0 rounded-full
                     transition-all duration-500 ease-out
                     group-hover:bg-white/20 group-hover:scale-[3] group-hover:rotate-[45deg]" />
        <div className="absolute -right-4 -bottom-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/0 rounded-full
                     transition-all duration-500 ease-out
                     group-hover:bg-white/20 group-hover:scale-[3] group-hover:rotate-[-45deg]" />
      </div>

     
    </section>
  );
};

export default SushiFacts;