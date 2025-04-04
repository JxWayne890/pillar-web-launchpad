
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import FooterSection from '@/components/FooterSection';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="section-container max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl mb-6">Privacy Policy</h1>
        <Separator className="mb-8" />
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-steel-gray mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl mb-4 font-bold text-navy-blue">Introduction</h2>
            <p className="mb-4">
              Pillar Web Designs ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="mb-4">
              This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl mb-4 font-bold text-navy-blue">Information We Collect</h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our products and services, when you participate in activities on our website, or otherwise when you contact us.
            </p>
            <p className="mb-4">
              The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Personal identifiers (like name, address, phone number, email)</li>
              <li className="mb-2">Account information (username, password)</li>
              <li className="mb-2">Business information (company name, job title)</li>
              <li className="mb-2">Payment information (credit card details, billing address)</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl mb-4 font-bold text-navy-blue">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Provide, operate, and maintain our website</li>
              <li className="mb-2">Improve, personalize, and expand our website</li>
              <li className="mb-2">Understand and analyze how you use our website</li>
              <li className="mb-2">Develop new products, services, features, and functionality</li>
              <li className="mb-2">Communicate with you about our services</li>
              <li className="mb-2">Send you emails regarding updates or important information</li>
              <li className="mb-2">Find and prevent fraud</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl mb-4 font-bold text-navy-blue">Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about our privacy policy or data practices, please contact us at:
            </p>
            <p className="mb-4">
              Pillar Web Designs<br />
              Email: privacy@pillarwebdesigns.com<br />
              Phone: (555) 123-4567
            </p>
          </section>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
