import moment from "moment";

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, "days")
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf("week")
      .toDate(),
    to: moment(date)
      .endOf("week")
      .toDate()
  };
}

const DefaultDate = () => {
  let start = new Date(
    "Sun Mar 29 2020 00:00:00 GMT-0700 (Pacific Daylight Time)"
  );
  return getWeekDays(getWeekRange(start).from);
};

export default DefaultDate;
