import React from 'react';
import LandingPage from '../../components/user/LandingPage';
import HomeNavbar from '../../components/user/HomeNavbar';
import PointsArea from '../../components/user/PointsArea';
import SenondPointArea from '../../components/user/SenondPointArea';
import Testimonial from '../../components/user/Testimonial';
import FooterMain from '../../components/user/FooterMain';

function Home() {
  
  return (
   
    <div >

       <HomeNavbar/>
       <LandingPage/>
       <PointsArea/>
       <SenondPointArea/>
       <Testimonial/>
       <FooterMain/>
     
    </div>
  );
}

export default Home;
