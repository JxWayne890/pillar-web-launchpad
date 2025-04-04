
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToVideos = () => {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-100 z-0"></div>
      <div className="absolute inset-0 opacity-10 bg-grid-pattern z-0"></div>
      
      <div className="section-container flex flex-col items-center text-center relative z-10">
        <div className="animate-fade-in max-w-4xl">
          <div className="mb-8">
            <div className="inline-block rounded-full bg-blue-100/80 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Pillar Web Designs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Building Online <span className="text-primary">Foundations</span> That Last
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how we craft high-quality, custom websites designed to stand the test of time.
            </p>
          </div>
          
          <Button
            onClick={scrollToVideos}
            size="lg"
            className="group flex items-center gap-2 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Watch Our Videos
            <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
