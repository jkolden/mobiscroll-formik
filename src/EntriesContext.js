import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import DefaultDate from "./utilities/DefaultDate";

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [data, setData] = useState({ entries: [] });
  const [timecards, setTimecards] = useState([]);
  const [selectedDays, setSelectedDays] = useState(DefaultDate);
  const history = useHistory();

  const fetchTimecards = (startDay) => {
    fetch(
      `https://apex.oracle.com/pls/apex/myfusion/bdo/web_sheets/?start_date=${startDay}`
    )
      .then((res) => res.json())
      .then((data) => setTimecards(data.items));
  };

  const fetchEntries = (utcDate) => {
    //TODO: add loading property
    fetch(
      `https://apex.oracle.com/pls/apex/myfusion/bdo/summary/?timecard_date=${utcDate}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const filter = (id) => {
    const filtered = data.entries.filter((entry) => entry.id !== id);
    setData((previous) => ({
      ...previous,
      entries: filtered,
    }));

    fetch(`https://apex.oracle.com/pls/apex/myfusion/bdo/timerecord/${id}`, {
      method: "DELETE",
    });
  };

  const handleSubmit = (utcDate) => {
    let startDay =
      selectedDays.length > 0
        ? selectedDays[0].toLocaleDateString()
        : "4/5/2020";
    history.push("/");

    setData((previous) => ({
      ...previous,
      loading: true,
    }));

    fetch("https://apex.oracle.com/pls/apex/myfusion/bdo/timecard_submit/", {
      method: "POST",
      body: JSON.stringify({ timecard_date: utcDate }),
    }).then((res) => {
      if (res.status) {
        setData((previous) => ({
          ...previous,
          loading: false,
        }));
        fetchTimecards(startDay);
      }
    });
  };

  const sum = data.entries.reduce(function (tot, record) {
    return tot + record.hours;
  }, 0);

  return (
    <EntriesContext.Provider
      value={{
        data: data,
        fetchEntries: fetchEntries,
        fetchTimecards: fetchTimecards,
        filter: filter,
        handleSubmit: handleSubmit,
        timecards: timecards,
        sum: sum,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
