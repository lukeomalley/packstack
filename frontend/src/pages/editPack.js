function renderEditPackPage(packId) {
  const editPackDiv = document.querySelector('#pack-edit-page');
  editPackDiv.innerHTML = `
    <h1>Edit Pack Page</h1>
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
  `;

  editPackDiv
    .querySelector('#free-response')
    .addEventListener('change', renderFreeResponseForm);

  editPackDiv
    .querySelector('#multiple-choice')
    .addEventListener('change', renderMultipleChoiceForm);
}

function renderFreeResponseForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  cardForm.innerHTML = `
    <form>
      <input type="hidden" name="is_multi" value="false" />

      <label for="question">Question</label>
      <input type="text" name="question" />

      <label for="answer">answer</label>
      <input type="text" name="answer" />
    </form>
  `;
  cardForm.addEventListener('submit', createCard);
}

function renderMultipleChoiceForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  cardForm.innerHTML = `
  <form>
    <input type="hidden" name="is_multi" value="true" />
    <label for="question">Queston</label>
    <input type="text" name="queston" />
    <label for="question">Queston</label>
    <input type="text" name="queston" />
    <label for="options">Options:</label>
    <input type="text" name="option" />
  </form>
  <button>➕</button>
  `;
  cardForm
    .querySelector('button')
    .addEventListener('click', () => addQuestionField(cardForm));
}

function addQuestionField(cardForm) {
  const form = cardForm.querySelector('form');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'option';
  form.appendChild(input);
}

function createCard() {}
