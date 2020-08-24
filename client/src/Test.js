import React, { useEffect, useContext } from 'react';
import { TestTextContext } from './contexts/test.context'



const Test = () => {

  const { testText, changeTestText, fetchTest } = useContext(TestTextContext)








  return (
    <div className="App">
        <h3>Test comp</h3>
        <p>{testText}</p>
        <button onClick={changeTestText}>Click me</button>
    </div>
  );
}

export default Test;
