function renderNewPackPage() {
  const newPackDiv = document.querySelector('#pack-new-page');
  newPackDiv.innerHTML = `
    <div>
      <h1>pack form</h1>
      <form class="new-pack-form">
        <label name="name">Name</label>
        <input type="text" name="name" />
        <label name="description">Description</label>
        <input type="text" name="description" />
        <label name="image_url">Image Url</label>
        <input type="text" name="image_url" />
        <label name="category">Category</label>
        <input type="text" name="category" />
      </form>

      <h1>card form</h1>
      <label>Free Response</label>
      <input
        id="free-response"
        type="radio"
        name="form-type"
        value="free-response"
      />
      <label>Multiple</label>
      <input
        id="multiple-choice"
        type="radio"
        name="form-type"
        value="multiple-choice"
      />

      <div id="card-form"></div>
    </div>
  `;
  newPackDiv
    .querySelector('#free-response')
    .addEventListener('change', renderFreeResponseForm);

  newPackDiv
    .querySelector('#multiple-choice')
    .addEventListener('change', renderMultipleChoiceForm);
}

function renderFreeResponseForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  const freeResponseForm = document.createElement('form');
  freeResponseForm.innerText = 'free response form';
  cardForm.appendChild(freeResponseForm);
}

function renderMultipleChoiceForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  const multipleChoiceForm = document.createElement('form');
  multipleChoiceForm.innerText = 'multiple choice form';
  cardForm.appendChild(multipleChoiceForm);
}
