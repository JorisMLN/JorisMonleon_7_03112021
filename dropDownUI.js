// Gestion DOM dropdown 

function dropdownUI() {
  function ingredientsDropdown() {
    const blueBtn = document.getElementById('blueBtn');
    const blueMenu = document.getElementById('blueMenu');
    const blueMenuDisplay = document.getElementById('blueMenuDisplay');

    const intoInputIngredients = () => {
      blueMenu.classList.add('show');
      blueBtn.classList.add('bluePush');
      blueMenuDisplay.classList.add('menuDisplayON')
    }
    const intoSwitchIngredients = () => {
      blueBtn.classList.remove('bluePush');
      blueMenu.classList.remove('show');
    }
    blueBtn.addEventListener('click', intoInputIngredients);
    blueMenu.addEventListener('focusout', intoSwitchIngredients)
  }
  ingredientsDropdown();

  function appareilsDropdown() {
    const greenBtn = document.getElementById('greenBtn');
    const greenMenu = document.getElementById('greenMenu');
    const greenMenuDisplay = document.getElementById('greenMenuDisplay');

    const intoInputAppliances = () => {
      greenBtn.classList.add('greenPush');
      greenMenu.classList.add('show');
      // greenMenuDisplay.classList.add('menuDisplayON')
    }
    const intoButtonAppliances = () => {
      greenBtn.classList.remove('greenPush');
      greenMenu.classList.remove('show');
    }
    greenBtn.addEventListener('click', intoInputAppliances);
    greenMenu.addEventListener('focusout', intoButtonAppliances)
  }
  appareilsDropdown();

  function ustensilsDropdown() {
    const redBtn = document.getElementById('redBtn');
    const redMenu = document.getElementById('redMenu');
    const redMenuDisplay = document.getElementById('redMenuDisplay');

    const intoInputUstensils = () => {
      redBtn.classList.add('redPush');
      redMenu.classList.add('show');
      redMenuDisplay.classList.add('menuDisplayON')
    }
    const intoButtonUstensils = () => {
      redBtn.classList.remove('redPush');
      redBtn.classList.remove('hidden');
      redMenu.classList.remove('show');
    }
    redBtn.addEventListener('click', intoInputUstensils);
    redMenu.addEventListener('focusout', intoButtonUstensils)
  }
  ustensilsDropdown();
}

export default dropdownUI();