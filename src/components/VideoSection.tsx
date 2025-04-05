
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileVideo, Code } from 'lucide-react';

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
      name: "Adams Plumbing Texas",
      url: "https://adamsplumbingtexas.com/",
      imageUrl: "/lovable-uploads/508af3b1-6c6a-4b4d-b09f-546c17f9d359.png",
      description: "Plumbing services in Texas"
    },
    {
      name: "Master Clean HQ",
      url: "https://mastercleanhq.com",
      imageUrl: "/lovable-uploads/2eb67e5d-1d4e-4f9d-9528-1adc05fb94a1.png",
      description: "Professional cleaning services"
    },
    {
      name: "Abilene Commercial",
      url: "https://abilenecommercial.com/",
      imageUrl: "/lovable-uploads/3d5aebeb-d5c2-442e-b806-dbc4786385a8.png",
      description: "Commercial real estate"
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
          
          {/* First Video with Description */}
          <div className="mb-16">
            <div className="video-description mb-6 max-w-3xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="bg-navy-blue/10 p-3 rounded-full">
                  <FileVideo className="h-6 w-6 text-navy-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy-blue mb-2">Custom Website Development</h3>
                  <p className="text-steel-gray text-lg leading-relaxed">
                    In this video, I'm showcasing a website I created for a real estate agent. It features a custom blog creator and uploader directly in the website, 
                    along with security measures to protect against unauthorized blog creation. Most importantly, it includes a custom web scraper that allows the 
                    agent to bypass IDX payments while still streaming MLS listings on his website.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="video-container">
              <iframe
                src={video1Url}
                width="100%"
                height="450"
                allow="autoplay"
                allowFullScreen
                className="border-0 rounded-xl shadow-xl"
              ></iframe>
            </div>
          </div>
          
          {/* Second Video with Description */}
          <div className="mb-16">
            <div className="video-description mb-6 max-w-3xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="bg-navy-blue/10 p-3 rounded-full">
                  <Code className="h-6 w-6 text-navy-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy-blue mb-2">IDX Webscraper Showcase</h3>
                  <p className="text-steel-gray text-lg leading-relaxed">
                    This video provides an in-depth showcase of the IDX Webscraper I built using n8n. This innovative solution helped my client, 
                    a real estate agent, save significant money by eliminating expensive IDX subscription fees while still displaying property listings 
                    on his website.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="video-container">
              <iframe
                src={video2Url}
                width="100%"
                height="450"
                allow="autoplay"
                allowFullScreen
                className="border-0 rounded-xl shadow-xl"
              ></iframe>
            </div>
          </div>
          
          {/* Portfolio Showcase Section - Smaller Size */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-6">
              Our Recent Website Projects
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {portfolioItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group w-full sm:w-1/3 md:w-1/4 max-w-[220px]"
                >
                  <div className="portfolio-item bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-navy-blue/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">Visit Site</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-bold mb-1 text-navy-blue truncate">{item.name}</h4>
                      <p className="text-steel-gray text-xs">{item.description}</p>
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
