import { cards, sectionCards } from "./cards.js";
import {
  StartGameBTN,
  cardsContainer,
  toggleCheckBox,
  closeModal,
} from "./script.js";
export const RepeatWordBTN = document.querySelector(`.RepeatWordBTN`);
export const starIcon = document.querySelector(`.starIcon`);
//end game//////////////////
export function endGame(audio, message) {
  // document.body.style.overflow = `hidden`;
  const endGameAudio = new Audio(`./Misc/audio/${audio}.mp3`);
  endGameAudio.play();
  const endGame = document.querySelector(`.endGame`);
  const endGameMessage = document.querySelector(`#message`);
  endGameMessage.textContent = message;
  endGame.classList.remove(`hidden`);
  endGame.addEventListener(`click`, (e) => {
    e.preventDefault();
    closeModal();
    endGame.classList.add(`hidden`);
    location.reload();
  });
}
///////////////////////////////////////////////
export function playGame(sectionCardName) {
  /////START PLAY BUTTON CLICKCEVENT/////
  StartGameBTN.addEventListener(`click`, (e) => {
    e.preventDefault();
    ///////////////////////////////////
    const correctAudioMessage = new Audio(`./Misc/audio/correct.mp3`);
    const errorAudioMessage = new Audio(`./Misc/audio/error.mp3`);
    // const youWINAudio = new Audio(`./Misc/audio/success.mp3`);
    // const youLOSTAudio = new Audio(`./Misc/audio/failure.mp3`);
    //////////////////////////////////
    //////////////////////////////////////
    const randomArray = new Array(8)
      .fill()
      .map((a, i) => (a = i))
      .sort(() => Math.random() - 0.5);
    console.log(randomArray, `generating random array of numbers from 0 to 7`);
    let randomAudioArray = [];
    randomArray.forEach((el) => {
      randomAudioArray.push(
        cards[sectionCards.indexOf(sectionCardName)][el].audioSrc
      );
    });
    console.log(randomAudioArray);
    ///////////////////////////////////
    let totalScore = 0;
    let correctGuess = 0;
    let wrongGuess = 0;
    ///////////////////////////////////
    console.log(`Let the games begin!`);
    StartGameBTN.classList.add(`hidden`);
    RepeatWordBTN.classList.remove(`hidden`);
    const audio = new Audio();
    audio.src = `./Misc/${randomAudioArray[0]}`;
    RepeatWordBTN.addEventListener(`click`, (e) => {
      e.preventDefault();
      audio.play();
    });
    audio.play();
    console.log(audio, randomAudioArray[totalScore]);
    if (totalScore < 8) {
      cardsContainer.addEventListener(`click`, (e) => {
        e.preventDefault();
        if (e.target.classList.value === `displayCard`) {
          /////////////////////////////////////////////////
          const correctStar = document.createElement(`img`);
          correctStar.classList.add(`star`);
          correctStar.src = `./Misc/img/star-win.svg`;
          const wrongStar = document.createElement(`img`);
          wrongStar.classList.add(`star`);
          wrongStar.src = `./Misc/img/star.svg`;
          console.log(`CARD IS CLICKED`);
          console.dir(`${e.target.textContent}-was clicked`);
          console.dir(e.target.classList.value);
          //////////////////////////////////////
          /////////////////////////////////////
          if (totalScore === 8 && correctGuess === 8) {
            console.log(`You WON!!!!!!!!`);
            if (!toggleCheckBox.checked) {
              youWINAudio.pause();
              // youLOSTAudio.pause();
            }
            // youWINAudio.play();
            RepeatWordBTN.classList.add(`hidden`);
            toggleCheckBox.checked = false;
            console.log(toggleCheckBox.checked);
            starIcon.replaceChildren();
            totalScore = 0;
            randomAudioArray = [];
            endGame(`success`, `YOU WON!!!`);
            return;
          }
          if (totalScore === 8 && correctGuess !== 8) {
            console.log(`You LOST!!!!!!!!`);
            if (!toggleCheckBox.checked) {
              // youWINAudio.pause();
              youLOSTAudio.pause();
            }
            // youLOSTAudio.play();
            RepeatWordBTN.classList.add(`hidden`);
            toggleCheckBox.checked = false;
            console.log(toggleCheckBox.checked);
            starIcon.replaceChildren();
            totalScore = 0;
            randomAudioArray = [];
            endGame(`failure`, `YOU LOST :-(`);
            return;
          }
          /////////////////////////////////////
          /////////////////////////////////////
          if (
            randomAudioArray[totalScore].slice(6, -4) === e.target.textContent
          ) {
            correctAudioMessage.play();
            totalScore++;
            starIcon.append(correctStar);
            audio.src = `./Misc/${randomAudioArray[totalScore]}`;
            console.log(totalScore, `total score`);
            correctGuess++;
            audio.play();
            console.log(`Correct`, correctGuess);
          } else {
            errorAudioMessage.play();
            totalScore++;
            wrongGuess++;
            starIcon.append(wrongStar);
            audio.src = `./Misc/${randomAudioArray[totalScore]}`;
            console.log(totalScore, `total score`);
            audio.play();
            console.log(`Wrong`, wrongGuess);
          }
        }
        e.stopImmediatePropagation();
      });
    }
    e.stopImmediatePropagation();
  });
}
