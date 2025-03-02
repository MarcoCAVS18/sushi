import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sectionGreen py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-white/90">
          <span className="font-body text-sm">
            What? How did we do this?
          </span>
          <div className="flex items-center gap-2">
            <span className="font-body text-sm text-white/80">Check it out</span>
            <a 
              href="https://github.com/MarcoCAVS18/sushi"
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="View source code on Github"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;