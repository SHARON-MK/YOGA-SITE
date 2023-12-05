import React, { useState } from 'react';
import ChatComponent from '../../components/user/ChatComponent';
import HomeNavbar from '../../components/user/HomeNavbar';
import LandingPage from '../../components/user/LandingPage';
import PointsArea from '../../components/user/PointsArea';
import SenondPointArea from '../../components/user/SenondPointArea';
import Testimonial from '../../components/user/Testimonial';
import FooterMain from '../../components/user/FooterMain';

function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <div className="home-container">
        <HomeNavbar />
        <LandingPage />
        <PointsArea />
        <SenondPointArea />
        <Testimonial />
        <FooterMain />
      </div>

      {/* Chat component */}
      {showChat && <ChatComponent />}

      {/* FontAwesome Chat icon */}
      <div
        className={`chat-icon ${showChat ? 'open' : ''}`}
        onClick={() => setShowChat(!showChat)}
      >
        <i className="fas fa-comments"></i>
      </div>
    </div>
  );
}

export default Home;

