import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-blue px-4 py-8 text-center border-t-2 border-medium-grey">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-light-grey text-sm mb-4">
          &copy; {new Date().getFullYear()} ImagiNation AI. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="#" className="text-light-grey hover:text-neon-pink">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-light-grey hover:text-neon-pink">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="text-light-grey hover:text-neon-pink">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
