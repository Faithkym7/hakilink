import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Header, About, Services } from './scenes';

function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <About/>
      <Services/>
    </div>
  );
}

export default App;
