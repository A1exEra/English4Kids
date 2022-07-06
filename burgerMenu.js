export function createBurgerMenu() {
  //Burger animation
  const popup = document.querySelector(`.popup`);
  const burger = document.querySelector(`.burger`);
  const navLinks = document.querySelector(`#navLinks`);
  const burgerBtn = document.querySelector(`#burgerBtn`);
  //////////////////////////////////////////////////
  //burger animation logic
  burger.addEventListener(`click`, (e) => {
    e.preventDefault();
    burger.classList.toggle(`change`);
    popup.classList.toggle(`slide-navbar`);
  });
  window.addEventListener(`mouseup`, (e) => {
    if (e.target != popup && e.target.parentNode != popup) {
      popup.classList.remove(`slide-navbar`);
      burger.classList.remove(`change`);
    }
  });
}
