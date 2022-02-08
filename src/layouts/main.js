
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import ScrollToTop from "react-scroll-to-top";

import Header from '../components/header/header';
import Home from '../components/home/home';
import Music from '../components/music/music';
import Merce from '../components/merce/merce';
import Video from '../components/video/video';
import Footer from '../components/footer/footer';


function Main() {

  return (    
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/Music" element={<Music/>}/>
          <Route path="/merce" element={<Merce/>}/>
          <Route path="/Video" element={<Video/>}/>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>

  );
}


export default Main;