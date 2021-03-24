import React from "react";


import DayListItem from "components/DayListItem";

export default function DayList(props) {

  return props.days.map(day =>

    <DayListItem
      key={day.id} // in React we need to uniquely identify each component
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  );
}
