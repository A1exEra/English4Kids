import { cards, sectionCards } from "./cards.js";
import { createBurgerMenu, generateSlideMenu } from "./burgerMenu.js";
import { playGame, RepeatWordBTN, starIcon } from "./playgame.js";
document.body.style.overflowX = `hidden`;
//Burger animation
createBurgerMenu();
//slide menu load
generateSlideMenu(sectionCards);

//play game
export const toggleCheckBox = document.querySelector(`#toggleCheckBox`);
export const StartGameBTN = document.querySelector(`.StartGameBTN`);
//creating a random section card image
const randomSectionImg = function () {
  let randImg = Math.floor(Math.random() * 8);
  return randImg;
};
console.log(randomSectionImg());
///////////////////////////////////////////////
/////MODAL WINDOW//////////////////
export const cardsContainer = document.querySelector(`.cardsContainer`);
const overlay = document.createElement(`div`);
overlay.classList.add(`overlay`, `hidden`);
const modal = document.querySelector(`.modal`);
const closeBtnModal = document.querySelector(`.close_modal`);
export function closeModal() {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
  cardsContainer.replaceChildren();
  //unchecking the chechbox
  toggleCheckBox.checked = false;
  starIcon.replaceChildren();
  StartGameBTN.classList.add(`hidden`);
  RepeatWordBTN.classList.add(`hidden`);
  location.reload();
  console.log(
    toggleCheckBox.checked,
    `Checkbox is unchecked and start button is hidden`
  );
}
closeBtnModal.addEventListener(`click`, function (e) {
  e.preventDefault();
  closeModal();
});

//Creating the section cards//////////////////
function getSectionCards(sectionCards, cards) {
  const cardsFragment = new DocumentFragment();
  const hexlist = document.querySelector(`.honeycomb`);
  const reversedCards = cards.reverse();
  let imgCounter = -1;
  sectionCards.reverse().forEach((el, i, arr) => {
    const honeycombCell = document.createElement(`li`);
    imgCounter++;
    honeycombCell.classList.add(`honeycomb-cell`, `open_modal`);
    honeycombCell.innerHTML = `<img
      src="./Misc/${reversedCards[imgCounter][randomSectionImg()].image}"
      alt=""
    class="honeycomb-cell_img"
    />
    <div class="honeycomb-cell_title">
    ${el} <hr> <small>8 Cards</small>
    </div>`;
    cardsFragment.append(honeycombCell);
    hexlist.prepend(cardsFragment);
    // hexlist.prepend(honeycombCell);
    console.log(i);
    // console.log(honeycombCell);
    //loading the cards into play//MODAL WINDOW///
    honeycombCell.addEventListener(`click`, (e) => {
      e.preventDefault();
      console.log(`cell clicked`);
      document.body.append(overlay);
      modal.classList.remove(`hidden`);
      overlay.classList.remove(`hidden`);
      document.body.overflow = `hidden`;
      generatePlaycards(i, el);
    });
  });
}
//generating the main cards
getSectionCards(sectionCards, cards);
//generate play cards of the current  active section card
export function generatePlaycards(cardIndex, cardName) {
  //////////////////////////////////////////////
  //for the playGame function invocation!!!!!!!!
  const NameOfTheCard = cardName;
  console.log(NameOfTheCard);
  playGame(NameOfTheCard);
  /////////////////////////////////////////////////
  document.body.style.overflow = `hidden`;
  /////////////////////////////////////////////////
  const generatePlaycardsFragment = new DocumentFragment();
  cards[cardIndex].forEach((el, i, arr) => {
    const displayCard = document.createElement(`div`);
    const audio = new Audio(`./Misc/${el.audioSrc}`);
    displayCard.style.backgroundImage = `url('./Misc/${el.image}')`;
    displayCard.classList.add(`displayCard`);
    // console.log(el.word);
    const playWordBtn = document.createElement(`button`);
    playWordBtn.classList.add(`audioWord`);
    playWordBtn.innerHTML = `<i class="fas fa-music"></i>`;
    const cardWord = document.createElement(`p`);
    cardWord.innerHTML = el.word;
    const flipCard = document.createElement(`button`);
    flipCard.classList.add(`flipCard`);
    flipCard.innerHTML = `<i class="fa fa-rotate-left"></i>`;
    displayCard.append(playWordBtn, cardWord, flipCard);
    generatePlaycardsFragment.append(displayCard);
    //play audio
    playWordBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      audio.play();
    });
    cardsContainer.append(generatePlaycardsFragment);
    //flip card to show translation of the word
    flipCard.addEventListener(`click`, (e) => {
      e.preventDefault();
      console.log(`flip is clicked`);
      // displayCard.style.transform = "rotateY(360deg)";
      displayCard.classList.add(`card_isFlipped`);
      cardWord.innerText = el.translation;
      playWordBtn.classList.add(`hidden`);
      flipCard.classList.add(`hidden`);
    });
    displayCard.addEventListener(`mouseleave`, (e) => {
      e.preventDefault();
      console.log(`mouseout`);
      // displayCard.style.transform = "rotateY(-360deg)";
      displayCard.classList.remove(`card_isFlipped`);
      cardWord.innerText = el.word;
      playWordBtn.classList.remove(`hidden`);
      flipCard.classList.remove(`hidden`);
    });
    //Play game///////////////////////////////////
    toggleCheckBox.addEventListener(`click`, (e) => {
      console.log(toggleCheckBox.checked);
      if (toggleCheckBox.checked === true) {
        StartGameBTN.classList.remove(`hidden`);
        cardWord.classList.add(`hidden`);
        playWordBtn.classList.add(`hidden`);
        flipCard.classList.add(`hidden`);
        starIcon.replaceChildren();
        //had to run this code, because of previous 'mouseleave' that toggled the icons into view
        displayCard.addEventListener(`mouseleave`, (e) => {
          e.preventDefault();
          console.log(`mouseleave during play state`);
          displayCard.classList.remove(`card_isFlipped`);
          cardWord.classList.add(`hidden`);
          playWordBtn.classList.add(`hidden`);
          flipCard.classList.add(`hidden`);
        });
      } else {
        StartGameBTN.classList.add(`hidden`);
        cardWord.classList.remove(`hidden`);
        playWordBtn.classList.remove(`hidden`);
        flipCard.classList.remove(`hidden`);
        RepeatWordBTN.classList.add(`hidden`);
        starIcon.replaceChildren();
        //had to run this code, because of previous 'mouseleave' that toggled the icons into view
        displayCard.addEventListener(`mouseleave`, (e) => {
          e.preventDefault();
          console.log(`mouseleave during play state`);
          displayCard.classList.remove(`card_isFlipped`);
          cardWord.classList.remove(`hidden`);
          playWordBtn.classList.remove(`hidden`);
          flipCard.classList.remove(`hidden`);
        });
      }
    });
  });
  // console.log(cardsContainer);
}
