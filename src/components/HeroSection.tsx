
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToRegistration = () => {
    // First scroll to registration form since it needs to be filled out before videos are shown
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden pt-12">
      {/* Modern background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 z-0"></div>
      <div className="absolute inset-0 opacity-10 bg-grid-pattern z-0"></div>
      
      <div className="section-container flex flex-col items-center text-center relative z-10 pt-0 md:pt-0">
        <div className="animate-fade-in max-w-4xl mt-[-5vh] md:mt-[-8vh]">
          <div className="mb-6 md:mb-8">
            <div className="inline-block rounded-full bg-navy-blue/10 px-4 py-1.5 text-sm font-medium text-navy-blue mb-4">
              Pillar Web Designs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-navy-blue via-pillar-blue to-navy-blue bg-clip-text text-transparent mb-4 md:mb-6 leading-tight tracking-tight">
              Building Online <span className="text-pillar-blue">Foundations</span> That Last
            </h1>
            <p className="text-xl md:text-2xl text-steel-gray max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed">
              Discover how we craft high-quality, custom websites designed to stand the test of time.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={scrollToRegistration}
              size="lg"
              className="bg-gradient-to-r from-navy-blue via-navy-blue to-pillar-blue hover:from-pillar-blue hover:to-navy-blue text-white font-bold group flex items-center gap-2 px-10 py-7 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              View Our Craftsmanship
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Modern decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-pillar-blue" />
      </div>
    </section>
  );
};

export default HeroSection;
