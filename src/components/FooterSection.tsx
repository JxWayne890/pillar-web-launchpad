
import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 py-12">
      <div className="section-container">
        <div className="text-center">
          <p className="text-steel-gray font-medium">
            © {new Date().getFullYear()} Pillar Web Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
