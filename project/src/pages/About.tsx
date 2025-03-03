import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crosshair, Shield, Users, Mail } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | marvelcrosshair.pro</title>
        <meta 
          name="description" 
          content="Learn about marvelcrosshair.pro, the ultimate resource for optimizing your aim in Marvel Rivals. Discover our mission and the team behind the site."
        />
        <link rel="canonical" href="https://marvelcrosshair.pro/about" />
      </Helmet>

      <div className="container mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">About marvelcrosshair.pro</h1>
          
          <div className="bg-slate-800 rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              marvelcrosshair.pro was created with a simple mission: to help players optimize their aim and improve their gameplay experience in Marvel Rivals. We believe that finding the perfect crosshair settings can significantly enhance your performance and enjoyment of the game.
            </p>
            <p className="text-gray-300">
              Our comprehensive database of character-specific crosshairs, pro player settings, and our interactive generator tool are designed to give you everything you need to find or create the perfect crosshair for your playstyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Crosshair className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Extensive Database</h3>
              <p className="text-gray-300">
                Our database includes hundreds of crosshair configurations optimized for every character in Marvel Rivals, with new additions regularly.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Character Optimization</h3>
              <p className="text-gray-300">
                We analyze each character's abilities and playstyle to recommend crosshairs that complement their unique characteristics.
              </p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pro Insights</h3>
              <p className="text-gray-300">
                Learn from the best with our collection of verified pro player settings, updated after major tournaments and competitions.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">How to Use Our Site</h2>
            <ol className="space-y-4 text-gray-300">
              <li className="flex">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <div>
                  <p><strong>Browse Character Crosshairs:</strong> Find optimized crosshairs for your favorite Marvel Rivals characters.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <div>
                  <p><strong>Explore Pro Settings:</strong> Discover what settings the professionals use to dominate in competitive play.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <div>
                  <p><strong>Create Your Own:</strong> Use our interactive generator to customize every aspect of your crosshair.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                <div>
                  <p><strong>Copy & Import:</strong> Copy your chosen crosshair code and import it directly into Marvel Rivals.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                <div>
                  <p><strong>Share & Vote:</strong> Share your favorite crosshairs and vote for the ones you find most effective.</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              Have suggestions, feedback, or want to contribute to our database? We'd love to hear from you!
            </p>
            <div className="flex items-center text-blue-400 hover:text-blue-300">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:contact@marvelcrosshair.pro">contact@marvelcrosshair.pro</a>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              marvelcrosshair.pro is a fan-made website and is not affiliated with Marvel, NetEase, or any official Marvel Rivals entities.
            </p>
            <p>
              All character names, game content, and related imagery are trademarks and copyrights of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;