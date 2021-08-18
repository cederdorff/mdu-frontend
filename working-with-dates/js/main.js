// returning todays date in the format dd/mm/yyyy
function getToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  return today;
}

console.log(getToday());
document.getElementById("calendar-header-container").innerHTML = getToday();
document.getElementById("date-container").innerHTML = getToday();

// returning a date in the format dd/mm/yyyy
function formatDate(date) {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = date.getFullYear();
  date = dd + '/' + mm + '/' + yyyy;
  return date;
}

let someDate = new Date(2018, 11, 24, 10, 33, 30, 0);

console.log(someDate);
console.log(formatDate(someDate));
console.log(formatDate(new Date()));

// using a class
// A JavaScript class is not an object.
// It is a template for JavaScript objects.

class DateService {
  constructor() { }
  //formatting the date
  format(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    date = dd + '/' + mm + '/' + yyyy;
    return date;
  }
  // returning today date in the format dd/mm/yyyy
  getToday() {
    let today = new Date();
    return this.format(today);
  }
  // returning tomorrow's date in the format dd/mm/yyyy
  getTomorrow() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.format(tomorrow);
  }
  // returning yesterday's date in the format dd/mm/yyyy
  getYesterday() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.format(yesterday);
  }
}


function append(selector, html) {
  document.querySelector(selector).innerHTML += html;
}

let dateService = new DateService();
append("body", dateService.getToday());
append("body", "<br>")
append("body", dateService.format(someDate));
append("body", "<br>")
append("body", dateService.getTomorrow());
append("body", "<br>");
append("body", dateService.getYesterday());
