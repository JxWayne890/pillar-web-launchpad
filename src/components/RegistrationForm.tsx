
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitRegistration(formData);
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
