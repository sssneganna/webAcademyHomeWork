export const createProductList = (root) => {
  const container = document.createElement("div");
  container.classList.add("movies-list");
  fetch("https://boring-fe.herokuapp.com/movies")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const moviesItem = document.createElement("div");
        let itemContent = `
        <div class="movies">
        <div class="description">
        <div class="description-info">
        <h3 class="description-title">${data[i].title}</h3>
        <p class="description-text">${data[i].description}</p>
        </div>
        </div>
        <img class="img" src="${data[i].preview}"/>
        <div class ="rating">${data[i].rating}</div>
        <div class="content">
        <h2 class="title">${data[i].title}</h2>
        </div>
        </div>
        <div class ="genre">${data[i].genre}</div>
        `;
        moviesItem.innerHTML = itemContent;
        container.append(moviesItem);
        moviesItem.classList.add("movies-item");
      }
    });
  root.append(container);
};
