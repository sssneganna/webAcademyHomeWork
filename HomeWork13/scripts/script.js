import { AdvertismentsPage } from "./advertismentsPage.js";
const main = document.createElement("main");
document.body.appendChild(main);
main.classList.add("main");
const advertismentsPage = new AdvertismentsPage(main);
console.log(advertismentsPage);
