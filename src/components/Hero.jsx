import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../images/logo.svg";

const bounceAnimation = {
    rest: { y: 0, transition: { type: "spring", stiffness: 300, damping: 10 } },
    hover: { y: -25, transition: { type: "spring", stiffness: 300, damping: 10 } },
    mobileAnimate: { 
        y: [-25, 0],
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 10,
            repeat: Infinity,
            repeatType: "reverse", 
            duration: 1,
            repeatDelay: 0.2
        } 
    }
};

const Hero = () => {
    const text = "Sushi with Marco!";
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es dispositivo móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="h-screen flex items-center justify-center text-center bg-sectionPink relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern id="diagonal-lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="black" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#diagonal-lines)" />
                    </svg>
                </div>

                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full rotate-180">
                        <pattern id="corner-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="black" />
                            <circle cx="18" cy="18" r="1" fill="black" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#corner-pattern)" />
                    </svg>
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center min-h-[200px]">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="absolute top-10 sm:top-[60px] md:top-[10px] lg:top-[-70px] left-1/2 transform -translate-x-1/2 w-128 z-20 pointer-events-none"
                    />

                    <p className="font-body text-black text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 select-none">
                        - Learn how to make sushi, or at least try! -
                    </p>

                    <h1 className="relative z-10 font-heading text-black uppercase cursor-grab text-5xl sm:text-6xl md:text-8.5xl lg:text-8.5xl xl:text-[100px] text-center">
                        {text.split(" ").map((word, wordIndex, array) => (
                            <span key={wordIndex} className="inline-block xs:block sm:inline-block">
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${charIndex}`}
                                        className="inline-block"
                                        variants={char === " " ? {} : bounceAnimation}
                                        initial="rest"
                                        whileHover="hover"
                                        animate={isMobile ? {
                                            y: [-25, 0],
                                            transition: { 
                                                type: "spring", 
                                                stiffness: 300, 
                                                damping: 10,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                delay: charIndex * 0.05 + wordIndex * 0.5, // Efecto cascada
                                                duration: 1,
                                                repeatDelay: Math.random() * 2 // Retraso aleatorio para efecto más natural
                                            }
                                        } : "rest"}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordIndex !== array.length - 1 && <span className="xs:hidden">&nbsp;</span>}
                                <span className="hidden xs:inline sm:hidden"><br /></span>
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;