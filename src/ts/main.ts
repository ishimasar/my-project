window.onload = function () {
  const buttons = document.getElementsByClassName('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', toggleWindow)
  }
}

function toggleWindow () {
  const modalWindow = document.getElementById('modal-window')
  modalWindow.classList.toggle('hidden')
}