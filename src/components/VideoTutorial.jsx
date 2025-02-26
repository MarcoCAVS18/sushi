import React from 'react';

const VideoTutorial = () => {
  return (
    <section id="video" className="relative bg-sectionPink py-12 px-4 sm:py-16 sm:px-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 sm:w-48 h-24 sm:h-48 opacity-20 transform rotate-45 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="45" y="10" width="4" height="80" fill="black" rx="2" />
          <rect x="55" y="10" width="4" height="80" fill="black" rx="2" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="black"
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Title Group with Animation */}
        <div className="mb-8 sm:mb-12 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-black mb-3 sm:mb-4 relative z-10 transform hover:scale-105 transition-transform duration-300">
            Learn to Roll Sushi Like a Pro! 🎌
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-body text-black/80 max-w-2xl mx-auto mb-2 hover:scale-105 transition-transform duration-300">
            Master the art of sushi rolling with our comprehensive tutorial
          </p>
          
          {/* Decorative underline */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-black/20 
                        rounded-full transition-all duration-300 hover:w-48 sm:hover:w-64 hover:bg-black/40" />
        </div>

        {/* Video Container with Decorative Frame */}
        <div className="relative group">
          {/* Decorative frame corners */}
          <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-black/20 
                       group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 sm:w-12 h-8 sm:h-12 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-black/20 
                       group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-black/20 
                       group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-8 sm:w-12 h-8 sm:h-12 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-black/20 
                       group-hover:scale-110 transition-transform duration-300" />

          {/* Video iframe */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl 
                       transform transition-all duration-500 
                       group-hover:scale-[1.02] group-hover:shadow-3xl">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/40MiH9-FQ5w"
              title="Learn to Roll Sushi"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Floating plate decoration */}
          <div className="absolute -right-6 -bottom-6 sm:-right-12 sm:-bottom-12 w-12 sm:w-24 h-12 sm:h-24 opacity-20 animate-spin-slow pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="black" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorial;
