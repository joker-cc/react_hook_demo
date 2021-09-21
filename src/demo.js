import React, { useState, useRef } from 'react';
import Clock from './clock';

const ClockContext = React.createContext();

const Demo = props => {
  const [start, setStart] = useState(0);
  const inputRef = useRef(null);
  const clockRef = useRef(null);

  const handleClick = () => {
    setStart(Number(inputRef.current.value));
    if (clockRef) {
      clockRef.current.handleReset(Number(inputRef.current.value));
    }
  }

  return (
    <>
      {/* <ClockContext.Provider value={start}> */}
      <ClockContext.Provider value={0}>
        <Clock ref={clockRef} />
      </ClockContext.Provider>
      <>
        <input ref={inputRef} />
        <button onClick={handleClick}>重新计时</button>
      </>
    </>
  );
}

export { ClockContext };
export default Demo;