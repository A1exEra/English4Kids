import { cards, sectionCards } from "./cards.js";
// import { generatePlaycards } from "./script.js";
//Burger animation
export const popup = document.querySelector(`.popup`);
const burger = document.querySelector(`.burger`);
const navLinks = document.querySelector(`#navLinks`);
const burgerBtn = document.querySelector(`#burgerBtn`);
const iconArray = [
  `<span class="material-symbols-outlined icons"> pool </span>`,
  `<span class="material-symbols-outlined icons"> directions_bike </span>`,
  `<span class="material-symbols-outlined icons">
  cruelty_free
  </span>`,
  `<span class="material-symbols-outlined icons">
  sound_detection_dog_barking
</span>`,
  `<span class="material-symbols-outlined icons"> styler </span>`,
  `<span class="material-symbols-outlined icons">
  sentiment_very_satisfied
</span>`,
  `<span class="material-symbols-outlined icons"> forest </span>`,
  `<span class="material-symbols-outlined icons"> hand_bones </span>`,
];
//////////////////////////////////////////////////
export function createBurgerMenu() {
  //burger animation logic
  window.addEventListener(`mouseup`, (e) => {
    if (e.target != popup && e.target.parentNode != popup) {
      popup.classList.remove(`slide-navbar`);
      burger.classList.remove(`change`);
    }
    burger.addEventListener(`click`, (e) => {
      e.preventDefault();
      burger.classList.toggle(`change`);
      popup.classList.toggle(`slide-navbar`);
    });
  });
}
////////////////////////////////////////////
export function generateSlideMenu(sectionCards) {
  sectionCards.forEach((el, i, arr) => {
    const slideList = document.createElement(`li`);
    slideList.classList.add(`nav_list`);
    slideList.innerHTML = `<li><a href="" class="nav_link">${el}</a>${iconArray[i]}</li>`;
    popup.append(slideList);
  });
}
