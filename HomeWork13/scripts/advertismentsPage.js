import { AddAdvertismentForm } from "./addAdvertismentForm.js";
import { AdvertismentsItem } from "./advertismentsItem.js";
const API_URL = "https://boring-fe.herokuapp.com";
const SUB_DOMAIN = "/advertisments";
export class AdvertismentsPage {
  constructor(root) {
    this.root = root;
    this.filter = {
      page: 1,
      limit: 10,
      order: "desc",
    };
    this.render();
    this.fetchData();
  }

  fetchData() {
    fetch(
      `${API_URL}${SUB_DOMAIN}?_page=${this.filter.page}&_limit=${this.filter.limit}&_sort=createdAt&_order=${this.filter.order}`
    )
      .then((res) => res.json())
      .then((responseData) => {
        this.data = [];
        for (let i = 0; i < responseData.length; i++) {
          responseData[i].img = `${API_URL}/${responseData[i].img}`;
          this.data.push(responseData[i]);
        }
        this.renderList();
      });
  }

  render() {
    this.renderTemplate();
    this.renderForm();
  }

  renderTemplate() {
    this.container = document.createElement("div");
    this.container.classList.add("advertisments-page");
    this.root.append(this.container);
    this.pageList = document.createElement("div");
    this.pageList.classList.add("advertisments-page_list");
    this.container.append(this.pageList);
  }

  renderForm() {
    this.formContainer = document.createElement("div");
    this.formContainer.classList.add("advertisments-page_form");
    this.container.append(this.formContainer);
    this.form = new AddAdvertismentForm(
      this.formContainer,
      `${API_URL}${SUB_DOMAIN}`,
      (newAdvertisment) => {
        newAdvertisment.img = `${API_URL}/${newAdvertisment.img}`;
        const item = new AdvertismentsItem(newAdvertisment);
        this.pageList.insertBefore(item.render(), this.pageList.firstChild);
      }
    );
  }

  renderList() {
    for (let i = 0; i < this.data.length; i++) {
      const item = new AdvertismentsItem(this.data[i]);
      this.pageList.insertBefore(item.render(), this.pageList.firstChild);
    }
  }
}
