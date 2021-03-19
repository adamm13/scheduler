import { useState } from "react";


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  //taking in a new mode
  function transition(newMode, replace) { 

    setHistory(prev => replace //set history to the new mode 
      ? [...prev.slice(0, prev.length -1), newMode] 
      : [...prev, newMode]) 

  }

  function back() {
    //if (history.length > 1){ // History array will need to always have a length that is > 1
      setHistory(prev => history.length > 1 
        ? prev.slice(0, prev.length - 1)
        : prev 
      )
  }

  return { mode: history[history.length -1], transition, back };
}




