import React from "react";
import classNames from "classnames";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import useVisualMode from "../../hooks/useVisualMode";



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => {
      transition(ERROR_SAVE, true)
      //console.log(err)
    });
    
  }

  function deleteInterview(id){
    transition(DELETING, true)
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => {
      transition(ERROR_DELETE, true)
      //console.log(err)
    });  
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  
  )

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
        onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          //bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Please Wait"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting..."}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Unable to save"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Unable to delete"
          onClose={back}
        />
      )}
    </article>
  )

}