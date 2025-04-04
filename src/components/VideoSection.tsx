
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
          
          <div className="flex justify-center mt-12">
            <Button 
              onClick={onStartQualification}
              className="btn-primary"
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
