
import React, { useEffect, useRef, useState } from 'react';
import { submitRegistration } from '../services/formService';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserRound, Mail } from 'lucide-react';

interface RegistrationFormProps {
  onRegistrationComplete: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    const baseWebhookUrl = "https://n8n-1-yvtq.onrender.com/webhook-test/673b43c6-0ac7-4bcb-9776-fc7a25cd7ac0";
    
    try {
      console.log("Attempting to trigger webhook at:", baseWebhookUrl);
      
      // Build query parameters for GET request
      const params = new URLSearchParams({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        timestamp: new Date().toISOString(),
        source: window.location.origin
      });
      
      const webhookUrl = `${baseWebhookUrl}?${params.toString()}`;
      console.log("Webhook GET URL:", webhookUrl);
      
      // Make a GET request
      const response = await fetch(webhookUrl, {
        method: 'GET',
        mode: 'cors',
      });
      
      console.log("Webhook response status:", response.status);
      
      if (response.ok) {
        console.log("Webhook triggered successfully");
        return true;
      } else {
        console.log("Webhook response not OK, trying fallback method");
        
        // Fallback to XHR
        return new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", webhookUrl, true);
          
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              console.log("XMLHttpRequest completed with status:", xhr.status);
              resolve(xhr.status >= 200 && xhr.status < 300);
            }
          };
          
          xhr.send();
          console.log("XMLHttpRequest sent");
        });
      }
    } catch (error) {
      console.error("Error triggering webhook:", error);
      
      // Final fallback - try with Image beacon
      try {
        console.log("Attempting final fallback with Image beacon");
        
        const params = new URLSearchParams({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          timestamp: new Date().toISOString(),
          source: window.location.origin
        });
        
        const beaconUrl = `${baseWebhookUrl}?${params.toString()}`;
        
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
      // Combine first and last name for the original form service
      const combinedData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      };
      
      // Send data to the original form service
      await submitRegistration(combinedData);
      
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
    <section id="register" className="py-16 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className={`max-w-md mx-auto px-4 md:px-0 animate-fade-in ${isVisible ? 'active' : ''}`}>
        <div className="text-center mb-8">
          <div className="inline-block rounded-full bg-pillar-blue/10 px-4 py-1.5 text-sm font-medium text-pillar-blue mb-3">
            Register Now
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-navy-blue to-pillar-blue bg-clip-text text-transparent">
            See Our Portfolio
          </h2>
          <p className="text-steel-gray text-lg">
            Register to view our premium website designs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="firstName" className="text-navy-blue font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10 border-gray-200 h-12 rounded-lg focus:border-pillar-blue focus:ring-pillar-blue"
                    placeholder="John"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <Label htmlFor="lastName" className="text-navy-blue font-medium">
                  Last Name
                </Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10 border-gray-200 h-12 rounded-lg focus:border-pillar-blue focus:ring-pillar-blue"
                    placeholder="Smith"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy-blue font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 border-gray-200 h-12 rounded-lg focus:border-pillar-blue focus:ring-pillar-blue"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-navy-blue to-pillar-blue hover:from-pillar-blue hover:to-navy-blue text-white font-bold py-3 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'View Our Work'}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
