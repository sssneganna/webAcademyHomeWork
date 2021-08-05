import { createCircle } from "./createCircle.js";
import { openWindow } from "./openWindow.js";

export const createGrid = (root, text) => {
  const grid = document.createElement("div");
  root.appendChild(grid);
  grid.classList.add("grid-item");
  const createBtn = (root) => {
    const btn = document.createElement("button");
    root.appendChild(btn);
    btn.classList.add("btn");

    createCircle(btn, "80", "#ce82ff", "btn_icon", "1", "#ce82ff");

    const title = document.createElement("h2");
    btn.appendChild(title);
    title.textContent = `${text}`;
    title.classList.add("btn_title");

    const createWindow = (
      root,
      sizeWidth,
      sizeHeight,
      bgColor,
      brRadius,
      border = 1,
      borderColor
    ) => {
      const figure = document.createElement("div");
      figure.style.width = `${sizeWidth}px`;
      figure.style.height = `${sizeHeight}px`;
      figure.style.backgroundColor = `${bgColor}`;
      figure.style.borderRadius = `${brRadius}%`;
      figure.style.border = `${border}px solid ${borderColor}`;
      root.appendChild(figure);
      figure.classList.add("btn_opening-window");
      figure.innerHTML = `
      <div class="box">
      <div class="info">
      <p class="level">Уровень 0/5</p>
      <p class="lesson">Урок 0 из 3</p>
      </div>
      <div class="key"><button class="btn_key"></button></div>
      </div>
      <button class="btn_window theory">
      <a href="https://www.duolingo.com/skill/en/Basics/tips-and-notes" class="link color-theory">Теория</a></button>
      <button class="btn_window start">
      <a href="https://www.duolingo.com/skill/en/Basics/1" class="link color-start">Старт</a></button>
      `;

      btn.addEventListener("click", () => {
        openWindow(figure);
      });
    };
    createWindow(grid, "300", "250", "#ce82ff", "10", "1", "#ce82ff");
  };
  createBtn(grid);
};
