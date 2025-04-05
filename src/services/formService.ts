
interface RegistrationData {
  fullName: string;
  email: string;
}

interface QualificationData {
  firstName?: string;
  lastName?: string;
  email?: string;
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
  
  // Trigger the webhook
  await triggerQualificationWebhook(data);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// Function to trigger the qualification webhook
const triggerQualificationWebhook = async (data: QualificationData): Promise<void> => {
  const webhookUrl = 'https://n8n-1-yvtq.onrender.com/webhook-test/f6e9846c-5686-41c2-ab2e-390a1dbf9d2d';
  
  try {
    console.log('Attempting to trigger qualification webhook at:', webhookUrl);
    
    // Create URL params for GET request
    const params = new URLSearchParams({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      businessName: data.businessName,
      businessType: data.businessType,
      budget: data.budget,
      timeline: data.timeline,
      committed: data.committed.toString(),
      timestamp: new Date().toISOString(),
      source: window.location.href
    });
    
    const getUrl = `${webhookUrl}?${params.toString()}`;
    console.log('Webhook GET URL:', getUrl);
    
    // Primary method: Attempt fetch with GET
    try {
      const response = await fetch(getUrl);
      console.log('Webhook response status:', response.status);
      console.log('Webhook triggered successfully');
      return;
    } catch (fetchError) {
      console.error('Error triggering webhook:', fetchError);
      
      // Fallback method: Try to create an image beacon as a last resort
      console.log('Attempting final fallback with Image beacon');
      const img = new Image();
      img.src = getUrl;
      img.onload = () => console.log('Image beacon triggered');
      img.onerror = () => console.log('Image beacon triggered');
      console.log('Webhook triggered successfully');
    }
  } catch (error) {
    console.error('Failed to trigger qualification webhook:', error);
  }
};
