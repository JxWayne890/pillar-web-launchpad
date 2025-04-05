
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import QualificationQuiz from '@/components/QualificationQuiz';
import FooterSection from '@/components/FooterSection';
import { triggerReturnUserWebhook } from '../services/formService';
import { toast } from '@/components/ui/use-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const ReturnUser = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
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
    
    // Notify about the return user visit
    const notifyReturn = async () => {
      try {
        if (userId && firstName && lastName && email) {
          await triggerReturnUserWebhook({
            userId,
            firstName: decodeURIComponent(firstName),
            lastName: decodeURIComponent(lastName),
            email: decodeURIComponent(email)
          });
        }
      } catch (error) {
        console.error('Failed to notify about return visit:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    notifyReturn();
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
              We're glad you've returned. Please complete the qualification form below so we can better understand your needs.
            </p>
          </div>
        </div>
        
        <div className="relative z-10">
          <QualificationQuiz userData={userData} isReturnVisit={true} />
        </div>
        
        <FooterSection />
      </div>
    </div>
  );
};

export default ReturnUser;
