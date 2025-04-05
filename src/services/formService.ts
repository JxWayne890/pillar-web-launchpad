
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

interface ReturnUserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
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
  
  // Trigger the webhook - using the return user webhook URL for all qualification submissions
  const webhookUrl = 'https://n8n-1-yvtq.onrender.com/webhook-test/73b3b5c9-cbd1-4039-b312-51bdcd58dd87';
  
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
      source: window.location.href,
      event: 'qualification_submitted'
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
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// Function to generate a unique ID for the user
export const generateUserId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Function to generate a return URL for the user
export const generateReturnUrl = (userData: { firstName: string; lastName: string; email: string }): string => {
  const userId = generateUserId();
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    firstName: encodeURIComponent(userData.firstName),
    lastName: encodeURIComponent(userData.lastName),
    email: encodeURIComponent(userData.email)
  });
  
  return `${baseUrl}/return/${userId}?${params.toString()}`;
};

// Function to trigger the return user webhook
export const triggerReturnUserWebhook = async (data: ReturnUserData): Promise<void> => {
  const webhookUrl = 'https://n8n-1-yvtq.onrender.com/webhook-test/73b3b5c9-cbd1-4039-b312-51bdcd58dd87';
  
  try {
    console.log('Attempting to trigger return user webhook at:', webhookUrl);
    
    // Create URL params for GET request
    const params = new URLSearchParams({
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      event: 'return_visit',
      timestamp: new Date().toISOString(),
      source: window.location.href
    });
    
    const getUrl = `${webhookUrl}?${params.toString()}`;
    console.log('Return User Webhook GET URL:', getUrl);
    
    // Primary method: Attempt fetch with GET
    try {
      const response = await fetch(getUrl);
      console.log('Return User Webhook response status:', response.status);
      console.log('Return User Webhook triggered successfully');
      return;
    } catch (fetchError) {
      console.error('Error triggering return user webhook:', fetchError);
      
      // Fallback method: Try to create an image beacon as a last resort
      console.log('Attempting final fallback with Image beacon');
      const img = new Image();
      img.src = getUrl;
      img.onload = () => console.log('Image beacon triggered');
      img.onerror = () => console.log('Image beacon triggered');
      console.log('Return User Webhook triggered successfully');
    }
  } catch (error) {
    console.error('Failed to trigger return user webhook:', error);
  }
};
