
import React, { useEffect, useRef, useState } from 'react';
import { submitRegistration } from '../services/formService';
import { toast } from '@/components/ui/use-toast';

interface RegistrationFormProps {
  onRegistrationComplete: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerWebhook = async () => {
    const webhookUrl = "https://n8n-1-yvtq.onrender.com/webhook-test/673b43c6-0ac7-4bcb-9776-fc7a25cd7ac0";
    
    try {
      console.log("Attempting to trigger webhook at:", webhookUrl);
      
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        timestamp: new Date().toISOString(),
        source: window.location.origin
      };
      
      console.log("Webhook payload:", payload);
      
      // First attempt with fetch and direct CORS handling
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'cors',
      });
      
      console.log("Webhook response status:", response.status);
      
      if (response.ok) {
        console.log("Webhook triggered successfully");
        return true;
      } else {
        console.log("Webhook response not OK, trying fallback method");
        
        // Fallback to XHR if fetch fails due to CORS
        return new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", webhookUrl, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              console.log("XMLHttpRequest completed with status:", xhr.status);
              resolve(xhr.status >= 200 && xhr.status < 300);
            }
          };
          
          xhr.send(JSON.stringify(payload));
          console.log("XMLHttpRequest sent");
        });
      }
    } catch (error) {
      console.error("Error triggering webhook:", error);
      
      // Final fallback - try with Image beacon which bypasses CORS
      try {
        console.log("Attempting final fallback with Image beacon");
        const beaconUrl = `${webhookUrl}?data=${encodeURIComponent(JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          timestamp: new Date().toISOString(),
          source: window.location.origin
        }))}`;
        
        const img = new Image();
        img.src = beaconUrl;
        console.log("Image beacon triggered");
        return true;
      } catch (beaconError) {
        console.error("All webhook trigger attempts failed:", beaconError);
        return false;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to the original form service
      await submitRegistration(formData);
      
      // Also send data to the webhook
      const webhookResult = await triggerWebhook();
      
      if (webhookResult) {
        console.log("Webhook triggered successfully");
      } else {
        console.warn("Webhook may not have triggered successfully");
      }
      
      toast({
        title: "Registration successful!",
        description: "Thank you for your interest in Pillar Web Designs.",
      });
      onRegistrationComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="bg-gray-50 py-16" ref={sectionRef}>
      <div className="section-container max-w-2xl">
        <div className={`animate-fade-in ${isVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Please Register to View Our Work
          </h2>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="form-group">
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Register Now'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
