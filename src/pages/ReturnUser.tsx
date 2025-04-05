
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import QualificationQuiz from '@/components/QualificationQuiz';
import FooterSection from '@/components/FooterSection';
import { triggerReturnUserWebhook, fetchQuizProgress } from '../services/formService';
import { toast } from '@/components/ui/use-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

interface SavedData {
  business_name?: string;
  business_type?: string;
  budget?: string;
  timeline?: string;
  committed?: boolean;
}

const ReturnUser = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [savedData, setSavedData] = useState<SavedData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    const email = searchParams.get('email') || '';
    
    // Set the user data from URL parameters
    if (firstName && lastName && email) {
      setUserData({
        firstName: decodeURIComponent(firstName),
        lastName: decodeURIComponent(lastName),
        email: decodeURIComponent(email)
      });
    }
    
    // Fetch saved quiz data and notify about the return user visit
    const fetchSavedDataAndNotify = async () => {
      try {
        if (userId) {
          // Fetch saved data from Supabase
          const savedQuizData = await fetchQuizProgress(userId);
          
          if (savedQuizData) {
            setSavedData({
              business_name: savedQuizData.business_name,
              business_type: savedQuizData.business_type,
              budget: savedQuizData.budget,
              timeline: savedQuizData.timeline,
              committed: savedQuizData.committed
            });
            
            // Update userData if not already set from URL params
            if (!firstName || !lastName || !email) {
              setUserData({
                firstName: savedQuizData.first_name,
                lastName: savedQuizData.last_name,
                email: savedQuizData.email
              });
            }
          }
          
          // Trigger return user webhook
          if (firstName && lastName && email) {
            await triggerReturnUserWebhook({
              userId,
              firstName: decodeURIComponent(firstName),
              lastName: decodeURIComponent(lastName),
              email: decodeURIComponent(email)
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch saved data or notify about return visit:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedDataAndNotify();
  }, [userId, searchParams]);

  if (isLoading && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pillar-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="relative">
        <div className="w-full h-64 bg-gradient-to-r from-navy-blue to-pillar-blue flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome Back, {userData?.firstName || 'there'}!
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              We're glad you've returned. You can continue where you left off.
            </p>
          </div>
        </div>
        
        <div className="relative z-10">
          <QualificationQuiz 
            userData={userData} 
            isReturnVisit={true}
            savedData={savedData}
          />
        </div>
        
        <FooterSection />
      </div>
    </div>
  );
};

export default ReturnUser;
