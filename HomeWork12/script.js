const API_URL = "http://localhost:4000/movies";

const createMovieItem = (
  root,
  movie,
  onDeleteKeyClick,
  shoudInsertBefore = false
) => {
  const container = document.createElement("div");
  container.id = `item-${movie.id}`;
  container.innerHTML = `
  <div class="movies">
  <div class="description">
  <div class="description-info">
  <h3 class="description-title">${movie.title}</h3>
  <p class="description-text">${movie.description}</p>
  </div>
  </div>
  <img class="img" src="${movie.preview}"/>
  <div class ="rating">${movie.rating}</div>
  <div class="content">
  <h2 class="title">${movie.title}</h2>
  </div>
  </div>
  <div class ="genre">${movie.genre}</div>
  `;
  const btn = document.createElement("button");
  btn.addEventListener("click", () => {
    onDeleteKeyClick(movie.id);
  });
  container.append(btn);
  btn.classList.add("btn-delete");
  btn.innerHTML = `
  <span>Delete</span>
  `;
  if (shoudInsertBefore) {
    root.insertBefore(container, root.firstChild);
  } else {
    root.append(container);
  }
  container.classList.add("movies-item");
};

const createAddMovieForm = (root, onSuccessSubmitCallback) => {
  const form = document.createElement("form");
  const template = `
      <div class="form_field">
      <input class="form-input" name="title" type="text" placeholder="title"/>
      </div>
      <div class="form_field">
      <textarea class="form-input" name="description" placeholder="description" id="" cols="30" rows="5"></textarea>
      </div>
      <div class="form_field">
      <input class="form-input" name="rating" type="text" placeholder="rating"/>
      </div>
      <div class="form_field">
      <input class="form-input" name="genre" placeholder="genre" type="text" />
      </div>
      <div class="form_field">
      <button class="form-btn submit" type="submit">Add</button>
      <button class="form-btn reset" type="reset">Reset</button></div>
    `;
  form.innerHTML = template;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        onSuccessSubmitCallback(data);
        form.reset();
      });
  });
  form.classList.add("form");
  root.append(form);
};

export const createProductList = (root) => {
  const rootContainer = document.createElement("div");
  const itemsContainer = document.createElement("div");
  itemsContainer.classList.add("movies-list");
  createAddMovieForm(rootContainer, (post) => {
    const insertBefore = true;
    createMovieItem(itemsContainer, post, deletePost, insertBefore);
  });
  const deletePost = (movieId) => {
    fetch(`${API_URL}/${movieId}`, {
      method: "DELETE",
    }).then((res) => {
      const removedChild = itemsContainer.querySelector(`#item-${movieId}`);
      itemsContainer.removeChild(removedChild);
    });
  };

  fetch(API_URL)
    .then((res) => {
      if (res.status < 400) {
        return res.json();
      } else if (res.status === 404) {
        document.body.innerHTML = "<h1>NOT FOUND</h1>";
      }
      throw Error(res.statusText);
    })
    .then((movieItems) => {
      const t = movieItems.sort(
        (item, itemNext) => itemNext.createdAt - item.createdAt
      );
      for (let i = 0; i < t.length; i++) {
        createMovieItem(itemsContainer, t[i], deletePost);
      }
    })
    .catch((e) => {
      alert(e);
    });

  rootContainer.append(itemsContainer);
  root.append(rootContainer);
};
