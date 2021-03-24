import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, queryByAltText, prettyDOM, waitForElementToBeRemoved, getAllByTestId, getByPlaceholderText, queryByText, getAllByAltText } from "@testing-library/react";

import Application from "components/Application";

//import { fixtures } from "axios";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[2];


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Please Wait")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "appointment").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "appointment").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and the spots remaining for Monday stay the same", async () => {

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Check that the enter student name is shown.
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the "Save" button to confirm the edit.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Please Wait")).toBeInTheDocument();

    // 6. Check that the element with the new name info is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Please Wait"));

    // 7. Expect Lydia to be in the appointment
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // 8. Expect the edit button to appear again
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();
    const day = getAllByTestId(container, "appointment").find(day => getByText(day, "Monday"));

    // 9. Expect to see 1 spot remaining 
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait for container to show archie cohen
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[2];
    // 3. Click the add button
    fireEvent.click(getByAltText(appointment, "Add"))
    // 4. App changes to show the student name populated with the target lydia 
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Update the name to Sylvia
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Hit save after changes
    fireEvent.click(getByText(appointment, "Save"));
    // 7. expect to see please wait
    expect(getByText(appointment, "Please Wait")).toBeInTheDocument();
    // 8. wait for the please wait wheel to be removed and expect to see unable to save error message.
    await waitForElementToBeRemoved(() => getByText(appointment, "Please Wait"));
    expect(getByText(appointment, "Unable to save")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait for container to show archie cohen
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    // 3. Click the Delete button
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. expect to see the delete confirm message
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    //5 . click confirm to update message
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. expect tot see the deleting spin wheel 
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    //7 . wait for the spin element to be removed 
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting..."));
    //8. show the text unable to delete
    expect(getByText(appointment, "Unable to delete")).toBeInTheDocument();
  });
});