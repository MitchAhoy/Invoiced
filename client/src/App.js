import React, { useEffect, useContext } from 'react';
import { TestTextProvider } from './contexts/test.context'
import Navbar from './components/Navbar'



const App = () => {

  return (
    <div className="App">
      <Navbar />
      
    </div>
  );
}

export default App;
