import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones2",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer#2",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones3",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer the Third",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {

  const parsedAppointments = appointments.map(appointment => {
    return (<Appointment key={appointment.id} {...appointment} />)
  })

  const [dayOfWeek, setDayofWeek] = useState("Monday")
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getDays = "/api/days"
    axios.get(getDays) //axios API request to get days 
    .then(response => setDays(response.data)) 
  }, [])

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
      days={days}
      day={dayOfWeek}
      setDay={setDayofWeek}
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

