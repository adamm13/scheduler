import { useState } from "react";


export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  //taking in a new mode
  function transition(newMode, replace) { 

     setHistory(prev => replace 
      ? [...prev.slice(0, prev.length -1), newMode] 
      : [...prev, newMode]) //set history to the new mode w/ callback so if used async will always be whats set

  }

  function back() {
    //if (history.length > 1){ // History array will need to always have a length that is > 1
      setHistory(prev => history.length > 1 
        ? prev.slice(0, prev.length - 1)
        : prev // new copy of array - everything except first
      )
  }

  return { mode: history[history.length -1], transition, back };
}




