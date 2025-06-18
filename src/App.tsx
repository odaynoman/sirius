import React, { useEffect, useState } from 'react';
import { Linkedin, Instagram, Sparkles } from 'lucide-react';
import logo from '../assets/img/logo.svg'; 
 
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => { 
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      // Calculate distances for floating effect (reduced strength)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const maxDistance = Math.min(window.innerWidth, window.innerHeight) / 2;

      // Logo movement (very subtle)
      const logoDistanceX = (clientX - centerX) / maxDistance;
      const logoDistanceY = (clientY - centerY) / maxDistance;
      setLogoPosition({
        x: logoDistanceX * 10, // max 10px movement
        y: logoDistanceY * 10
      });

      // Text movement (make it more subtle)
      const textDistanceX = (clientX - centerX) / maxDistance;
      const textDistanceY = (clientY - centerY) / maxDistance;
      setTextPosition({
        x: textDistanceX * 8, // reduced from 15 to 8
        y: textDistanceY * 8
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(211, 211, 211, 0.08), transparent 40%)`,
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#1C2626', color: '#D3D3D3' }}>
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={gradientStyle}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] opacity-10" />
        
        <div 
          className="flex flex-col items-center justify-center transition-transform duration-300 ease-out"
          style={{ 
            marginTop: '-20vh',
            transform: `translate(${logoPosition.x}px, ${logoPosition.y}px)`
          }}
        >
          <img 
            src={logo} 
            alt="Logo"
            className="mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-none object-contain"
          />
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl max-w-xl sm:max-w-2xl mx-auto px-4"
            style={{ 
              color: '#D3D3D3',
              marginTop: '-85px', 
              transform: `translate(${textPosition.x}px, ${textPosition.y}px)`
            }}
          >
            under creativity
          </h2>
        </div>

        <footer className="absolute bottom-0 w-full py-8">
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.linkedin.com/company/siriusi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:opacity-75 hover:scale-110 duration-300"
              style={{ color: '#D3D3D3' }}
            >
              <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
            <a
              href="https://instagram.com/siriusi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:opacity-75 hover:scale-110 duration-300"
              style={{ color: '#D3D3D3' }}
            >
              <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
