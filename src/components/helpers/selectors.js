
function getAppointmentsForDay(state, day) {
  
  const result = [];
  const daysInfo = state.days.filter(dayOfWeek => dayOfWeek.name === day) // Find the correct day via .filter

  if(daysInfo[0] === undefined){
    return result;
  }

  for(const info of daysInfo[0].appointments){ // Loop appointment array to find corresponding appointments.
    result.push(state.appointments[info])
  }
  return result; //return an array of appointments.
}

function getInterviewersForDay(state, day) {

  const result = [];
  const daysInfo = state.days.filter(dayOfWeek => dayOfWeek.name === day) // Find the correct day via .filter

  if (daysInfo[0] === undefined) {
    return result;
  }

  for (const info of daysInfo[0].interviewers) { // Loop appointment array to find corresponding appointments.
    result.push(state.interviewers[info])
  }
  return result; //return an array of appointments.
}


function getInterview(state, interview) {  //add the information from interviewer if existing interview

    if (interview === null) {
      return null;

    } else {
      const interviewerData = state.interviewers[interview.interviewer]; // id, name, avatar from interviewer
      return {
        student: interview.student,
        interviewer: interviewerData 
      }
    }
  };



export { getAppointmentsForDay, getInterview, getInterviewersForDay };
