import React from 'react';
import './Home.css';
import SideImage from '../assets/sideimage.png'; 
import Signs  from './Signs';

const Home = () => {
  return (
    <div className='back'>
    
    <div className="hero-section">
      <div className="hero-container">
   
        <div className="hero-image">
          <img src={SideImage} alt="Hero" />
        </div>

   
        <div className="hero-content">
          <h1>SignSetu Demo</h1>
          
          
        </div>
      </div>

     
      <svg className="hero-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
        <path
          fill="#ffffff"
          d="M0,160 C480,280 960,40 1440,160 L1440,320 L0,320 Z"
        ></path>
      </svg>
    </div>
        <Signs></Signs>

    </div>
  );
};

export default Home;