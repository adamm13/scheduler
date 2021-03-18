
export default function getAppointmentsForDay(state, day) {
  
  const result = [];
  const daysInfo = state.days.filter(dayOfWeek => dayOfWeek.name === day) // Find the correct day via .filter

  if(daysInfo[0] === undefined){
    return result;
  }

  for(const info of daysInfo[0].appointments){ // Loop appt array to find corresponding appts.
    result.push(state.appointments[info])
  }
  return result; //return an array of appointments.
}



