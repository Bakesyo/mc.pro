import React from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Mail, Twitter, Github, List } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Crosshair className="h-6 w-6 text-red-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">marvelcrosshair.pro</span>
            </div>
            <p className="text-sm">
              The ultimate resource for Marvel Rivals crosshair settings. Optimize your aim with our comprehensive database of crosshair configurations.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/generator" className="hover:text-white transition-colors">Crosshair Generator</Link></li>
              <li><Link to="/all-crosshairs" className="hover:text-white transition-colors">All Crosshair Codes</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Characters</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/character/iron-man" className="hover:text-white transition-colors">Iron Man</Link></li>
              <li><Link to="/character/spider-man" className="hover:text-white transition-colors">Spider-Man</Link></li>
              <li><Link to="/character/hulk" className="hover:text-white transition-colors">Hulk</Link></li>
              <li><Link to="/character/black-panther" className="hover:text-white transition-colors">Black Panther</Link></li>
              <li><Link to="/character/more" className="hover:text-white transition-colors">View All Characters</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm">Subscribe to our newsletter for the latest updates on crosshair settings and game configurations.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} marvelcrosshair.pro. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;