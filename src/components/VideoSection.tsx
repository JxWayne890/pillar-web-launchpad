
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface VideoSectionProps {
  onStartQualification: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ onStartQualification }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Convert Google Drive sharing URLs to embed URLs
  const getEmbedUrl = (shareUrl: string) => {
    const fileId = shareUrl.match(/\/d\/(.+?)\//)![1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const video1Url = getEmbedUrl("https://drive.google.com/file/d/1an8eLFp1NyHAbAFVKsT_bUFY0GZcSux2/view?usp=sharing");
  const video2Url = getEmbedUrl("https://drive.google.com/file/d/1RPzxIqQPSmC12wQES7Qh99NcGIVjDqPw/view?usp=sharing");

  const portfolioItems = [
    {
      name: "Abilene Commercial",
      url: "https://abilenecommercial.com/",
      imageUrl: "https://picsum.photos/id/3/800/450",
      description: "Commercial services website"
    },
    {
      name: "Master Clean HQ",
      url: "https://mastercleanhq.com",
      imageUrl: "https://picsum.photos/id/20/800/450",
      description: "Professional cleaning services"
    },
    {
      name: "Adams Plumbing Texas",
      url: "https://adamsplumbingtexas.com/",
      imageUrl: "https://picsum.photos/id/60/800/450",
      description: "Plumbing services in Texas"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="videos" className="bg-white py-16" ref={sectionRef}>
      <div className="section-container">
        <div className={`animate-fade-in ${isVisible ? 'active' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            See Our Process
          </h2>
          
          <div className="video-container">
            <iframe
              src={video1Url}
              width="100%"
              height="450"
              allow="autoplay"
              allowFullScreen
              className="border-0"
            ></iframe>
          </div>
          
          <div className="video-container">
            <iframe
              src={video2Url}
              width="100%"
              height="450"
              allow="autoplay"
              allowFullScreen
              className="border-0"
            ></iframe>
          </div>
          
          {/* Portfolio Showcase Section */}
          <div className="mt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Our Recent Website Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="portfolio-item bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy-blue/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Visit Website</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-navy-blue">{item.name}</h3>
                      <p className="text-steel-gray">{item.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <Button 
              onClick={onStartQualification}
              className="btn-primary text-lg py-4 px-8"
            >
              Like What You See? Let's Schedule a Call!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
