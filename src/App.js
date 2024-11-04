import React from 'react';
import './App.scss';
import { Header, About, Services, Footer } from './scenes';
import { DashboardLayout, Error404, Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Signup } from './auth';
import DashboardOverview from './Dashboard';

function App() {
  return (
    <Router>
      <div className='app'>
        {/* Define the routes without Navbar for Login and Signup */}
        <Routes>
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/coming-soon" element={<Error404 />} />
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
          {/* Dashboard UI */}
          <Route element={<DashboardLayout/>}>
            <Route path='/Dashboard' element={<DashboardOverview/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
