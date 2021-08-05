import { createGrid } from "./createGrid.js";
const main = document.createElement("main");
document.body.appendChild(main);
main.classList.add("main");
const container = document.createElement("div");
main.appendChild(container);
container.classList.add("grid-container");

let words = [
  "Основы",
  "Я - из..",
  "Знакомство",
  "Моя семья",
  "Места",
  "Вечеринка",
  "Увлечения",
  "Ресторан",
  "Питомцы",
];
for (let i = 0; i < words.length; i++);
let createGrids = (count = 1) => {
  for (let i = 0; i < count; i++) {
    createGrid(container, words[i]);
  }
};
createGrids(1);
