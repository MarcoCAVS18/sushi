import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { getFeedbackStats, submitFeedback } from "../services/feedbackService";

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [comment, setComment] = useState("");
  const [stats, setStats] = useState({ likes: 0, dislikes: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Cargar la selección previa del usuario
    const savedFeedback = localStorage.getItem("userFeedback");
    if (savedFeedback) {
      setSelectedFeedback(savedFeedback);
    }

    // Cargar estadísticas desde Firebase
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const feedbackStats = await getFeedbackStats();
        setStats(feedbackStats);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleFeedbackSelection = async (type) => {
    if (selectedFeedback === type || isLoading) return;

    setIsAnimating(true);
    setIsLoading(true);
    
    try {
      // Actualizar Firebase
      await submitFeedback(type);
      
      // Actualizar estadísticas locales correctamente
      const newStats = { ...stats };
      
      if (selectedFeedback) {
        // Si ya tenía selección, disminuir el anterior
        newStats[`${selectedFeedback}s`] = Math.max(0, newStats[`${selectedFeedback}s`] - 1);
      }
      
      // Aumentar el nuevo
      newStats[`${type}s`] = (newStats[`${type}s`] || 0) + 1;
      
      setStats(newStats);
      setSelectedFeedback(type);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !selectedFeedback || isLoading) return;

    setIsLoading(true);
    
    try {
      await submitFeedback(selectedFeedback, comment);
      setComment("");
      setSubmitSuccess(true);
      
      // Ocultar mensaje de éxito después de unos segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="feedback" className="relative bg-sectionDarkPurple py-12 px-4 sm:py-16 sm:px-12 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white transform -rotate-45" />
        <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white transform rotate-45" />
      </div>

      {/* Mensaje de éxito */}
      {submitSuccess && (
        <div className="fixed top-20 opacity-80 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          Thank for your feedback!
        </div>
      )}

      <div className="relative max-w-sm sm:max-w-lg md:max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-heading text-white mb-6 sm:mb-8">
            Did this help you?
          </h2>

          {/* Botones de feedback */}
          <div className="flex justify-center gap-8 sm:gap-12 mb-4 sm:mb-6">
            <button
              onClick={() => handleFeedbackSelection("like")}
              className={`group flex flex-col items-center transition-all duration-300
                         ${selectedFeedback === "like" ? "scale-110" : "hover:scale-105"}
                         ${isLoading ? "opacity-50 cursor-wait" : ""}`}
              disabled={isLoading}
            >
              <ThumbsUp
                size={28}
                className={`transition-all duration-300
                          ${selectedFeedback === "like"
                    ? "text-white"
                    : "text-white/60 group-hover:text-white"}`}
              />
              <span className="text-white/80 mt-2">{stats.likes || 0}</span>
            </button>

            <button
              onClick={() => handleFeedbackSelection("dislike")}
              className={`group flex flex-col items-center transition-all duration-300
                         ${selectedFeedback === "dislike" ? "scale-110" : "hover:scale-105"}
                         ${isLoading ? "opacity-50 cursor-wait" : ""}`}
              disabled={isLoading}
            >
              <ThumbsDown
                size={28}
                className={`transition-all duration-300
                          ${selectedFeedback === "dislike"
                    ? "text-white"
                    : "text-white/60 group-hover:text-white"}`}
              />
              <span className="text-white/80 mt-2">{stats.dislikes || 0}</span>
            </button>
          </div>
        </div>

        {/* Sección de comentarios - aparece después de seleccionar feedback */}
        {selectedFeedback && (
          <div className={`transform transition-all duration-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
            <h3 className="text-xl sm:text-2xl font-heading text-white mb-3 sm:mb-4">
              {selectedFeedback === "like"
                ? "Great! Tell us what you liked the most"
                : "We're sorry! Tell us how we can improve"}
            </h3>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 sm:p-4 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm rounded-lg 
                           border border-white/20 text-white placeholder-white/50
                           font-body focus:outline-none focus:ring-2 focus:ring-white/30
                           transition-all duration-300 resize-none h-24 sm:h-32"
                />
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white/50 text-sm">
                  {comment.length}/500
                </div>
              </div>

              <button
                type="submit"
                className={`bg-white text-sectionDarkPurple px-6 sm:px-8 py-2 sm:py-3 rounded-lg
                         font-body font-bold transform hover:scale-105 
                         transition-all duration-300 
                         ${!comment.trim() || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!comment.trim() || isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;