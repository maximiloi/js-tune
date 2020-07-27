import { musicPlayerInit } from './musicPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';  // импорт Радио Плеера
import { videoPlayerInit } from './videoPlayer.js';

const playerButton = document.querySelectorAll('.player-btn'); // находим все кнопки у табов
const playerBlock = document.querySelectorAll('.player-block'); // находим все блоки
const temp = document.querySelector('.temp'); // находим блок temp

const deactivationBlock = () => {  // функция убирает класс active
  playerButton.forEach((item) => item.classList.remove('active'));
  playerBlock.forEach((item) => item.classList.remove('active'));
  temp.style.display = 'none';
};

playerButton.forEach((button, i) => button.addEventListener('click', () => { // перебираем кнопки и добавляем класс active табам и блокам
  deactivationBlock();
  button.classList.add('active');
  playerBlock[i].classList.add('active');
}));

musicPlayerInit(); // запуск функции радио
radioPlayerInit(); // запуск функции радио
videoPlayerInit(); // запуск функции радио