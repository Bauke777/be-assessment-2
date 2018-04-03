/* eslint-env browser */

var win = window
var doc = document
var $node = doc.getElementById('remove')

if ($node) {
  $node.addEventListener('click', onremove)
}

function onremove() {
  fetch(doc.location.pathname, {method: 'delete'})
    .then(onresponse)
    .then(onload, onfail)
}

function onresponse(res) {
  if (res.ok) {
    win.location = '/'
  } else {
    onfail()
  }
}

function onfail() {
  throw new Error('Could not delete!')
}
