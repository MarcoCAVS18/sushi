import { useState, useEffect, useMemo } from "react";

const SushiFacts = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [rotation, setRotation] = useState(0);

  const facts = useMemo(() => [
    {
      text: "Traditional sushi rolls are actually eaten with your fingers, not chopsticks!",
      icon: "🍱"
    },
    {
      text: "The word 'sushi' actually refers to the vinegared rice, not the raw fish!",
      icon: "🍚"
    },
    {
      text: "The most expensive sushi in the world costs over $1,978 per piece!",
      icon: "💎"
    },
    {
      text: "Salmon wasn't a traditional sushi fish - it was introduced in the 1980s!",
      icon: "🐟"
    },
    {
      text: "The practice of eating raw fish with rice started as a preservation method!",
      icon: "⏳"
    },
    {
      text: "Tuna is the most popular fish for sushi in Japan!",
      icon: "🐡"
    },
    {
      text: "There are over 100 different types of sushi!",
      icon: "📚"
    },
    {
      text: "A sushi chef trains for 10+ years before being considered a master!",
      icon: "👨‍🍳"
    },
    {
      text: "The first sushi restaurant outside Japan opened in the USA in 1966!",
      icon: "🏯"
    },
    {
      text: "Ginger is meant to be eaten between different types of sushi, not with it!",
      icon: "🌱"
    },
    {
      text: "The rice used in sushi is a special short-grain Japanese rice!",
      icon: "🌾"
    },
    {
      text: "Wasabi can help prevent food poisoning!",
      icon: "🌶"
    },
    {
      text: "The oldest type of sushi is fermented fish wrapped in rice!",
      icon: "📜"
    },
    {
      text: "Sushi chefs traditionally train to use their knives left-handed!",
      icon: "🔪"
    },
    {
      text: "The California roll was invented to introduce Americans to sushi!",
      icon: "🌊"
    }
  ], []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[randomIndex]);
    setRotation(Math.random() * 12 - 6);
  }, [facts]);

  if (!currentFact) return null;

  return (
    <section id='sushi-facts' className="relative min-h-[400px] bg-sectionPurple p-32 overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full rotate-12">
          <circle cx="50" cy="50" r="40" fill="white" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="white" />
        </svg>
      </div>
      
      {/* Decorative square */}
      <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-12">
          <rect x="25" y="25" width="50" height="50" fill="white" />
          <rect x="30" y="30" width="40" height="40" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div 
        className="group select-none relative max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-2xl 
                   shadow-xl transform transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                   hover:scale-[1.15] hover:rotate-[12deg] hover:shadow-2xl hover:bg-white/20 cursor-pointer
                   animate-float"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="absolute -top-6 -right-6 text-6xl select-none
                      transition-transform duration-500 ease-out
                      group-hover:scale-150 group-hover:rotate-[360deg] group-hover:animate-bounce">
          {currentFact.icon}
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-heading text-white mb-6 tracking-wide
                         transform transition-all duration-500
                         group-hover:scale-110 group-hover:translate-y-[-5px]">
            Did you know?
          </h2>
          
          <p className="text-2xl font-body font-medium text-white leading-relaxed
                       transform transition-all duration-500 delay-100
                       group-hover:scale-105 group-hover:translate-x-2">
            {currentFact.text}
          </p>
        </div>

        <div className="absolute bottom-4 left-8 right-8 h-1 bg-white/20 rounded-full
                       transform transition-all duration-500
                       group-hover:scale-x-110 group-hover:bg-white/40" />
        
        <div className="absolute -left-4 -top-4 w-8 h-8 bg-white/0 rounded-full
                       transition-all duration-500 ease-out
                       group-hover:bg-white/20 group-hover:scale-[3] group-hover:rotate-[45deg]" />
        <div className="absolute -right-4 -bottom-4 w-8 h-8 bg-white/0 rounded-full
                       transition-all duration-500 ease-out
                       group-hover:bg-white/20 group-hover:scale-[3] group-hover:rotate-[-45deg]" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: rotate(${rotation}deg) translateY(0px); }
          50% { transform: rotate(${rotation}deg) translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SushiFacts;