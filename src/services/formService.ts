
interface RegistrationData {
  fullName: string;
  email: string;
}

interface QualificationData {
  businessName: string;
  businessType: string;
  budget: string;
  timeline: string;
  committed: boolean;
}

// In a real application, this would connect to a backend API
// For now, we'll simulate successful form submissions
export const submitRegistration = async (data: RegistrationData): Promise<void> => {
  // Log the form data to console (for demonstration purposes)
  console.log('Registration form submitted:', data);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const submitQualification = async (data: QualificationData): Promise<void> => {
  // Log the form data to console (for demonstration purposes)
  console.log('Qualification form submitted:', data);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
