export class AdvertismentsItem {
  constructor(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add("advertisment");
    this.container.innerHTML = `
        <img src="${this.data.img}" class="advertisment_img"/>
        <h2 class="advertisment_title">${this.data.title}</h2>
        <p class="advertisment_description">${this.data.description}</p>
        <p class="advertisment_description note">${this.data.note}</p>
      `;
    return this.container;
  }
}
