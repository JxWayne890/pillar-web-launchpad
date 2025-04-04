
import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToVideos = () => {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
      <div className="section-container flex flex-col items-center text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Building Online Foundations That Last
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Discover how we craft high-quality, custom websites designed to stand the test of time.
          </p>
          <button
            onClick={scrollToVideos}
            className="btn-primary group flex items-center gap-2"
          >
            Watch Our Videos
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
