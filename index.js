const button = document.getElementById('defaultDropdown');
const input = document.getElementById('filtresInput');
const menu = document.getElementById('menu');

const switchToInput = () => {
  button.classList.add('hidden');
  input.classList.remove('hidden');
  menu.classList.add('show');
}

const switchToButton = () => {
  button.classList.remove('hidden');
  input.classList.add('hidden');
  menu.classList.remove('show');
}

button.addEventListener('click', switchToInput);
input.addEventListener('focusout', switchToButton)

