import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AgentCrosshairs from './pages/AgentCrosshairs';
import ProPlayerCrosshairs from './pages/ProPlayerCrosshairs';
import CrosshairGenerator from './pages/CrosshairGenerator';
import AllCrosshairs from './pages/AllCrosshairs';
import About from './pages/About';

function App() {
  const location = useLocation();

  // Track page views
  // Uncomment when GA is set up
  // useEffect(() => {
  //   ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  // }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:agentName" element={<AgentCrosshairs />} />
          <Route path="/pro-players" element={<ProPlayerCrosshairs />} />
          <Route path="/generator" element={<CrosshairGenerator />} />
          <Route path="/all-crosshairs" element={<AllCrosshairs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;