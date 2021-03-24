import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: { bookInterview },
    interviewers: {}
  });


  function getNullSpots(day, appointments) { // count the total amount of null spots to be used in update spots function
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }
    return count;
  };
  function updateSpots(dayName, days, appointments) { //count the null spots and return the amount after adding/ deleting or editing a spot.
    const spreadDays = [...days];
    const day = spreadDays.find(item => item.name === dayName);
    const nulls = getNullSpots(day, appointments);
    day.spots = nulls;
    return spreadDays;
  };


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //create new object
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })


  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null //create new object
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, [])


  return { state, setDay, bookInterview, cancelInterview };

};