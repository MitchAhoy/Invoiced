import React, { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

const App = () => {

  const getTest = async () => {
    const res = await fetch('/test')
    const data = await res.json()
  
    // return data.test
    console.log(data)
  }

  // useEffect(() => {
  //   const paragraph = getTest()

  // })



  return (
    <div className="App">

        <button><a href='/auth/google'>Sign In</a></button>
        <p>{getTest()}</p>
    </div>
  );
}

export default App;
