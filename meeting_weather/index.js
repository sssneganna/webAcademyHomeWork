import { SearchCityForm } from "./script.js";
const main = document.createElement("main");
document.body.appendChild(main);
main.classList.add("main");
const searchCityForm = new SearchCityForm(main);
console.log(searchCityForm);
