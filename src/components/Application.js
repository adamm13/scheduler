import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "components/helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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

  //const setDays =(days) => {
  //  setState(prev => ({ ...prev, days }));
  //}

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

