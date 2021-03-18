import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "components/helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map(appointment => {
    return (<Appointment key={appointment.id} {...appointment} />)
  })

  const setDay = day => setState({ ...state, day });

  //const setDays =(days) => {
  //  setState(prev => ({ ...prev, days }));
  //}
  useEffect(() => {
  Promise.all([
    axios.get("/api/days"), //"GET_DAYS": http://localhost:8001/api/days,
    axios.get("/api/appointments"), //"GET_APPOINTMENTS": http://localhost:8001/api/appointments,
    axios.get("/api/interviewers") //"GET_INTERVIEWERS": http://localhost:8001/api/interviewers,
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
        {parsedAppointments}
         <Appointment  key="last" time="5pm" />
      </section>
    </main>
  );
}

