import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [comment, setComment] = useState("");
  const [stats, setStats] = useState({ likes: 0, dislikes: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedFeedback = localStorage.getItem("userFeedback");
    if (savedFeedback) {
      setSelectedFeedback(savedFeedback);
    }

    setStats({
      likes: parseInt(localStorage.getItem("totalLikes") || "45"),
      dislikes: parseInt(localStorage.getItem("totalDislikes") || "12")
    });
  }, []);

  const handleFeedbackSelection = (type) => {
    if (selectedFeedback === type) return;

    setIsAnimating(true);
    setSelectedFeedback(type);
    localStorage.setItem("userFeedback", type);

    const newStats = { ...stats };
    if (selectedFeedback) {
      newStats[`${selectedFeedback}s`]--;
    }
    newStats[`${type}s`]++;
    setStats(newStats);

    localStorage.setItem("totalLikes", newStats.likes.toString());
    localStorage.setItem("totalDislikes", newStats.dislikes.toString());

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    console.log("Comentario enviado:", comment);
    setComment("");
  };

  return (
    <section className="relative bg-sectionDarkPurple min-h-[300px] p-12 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white transform -rotate-45" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white transform rotate-45" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-heading text-white mb-8">
            Did this help you?
          </h2>

          <div className="flex justify-center gap-12 mb-6">
            <button
              onClick={() => handleFeedbackSelection("like")}
              className={`group flex flex-col items-center transition-all duration-300
                         ${selectedFeedback === "like" ? "scale-110" : "hover:scale-105"}`}
            >
              <ThumbsUp
                size={32}
                className={`transition-all duration-300
                          ${selectedFeedback === "like"
                    ? "text-white"
                    : "text-white/60 group-hover:text-white"}`}
              />
              <span className="text-white/80 mt-2">{stats.likes}</span>
            </button>

            <button
              onClick={() => handleFeedbackSelection("dislike")}
              className={`group flex flex-col items-center transition-all duration-300
                         ${selectedFeedback === "dislike" ? "scale-110" : "hover:scale-105"}`}
            >
              <ThumbsDown
                size={32}
                className={`transition-all duration-300
                          ${selectedFeedback === "dislike"
                    ? "text-white"
                    : "text-white/60 group-hover:text-white"}`}
              />
              <span className="text-white/80 mt-2">{stats.dislikes}</span>
            </button>
          </div>
        </div>

        {selectedFeedback && (
          <div className={`transform transition-all duration-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
            <h3 className="text-2xl font-heading text-white mb-4">
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
                  className="w-full p-4 pr-12 bg-white/10 backdrop-blur-sm rounded-lg 
                           border border-white/20 text-white placeholder-white/50
                           font-body focus:outline-none focus:ring-2 focus:ring-white/30
                           transition-all duration-300 resize-none h-32"
                />
                <div className="absolute bottom-4 right-4 text-white/50 text-sm">
                  {comment.length}/500
                </div>
              </div>

              <button
                type="submit"
                className="bg-white text-sectionDarkPurple px-8 py-3 rounded-lg
                         font-body font-bold transform hover:scale-105 
                         transition-all duration-300 disabled:opacity-50
                         disabled:cursor-not-allowed"
                disabled={!comment.trim()}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;