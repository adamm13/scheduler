import React, { useState } from 'react'
import classNames from "classnames";

import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const resetForm = () => { //Resets the form
    setName("");
    setInterviewer(null);
  };

  const cancelForm = () => { // Call reset function and the cancel, 
    resetForm();
    props.onCancel();
  };

  const saveForm = () => {
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
          value={name}
          onChange={handleNameChange}
          />
        </form>
        <InterviewerList 
         interviewers={props.interviewers}
         interviewer={interviewer}
         setInterviewer={setInterviewer} 
         />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancelForm()}>Cancel</Button>
          <Button confirm onClick={(event) => saveForm()}>Save</Button>
        </section>
      </section>
    </main>
  )

}