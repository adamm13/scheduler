import React, { useState } from 'react'
import classNames from "classnames";

import "components/Appointment/styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

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

  const saveForm = () => { //Saves the form
    props.onSave(name, interviewer);
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null){
      setError("You must select an Interviewer")
      return;
    }

    setError("");
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
            data-testid="student-name-input"

          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={event => cancelForm()}>Cancel</Button>
          <Button confirm onClick={event => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )

}