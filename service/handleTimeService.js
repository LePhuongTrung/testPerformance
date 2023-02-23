let date = new Date();

const getTime = (day_name, type) => {
  if (!req.body.current_day && !req.body.hours && !req.body.minutes) {
    current_day = date.getDay();
    hours = date.getHours();
    minutes = date.getMinutes();
  } else {
    current_day = req.body.current_day;
    hours = req.body.hours;
    minutes = req.body.minutes;
  }
};

const checkHoliday = (day_name, type) => {
  if (
    (day_name == "SunDay" && type != "emergency") ||
    (day_name == "Saturday" && type != "emergency")
  ) {
    return true;
  }
  return false;
};

const checkDay = (current_day) => {
  let day_name;
  switch (current_day) {
    case 0:
      day_name = "SunDay";
      break;
    case 1:
      day_name = "Monday";
      break;
    case 2:
      day_name = "TuesDay";
      break;
    case 3:
      day_name = "Wednesday";
      break;
    case 4:
      day_name = "Thursday";
      break;
    case 5:
      day_name = "Friday";
      break;
    case 6:
      day_name = "Saturday";
  }
  return day_name;
};
const calculateTimeRemaining = (hours, minutes) => {
  if (hours < 11) {
    timeRemaining = (11 - hours + 4) * 60 - minutes;
  } else {
    timeRemaining = (17 - hours) * 60 - minutes;
  }

  return timeRemaining;
};

const calculateTimeWait = (waitNumber, currentNumber, timeRemaining) => {
  let timeWait;
  timeWait = (waitNumber - currentNumber) * 10;
  if (
    (timeWait > timeRemaining && timeRemaining < 100) ||
    (timeWait > timeRemaining &&
      timeRemaining > 100 &&
      timeWait - timeRemaining < 20)
  ) {
    return (timeWait = 999999);
  }

  return timeWait;
};

module.exports = {
  checkHoliday,
  checkDay,
  calculateTimeWait,
  calculateTimeRemaining,
  getTime,
};
