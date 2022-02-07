//##### DROPDOWN ui #####

function dropdownUI() {

  function ingredientsDropdown() {
    const blueBtn = document.getElementById('blueBtn');
    const blueMenu = document.getElementById('blueMenu');

    const intoInputIngredients = () => {
      blueMenu.classList.add('show');
      blueBtn.classList.add('bluePush');
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

    const intoInputAppliances = () => {
      greenBtn.classList.add('greenPush');
      greenMenu.classList.add('show');
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

    const intoInputUstensils = () => {
      redBtn.classList.add('hidden');
      redMenu.classList.add('show');
    }
    const intoButtonUstensils = () => {
      redBtn.classList.remove('hidden');
      redMenu.classList.remove('show');
    }
    redBtn.addEventListener('click', intoInputUstensils);
    redMenu.addEventListener('focusout', intoButtonUstensils)
  }
  ustensilsDropdown();
}

export default dropdownUI();