import { useState, useEffect } from "react";

const RiceCalculator = () => {
  const [mode, setMode] = useState("people");
  const [input, setInput] = useState("");
  const [result, setResult] = useState({
    riceNeeded: 0,
    water: 0,
    vinegar: 0,
    sugar: 0
  });

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "110px";
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollPaddingTop = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const formatNumber = (num) => {
    const validNum = Number(num) || 0;
    return validNum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculate = () => {
    const numericInput = Number(input) || 0;
    
    let riceNeeded;
    if (mode === "people") {
      riceNeeded = numericInput * 80; 
    } else {
      riceNeeded = numericInput; 
    }

    const water = (riceNeeded * 600) / 500;
    const vinegar = (riceNeeded * 100) / 500;
    const sugar = (riceNeeded * 60) / 500;

    setResult({ riceNeeded, water, vinegar, sugar });
  };

  const hasInput = input !== "" && !isNaN(Number(input)) && Number(input) > 0;
  const textColorClass = hasInput ? "" : "text-gray-400";

  return (
    <section id="calculator" className="relative bg-sectionPink px-4 py-16 md:p-20 text-center rounded-2xl text-black shadow-lg overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="black" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-32 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M0,50 Q25,30 50,50 T100,50 M0,70 Q25,50 50,70 T100,70"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute top-1/4 -left-8 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-45">
          <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="black" strokeWidth="1" />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-heading text-sectionDarkPurple mb-6 select-none">🍣 Rice Calculator 🍚</h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 my-6">
          <button 
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-body transition-all ${mode === "people" ? "bg-sectionOrange text-white shadow-md scale-105" : "bg-gray-300 text-black"}`}
            onClick={() => setMode("people")}
          >
            By People
          </button>
          <button 
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-body transition-all ${mode === "rice" ? "bg-sectionOrange text-white shadow-md scale-105" : "bg-gray-300 text-black"}`}
            onClick={() => setMode("rice")}
          >
            By Rice Amount
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <input
            type="number"
            placeholder={mode === "people" ? "👥 Number of people" : "🍚 Grams of rice"}
            className="p-3 border-2 border-sectionPurple rounded-lg text-black text-lg font-body w-full sm:w-64 text-center shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={calculate} 
            className="w-full sm:w-auto bg-sectionPurple text-white px-6 py-3 rounded-full text-lg font-body shadow-md hover:scale-105 transition-transform"
          >
            Calculate 🚀
          </button>
        </div>

        {/* Grid corregido para layout responsivo en diferentes dispositivos */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
          <div className="p-4 rounded-xl shadow-md border-2 bg-sectionLightPurple text-center transition-transform hover:scale-105 hover:shadow-lg cursor-grab">
            <p>🍚 Rice</p>
            <p className={`text-5xl sm:text-7xl lg:text-8.5xl font-body ${textColorClass}`}>{formatNumber(result.riceNeeded)}g</p>
          </div>
          <div className="p-4 rounded-xl shadow-md border-2 bg-sectionLightPurple text-center transition-transform hover:scale-105 hover:shadow-lg cursor-grab">
            <p>💧 Water</p>
            <p className={`text-5xl sm:text-7xl lg:text-8.5xl font-body ${textColorClass}`}>{formatNumber(result.water)}ml</p>
          </div>
          <div className="p-4 rounded-xl shadow-md border-2 bg-sectionLightPurple text-center transition-transform hover:scale-105 hover:shadow-lg cursor-grab">
            <p>🍶 Vinegar</p>
            <p className={`text-5xl sm:text-7xl lg:text-8.5xl font-body ${textColorClass}`}>{formatNumber(result.vinegar)}ml</p>
          </div>
          <div className="p-4 rounded-xl shadow-md border-2 bg-sectionLightPurple text-center transition-transform hover:scale-105 hover:shadow-lg cursor-grab">
            <p>🍬 Sugar</p>
            <p className={`text-5xl sm:text-7xl lg:text-8.5xl font-body ${textColorClass}`}>{formatNumber(result.sugar)}g</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiceCalculator;