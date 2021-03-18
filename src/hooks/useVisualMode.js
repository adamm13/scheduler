import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode) { //taking in a new mode
    setMode(newMode) //updating the mode state with the new value
    setHistory(history => [newMode,...history]) //set history to the new mode
   }

   function back() {
     setMode(history - 1)
     setHistory(history => history.slice(1)) // new copy of array - everything except first


   }

  return { mode, transition, back };
}
  

