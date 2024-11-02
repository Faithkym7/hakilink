import React from 'react'
import './App.scss';
import { Header, About, Services , Footer} from './scenes';
import { Navbar } from './components';

function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <About/>
      <Services/>
      <Footer/>
    </div>
  );
}

export default App;
