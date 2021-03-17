import React from "react";
import classNames from "classnames";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  let listOfInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
          key={interviewer.id} 
          avatar={interviewer.avatar}
          name={interviewer.name}
          selected={props.interviewer === interviewer.id}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
          />
    );
  })

  return (<section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{listOfInterviewers}</ul>
  </section>
  )
}
