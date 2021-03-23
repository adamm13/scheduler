import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: { bookInterview },
    interviewers: {}
  });

  // function updateSpots(days, appointments, id, value) {
  //   days.forEach(day => {
  //     if ((!appointments[id].interview && value === -1) || value === 1) {
  //       if (day.appointments.includes(id)) {
  //         day.spots += value
  //       }
  //     }
  //   })
  //   return days;
  // }

  function getNullSpots(day, appointments) {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }
    return count;
  };
  function updateSpots(dayName, days, appointments) {
    const spreadDays = [...days];
    const day = spreadDays.find(item => item.name === dayName);
    const nulls = getNullSpots(day, appointments);
    day.spots = nulls;
    //console.log(day.spots);
    return spreadDays;
  };


  function bookInterview(id, interview) {
    //console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //create new object
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const days = updateSpots([...state.days], state.appointments, id, -1)
    const days = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        //console.log(appointment)
        setState({
          ...state,
          appointments,
          days
        });
      })

    //console.log(state.appointments)

  }
  function cancelInterview(id) {
    //console.log(id)
    const appointment = {
      ...state.appointments[id],
      interview: null //create new object
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const days = updateSpots([...state.days], state.appointments, id, 1)
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