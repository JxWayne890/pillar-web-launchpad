
import React, { useEffect, useRef, useState } from 'react';
import { submitQualification, saveQuizProgress } from '../services/formService';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, Mail } from 'lucide-react';

interface QualificationQuizProps {
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  isReturnVisit?: boolean;
  savedData?: {
    business_name?: string;
    business_type?: string;
    budget?: string;
    timeline?: string;
    committed?: boolean;
  };
}

const QualificationQuiz: React.FC<QualificationQuizProps> = ({ userData, isReturnVisit, savedData }) => {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    businessName: savedData?.business_name || '',
    businessType: savedData?.business_type || '',
    budget: savedData?.budget || '',
    timeline: savedData?.timeline || '',
    committed: savedData?.committed || false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
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

  // Update form data when userData or savedData changes
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      }));
    }
    
    if (savedData) {
      setFormData(prev => ({
        ...prev,
        businessName: savedData.business_name || prev.businessName,
        businessType: savedData.business_type || prev.businessType,
        budget: savedData.budget || prev.budget,
        timeline: savedData.timeline || prev.timeline,
        committed: savedData.committed || prev.committed
      }));
    }
  }, [userData, savedData]);

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
    
    // Auto-save progress when fields change
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    // Only save if we have the basic user info
    if (formData.firstName && formData.lastName && formData.email) {
      const timeoutId = setTimeout(async () => {
        try {
          // Only save if we have some business information
          if (
            formData.businessName || 
            formData.businessType || 
            formData.budget || 
            formData.timeline
          ) {
            const returnUrl = await saveQuizProgress({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              businessName: formData.businessName,
              businessType: formData.businessType,
              budget: formData.budget,
              timeline: formData.timeline,
              committed: formData.committed
            });
            
            console.log('Progress saved. Return URL:', returnUrl);
            
            // Store the return URL in local storage
            localStorage.setItem('quizReturnUrl', returnUrl);
          }
        } catch (error) {
          console.error('Error saving progress:', error);
        }
      }, 2000); // Save after 2 seconds of inactivity
      
      setSaveTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Combine the data to match the expected format
      const qualificationData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        budget: formData.budget,
        timeline: formData.timeline,
        committed: formData.committed,
        // Include the user info as well
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      };
      
      await submitQualification(qualificationData);
      toast({
        title: "Qualification submitted!",
        description: "Thank you for taking the time to complete our qualification quiz. We'll be in touch soon."
      });
      
      // Clear the saved return URL from local storage since the quiz is now complete
      localStorage.removeItem('quizReturnUrl');
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
          {!isReturnVisit && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
                Let's See If We're a Good Fit
              </h2>
              <p className="text-xl text-gray-600 text-center mb-10">
                Please answer a few questions about your project
              </p>
            </>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
            {/* Personal Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-navy-blue">Your Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
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
                      className="pl-10 border-gray-200 h-12 text-base" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
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
                      className="pl-10 border-gray-200 h-12 text-base" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
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
                    className="pl-10 border-gray-200 h-12 text-base" 
                  />
                </div>
              </div>
            </div>

            {/* Business Information Section */}
            <div className="form-group">
              <Label htmlFor="businessName" className="block text-gray-700 font-medium mb-2">
                Business Name
              </Label>
              <Input 
                type="text" 
                id="businessName" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                required 
                className="form-input h-12" 
                placeholder="Your business name" 
              />
            </div>

            <div className="form-group">
              <Label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">
                Type of Business
              </Label>
              <select 
                id="businessType" 
                name="businessType" 
                value={formData.businessType} 
                onChange={handleChange} 
                required 
                className="form-input h-12"
              >
                <option value="">Select business type</option>
                <option value="Licensed Real Estate Agent">Licensed Real Estate Agent</option>
                <option value="Real Estate Investor">Real Estate Investor</option>
                <option value="Skilled Trade">Skilled Trade</option>
                <option value="Local Service Business">Local Service Business</option>
                <option value="Professional Service">Professional Service</option>
                <option value="Restaurant/Food Service">Restaurant/Food Service</option>
                <option value="Retail">Retail</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Fitness/Wellness">Fitness/Wellness</option>
                <option value="Event Planning">Event Planning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <Label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
                Estimated Budget Range
              </Label>
              <select 
                id="budget" 
                name="budget" 
                value={formData.budget} 
                onChange={handleChange} 
                required 
                className="form-input h-12"
              >
                <option value="">Select budget range</option>
                <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
            </div>

            <div className="form-group">
              <Label htmlFor="timeline" className="block text-gray-700 font-medium mb-2">
                Timeline for Website Project
              </Label>
              <select 
                id="timeline" 
                name="timeline" 
                value={formData.timeline} 
                onChange={handleChange} 
                required 
                className="form-input h-12"
              >
                <option value="">Select timeline</option>
                <option value="ASAP (1-2 weeks)">ASAP (1-2 weeks)</option>
                <option value="Soon (3-4 weeks)">Soon (3-4 weeks)</option>
                <option value="Within 2 months">Within 2 months</option>
                <option value="Within 3-6 months">Within 3-6 months</option>
                <option value="Future planning">Future planning</option>
              </select>
            </div>

            <div className="form-group flex items-start mt-6">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="committed" 
                  name="committed" 
                  checked={formData.committed} 
                  onChange={handleChange} 
                  required 
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" 
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="committed" className="font-medium text-gray-700">
                  Are you committed to investing in a strong online foundation?
                </Label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full h-14 mt-8 text-lg font-semibold" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Qualification'}
            </button>
            
            {!isReturnVisit && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Don't worry, your progress is automatically saved.
                You can return and complete this form later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>;
};

export default QualificationQuiz;
