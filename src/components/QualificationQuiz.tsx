import React, { useEffect, useRef, useState } from 'react';
import { submitQualification } from '../services/formService';
import { toast } from '@/components/ui/use-toast';
const QualificationQuiz = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    budget: '',
    timeline: '',
    committed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitQualification(formData);
      toast({
        title: "Qualification submitted!",
        description: "Thank you for taking the time to complete our qualification quiz. We'll be in touch soon."
      });
    } catch (error) {
      console.error('Error submitting qualification:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="qualify" className="bg-white py-16" ref={sectionRef}>
      <div className="section-container max-w-2xl">
        <div className={`animate-fade-in ${isVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Let's See If We're a Good Fit
          </h2>
          <p className="text-xl text-gray-600 text-center mb-10">
            Please answer a few questions about your project
          </p>

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="form-group">
              <label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
                Business Name
              </label>
              <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required className="form-input" placeholder="Your business name" />
            </div>

            <div className="form-group">
              <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">Type of Business</label>
              <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} required className="form-input">
                <option value="">Select business type</option>
                <option value="Residential Agent">Residential Agent</option>
                <option value="Commercial Agent">Commercial Agent</option>
                <option value="Property Management">Property Management</option>
                <option value="Real Estate Investing">Real Estate Investing</option>
                <option value="Real Estate Marketing">Real Estate Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
                Estimated Budget Range
              </label>
              <select id="budget" name="budget" value={formData.budget} onChange={handleChange} required className="form-input">
                <option value="">Select budget range</option>
                <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeline" className="block text-gray-700 font-medium mb-2">
                Timeline for Website Project
              </label>
              <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} required className="form-input">
                <option value="">Select timeline</option>
                <option value="ASAP (1-2 weeks)">ASAP (1-2 weeks)</option>
                <option value="Soon (3-4 weeks)">Soon (3-4 weeks)</option>
                <option value="Within 2 months">Within 2 months</option>
                <option value="Within 3-6 months">Within 3-6 months</option>
                <option value="Future planning">Future planning</option>
              </select>
            </div>

            <div className="form-group flex items-start">
              <div className="flex items-center h-5">
                <input type="checkbox" id="committed" name="committed" checked={formData.committed} onChange={handleChange} required className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="committed" className="font-medium text-gray-700">
                  Are you committed to investing in a strong online foundation?
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Qualification'}
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default QualificationQuiz;