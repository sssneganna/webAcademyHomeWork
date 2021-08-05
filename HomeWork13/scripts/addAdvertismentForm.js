const formTemplate = `
 <div class="form_field">
    <input
      type="text"
      name="title"
      class="form-input"
      placeholder="Title"
    />
  </div>
  <div class="form_field">
    <textarea
      name="description"
      class="form-input"
      placeholder="Description"
    ></textarea>
  </div>
  <div class="form_field">
    <textarea
      name="note"
      class="form-input"
      placeholder="Note"
    ></textarea>
  </div>
  <div class="form_field">
    <input
      type="file"
      name="img"
      class="form__btn form__btn_upload"
    />
    <img src="" alt="" class="form_preview">
  </div>
  <div class="form_field">
    <button class="form-btn submit" type="submit">
      Add
    </button>
    <button class="form-btn reset" type="reset">
      Clear
    </button>
  </div>
`;

export class AddAdvertismentForm {
  constructor(root, url, onSuccess) {
    this.root = root;
    this.url = url;
    this.onSuccess = onSuccess;
    this.render();
    this.attachEvents();
  }

  render() {
    this.form = document.createElement("form");
    this.form.classList.add("form");
    this.form.innerHTML = formTemplate;
    this.root.append(this.form);
    this.previewImg = this.form.querySelector(".form_preview");
    this.fileUploadBtn = this.form.querySelector(".form__btn_upload");
  }

  attachEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const requestData = new FormData(this.form);
      fetch(this.url, {
        method: "POST",
        body: requestData,
      })
        .then((res) => res.json())
        .then((data) => {
          this.onSuccess(data);
        });
    });
    this.fileUploadBtn.addEventListener("change", () => {
      console.log(this.fileUploadBtn.files);
      if (this.fileUploadBtn.value) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.previewImg.src = fileReader.result;
        };

        fileReader.readAsDataURL(this.fileUploadBtn.files[0]);
      }
    });
  }

  sendData() {}
}
