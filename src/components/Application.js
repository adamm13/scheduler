import React, { useState } from "react";


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

  const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function Application(props) {

  const [dayOfWeek, setDayofWeek] = useState("Monday")

  const parsedAppointments = appointments.map(appointment =>  {
   return (<Appointment key={appointment.id} {...appointment} /> )
  })

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

