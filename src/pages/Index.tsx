
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import RegistrationForm from '@/components/RegistrationForm';
import QualificationQuiz from '@/components/QualificationQuiz';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  useEffect(() => {
    // Add intersection observer to animate elements as they come into view
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
    
    // Scroll to videos section after registration
    setTimeout(() => {
      const videosSection = document.getElementById('videos');
      if (videosSection) {
        videosSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const handleQualificationStart = () => {
    setShowQuiz(true);
    
    // Scroll to quiz section after a short delay
    setTimeout(() => {
      const quizSection = document.getElementById('qualify');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <RegistrationForm onRegistrationComplete={handleRegistrationComplete} />
      {isRegistered && <VideoSection onStartQualification={handleQualificationStart} />}
      {showQuiz && <QualificationQuiz />}
      <FooterSection />
    </div>
  );
};

export default Index;
