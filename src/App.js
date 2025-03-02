import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RiceCalculator from "./components/RiceCalculator";
import Procedure from "./components/Procedure";
import SushiFacts from "./components/SushiFacts";
import VideoTutorial from "./components/VideoTutorial";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";

import { useEffect } from 'react';
import { initializeFeedbackStats } from './services/feedbackService';
import { initializeFactsIfEmpty } from './services/factService';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0); 
    initializeFeedbackStats();
    initializeFactsIfEmpty();    
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <RiceCalculator />
      <Procedure />
      <VideoTutorial />
      <SushiFacts />
      <Feedback />
      <Footer />
    </>
  );
}

export default App;
