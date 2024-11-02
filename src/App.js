import React from 'react';
import './App.scss';
import { Header, About, Services, Footer } from './scenes';
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Signup } from './auth';

function App() {
  return (
    <Router>
      <div className='app'>
        {/* Define the routes without Navbar for Login and Signup */}
        <Routes>
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          {/* Main application route with Navbar */}
          <Route 
            path="/*" 
            element={
              <>
                <Navbar />
                <Header />
                <About />
                <Services />
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
