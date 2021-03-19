import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "components/helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {bookInterview},
    interviewers: {}
  });
  

  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview } //create new object
    };
    const appointments ={
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      //console.log(appointment)
      setState({ 
        ...state,
        appointments
      });
    })
    
    //console.log(state.appointments)

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

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }
  

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day)
    //console.log(state.appointments)
  const schedule = dailyAppointments.map((appointment) => {
    //console.log(appointment)
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


  // const parsedAppointments = dailyAppointments.map(appointment => {
  //   return (<Appointment key={appointment.id} {...appointment} />)
  // })

  const setDay = day => setState({ ...state, day });

  //const setDays =(days) => {
  //  setState(prev => ({ ...prev, days }));
  //}
  useEffect(() => {
  Promise.all([
    axios.get("/api/days"), 
    axios.get("/api/appointments"), 
    axios.get("/api/interviewers") 
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  });
  },[])
  /*useEffect(() => {
    const getDays = "/api/days"
    axios.get(getDays) //axios API request to get days 
      .then(response => setDays(response.data));
  }, [])*/

   return (
    <main className="layout">
      <section className="sidebar">
        <img
    className="sidebar--centered"
    src="images/logo.png"
    alt="Interview Scheduler"/>
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu">
    <DayList
      days={state.days}
      day={state.day}
      setDay={setDay}
    />
  </nav>
  <img
    className="sidebar__lhl sidebar--centered"
    src="images/lhl.png"
    alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
         <Appointment  key="last" time="5pm" />
      </section>
    </main>
  );
}

