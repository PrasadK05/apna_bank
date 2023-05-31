let getDateAndTime = () => {
  let monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let timestamp = Date.now();

  let date = new Date(timestamp);
  let options = { timeZone: "Asia/Kolkata" };
  let istTime = date.toLocaleString("en-IN", options);
  let arr = istTime.split(", ");
  let getDate = arr[0].split("/").map(Number);
  let mon = monthsArray[getDate[1]-1];

  return { date: `${mon} ${getDate[0]}, ${getDate[2]}`, time: `${arr[1]}` };
};

module.exports = getDateAndTime;
