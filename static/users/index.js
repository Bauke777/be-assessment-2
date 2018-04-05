/* eslint-env browser */

let date = document.querySelectorAll('.age')

if (date) {
  for (let elm of date) {
    if (!isNaN(getAge(elm.textContent))) {
      elm.innerHTML = getAge(elm.textContent)
    } else {
      elm.innerHTML = "-"
    }
  }
}

function getAge(dateString) {
  let birthdate = new Date(dateString);
  let current = new Date();
  let difference = current-birthdate;
  let age = Math.floor(difference/31557600000);
  return age
}
