import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [data, setData] = useState({ entries: [] });
  const history = useHistory();

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
    history.push("/");

    setData((previous) => ({
      ...previous,
      loading: true,
    }));
    setTimeout(function () {
      setData((previous) => ({
        ...previous,
        loading: false,
      }));
    }, 10000);

    /*
    fetch("https://apex.oracle.com/pls/apex/myfusion/bdo/timecard_submit/", {
      method: "POST",
      body: JSON.stringify({ timecard_date: utcDate }),
    }).then((res) => console.log(res));
  };
  */
  };

  const sum = data.entries.reduce(function (tot, record) {
    return tot + record.hours;
  }, 0);

  return (
    <EntriesContext.Provider
      value={{
        data: data,
        fetchEntries: fetchEntries,
        filter: filter,
        handleSubmit: handleSubmit,
        sum: sum,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
