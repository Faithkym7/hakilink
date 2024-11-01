import React from 'react'
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Header, About } from './scenes';

function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <About/>
    </div>
  );
}

export default App;
