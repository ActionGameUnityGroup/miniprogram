function formatDate (timeStamp) {
  let time = new Date(timeStamp);
  let year = (time.getFullYear()).toString(),
      month = (time.getMonth() + 1).toString(),
      date = (time.getDate()).toString();
  if (month.length !== 2) {
    month = '0' + month;
  }
  if (date.length !== 2) {
    date = '0' + date;
  }
  return `${year}-${month}-${date}`;
}

module.exports = formatDate;