
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 py-12">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <div className="w-full mb-6">
            <Separator className="bg-steel-gray/20" />
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between items-center w-full">
            <p className="text-steel-gray font-medium">
              © {new Date().getFullYear()} Pillar Web Designs. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <Link to="/privacy-policy" className="text-steel-gray hover:text-navy-blue transition-colors duration-200">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
