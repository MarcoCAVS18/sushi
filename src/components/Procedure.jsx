import { useState, useEffect, useMemo } from "react";

const Procedure = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = useMemo(() => [
    {
      title: "Clean the Rice",
      description: "Rinse the rice with clean water at least 7-11 times, until all the starch is removed and the water runs clear.",
      hasTimer: false,
      emoji: "🌊"
    },
    {
      title: "Cook on High Heat",
      description: "Place the rice and water in a pot and set it on high heat. Once the water starts boiling, reduce the heat to the minimum.",
      hasTimer: false,
      emoji: "🔥"
    },
    {
      title: "Simmer with Lid ON",
      description: "Wait for 20 minutes on low heat. NEVER REMOVE THE LID during this time.",
      hasTimer: true,
      time: 20 * 60,
      emoji: "♨️"
    },
    {
      title: "Rest Covered",
      description: "Turn off the heat and let the rice rest for 15 minutes with the lid still on.",
      hasTimer: true,
      time: 15 * 60,
      emoji: "😴"
    },
    {
      title: "Season and Cool",
      description: "Transfer all the rice to a plastic container. Add the vinegar and sugar mixture, gently folding to combine. Let rest for 15 minutes or until the rice cools down.",
      hasTimer: true,
      time: 15 * 60,
      emoji: "🧂"
    }
  ], []);

  useEffect(() => {
    if (currentStep < steps.length && steps[currentStep].hasTimer) {
      setTimeRemaining(steps[currentStep].time);
      setProgress(0);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    let interval = null;

    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);

        if (steps[currentStep].hasTimer) {
          const totalTime = steps[currentStep].time;
          const elapsed = totalTime - timeRemaining + 1;
          setProgress((elapsed / totalTime) * 100);
        }
      }, 1000);
    } else if (timeRemaining === 0 && timerRunning) {
      setTimerRunning(false);
      setProgress(100);
    }

    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining, currentStep, steps]);

  const startTimer = () => setTimerRunning(true);
  const pauseTimer = () => setTimerRunning(false);
  const resetTimer = () => {
    setTimerRunning(false);
    if (steps[currentStep].hasTimer) {
      setTimeRemaining(steps[currentStep].time);
      setProgress(0);
    }
  };

  const completeStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimerRunning(false);

      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTimeout(() => {
          setIsAnimating(false);
        }, 10);
      }, 300);
    } else {
      setCurrentStep(steps.length);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateStrokeOffset = (percent) => {
    const radius = 200;
    const circumference = 2 * Math.PI * radius;
    return circumference - (percent / 100) * circumference;
  };

  return (
    <section id="procedure" className="bg-sectionOrange px-4 py-12 md:p-8 text-center text-white">
      <h2 className="text-4xl md:text-6xl font-heading text-white mb-8">🍳 Sushi Rice Procedure 🍚</h2>
      
      {currentStep < steps.length ? (
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[600px] aspect-square">
            {/* SVG para círculos y progreso */}
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
              />

              {steps[currentStep].hasTimer && (
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 200}
                  strokeDashoffset={calculateStrokeOffset(progress)}
                  transform="rotate(-90 250 250)"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern id="dots-procedure" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
                <rect width="100" height="100" fill="url(#dots-procedure)" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-1/3 h-1/6 opacity-5 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M0,50 Q25,30 50,50 T100,50 M0,70 Q25,50 50,70 T100,70"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Contenedor de contenido */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
              {/* Indicadores de paso */}
              <div className="absolute bottom-8 sm:bottom-16 md:bottom-24 flex gap-2 sm:gap-4"> 
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentStep === index ? 'bg-white' : 'bg-white bg-opacity-30'}`} 
                  />
                ))}
              </div>

              {/* Contenido principal con animación */}
              <div
                className={`z-10 flex flex-col items-center transition-all duration-300 ease-out ${
                  isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                }`}
                style={{ transform: isAnimating ? 'translateX(100%)' : 'translateX(0)' }}
              >
                {/* Emoji del paso */}
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">
                  {steps[currentStep].emoji}
                </div>

                {/* Título y descripción */}
                <div className="mb-4 sm:mb-6 px-2 sm:px-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-body font-extrabold mb-2 sm:mb-4">{steps[currentStep].title}</h3>
                  <p className="text-sm sm:text-base md:text-xl font-body font-medium max-w-md mx-auto">{steps[currentStep].description}</p>
                </div>

                {/* Controles del temporizador */}
                {steps[currentStep].hasTimer && (
                  <div className="flex items-center gap-3 sm:gap-6 mb-4">
                    <div className="flex gap-2 sm:gap-4">
                      <button
                        onClick={timerRunning ? pauseTimer : startTimer}
                        className="bg-sectionPurple hover:bg-sectionDarkPurple text-white p-2 sm:p-4 rounded-full shadow-md transition-all text-xl sm:text-2xl"
                      >
                        {timerRunning ? "⏸️" : "▶️"}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="bg-sectionPurple hover:bg-sectionDarkPurple text-white p-2 sm:p-4 rounded-full shadow-md transition-all text-xl sm:text-2xl"
                      >
                        🔄
                      </button>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-body font-extrabold">{formatTime(timeRemaining)}</p>
                  </div>
                )}

                {/* Botón de completar */}
                <button
                  onClick={completeStep}
                  className="bg-white text-sectionDarkPurple px-6 sm:px-10 py-2 sm:py-4 rounded-full text-base sm:text-xl font-body font-extrabold shadow-md hover:scale-105 transition-transform"
                >
                  {steps[currentStep].hasTimer && timeRemaining > 0 && !timerRunning
                    ? "Skip & Complete"
                    : "Complete Step"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vista de completado */
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[600px] aspect-square">
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="rgba(142, 68, 173, 0.7)"
                stroke="white"
                strokeWidth="8"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-8">
                <span className="text-3xl sm:text-4xl md:text-5xl text-sectionPurple">✓</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-body font-extrabold mb-2 sm:mb-4">🎉 All Steps Completed! 🎉</h3>
              <p className="text-base sm:text-xl md:text-2xl font-body font-medium mb-4 sm:mb-8 px-4 max-w-lg">
                Your sushi rice is now perfectly prepared and ready for assembly.
              </p>
              <a
                href="#sushi-facts"
                className="bg-white text-sectionDarkPurple px-6 sm:px-10 py-2 sm:py-4 rounded-full text-base sm:text-xl font-body font-extrabold shadow-md hover:scale-105 transition-transform"
              >
                Go to Facts ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Procedure;