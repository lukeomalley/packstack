function renderEditPackPage(packId) {
  fetchPack(packId).then(pack => {
    const editPackDiv = document.querySelector('#pack-edit-page');
    console.log(pack);
    editPackDiv.innerHTML = `
      <div class="pack-edit-page-container">
      <h2>Edit ${pack.name} Pack</h2>
        <div class="edit-header">
          <img 
            src='../../backend/app/assets/images/${pack.image_url}' 
            alt='Picture of ${pack.name.toLowerCase()}' 
          />
          <form class="edit-pack-form">
            <label for="name">Name </label>
            <input
              type="text"
              name="name"
              placeholder="Pack Name"
              value="${pack.name}"
              required
            />
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value="${pack.description}"
              required
            />
            <label for="image_url">Image URL</label>
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value="${pack.image_url}"
              required
            />
            <label for="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value="${pack.category}"
              required
            />
            <button class="btn-primary">Update Pack 🤙</button>
          </form>
          </div>
        <hr />
        <h2>Cards</h2>
        <div class="cards-container"></div>
        <div class="edit-card-form"></div>
        <hr />
        <div class="add-cards-container">
          <h2>Add Cards</h2>
            <p>Select a card type:</p>
            <div>
            <label style="margin-right: 20px;">Free Response</label>
            <label style="margin-left: 20px;">Multiple</label>
            </div>
            <div>
            <input
              id="free-response"
              type="radio"
              name="form-type"
              value="free-response"
              style="margin-right: 10px;"
            />
            <input
              id="multiple-choice"
              type="radio"
              name="form-type"
              value="multiple-choice"
              style="margin-left: 100px;"
            />
            </div>
            <div id="card-form"></div>
          <div>
        <div>
    `;

    editPackDiv
      .querySelector('form')
      .addEventListener('submit', e => editPack(e, pack));

    const cardsDiv = editPackDiv.querySelector('.cards-container');
    if (pack.cards.length > 0) {
      pack.cards.forEach(card => {
        cardsDiv.appendChild(renderCard(card));
      });
    } else {
      const noCardsText = document.createElement('p');
      noCardsText.innerText = ` ⬇️ Add some cards to this pack below ⬇️`;
      cardsDiv.appendChild(noCardsText);
    }

    editPackDiv
      .querySelector('#free-response')
      .addEventListener('change', renderFreeResponseForm);

    editPackDiv
      .querySelector('#multiple-choice')
      .addEventListener('change', renderMultipleChoiceForm);

    editPackDiv.querySelector('#free-response').click();
  });
}

function editPack(e, pack) {
  e.preventDefault();
  fetch(`http://localhost:3000/packs/${pack.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      packs: {
        name: e.target[0].value,
        description: e.target[1].value,
        image_url: e.target[2].value,
        category: e.target[3].value,
      },
    }),
  })
    .then(res => res.json())
    .then(pack => {
      switchPage('pack-edit-page');
      renderEditPackPage(pack.id);
      fetchPacks();
    });
}

function renderCard(card) {
  const cardEl = document.createElement('div');
  card.id = `card-${card.id}`;
  cardEl.classList.add('card');
  cardEl.innerHTML = `
    <h5>${card.question}</h5>
    <hr />
    <p>${card.answer}</p>
  `;
  cardEl.addEventListener('click', () => renderEditCardForm(card));
  return cardEl;
}

function updateCard(card) {}

function renderEditCardForm(card) {
  const cardEditForm = document.querySelector('.edit-card-form');
  cardEditForm.innerHTML = ``;
  cardEditForm.innerHTML = `
  <form class="edit-pack-form">
    <input type="hidden" name="is_multi" value="true" />
    <label for="question">Queston</label>
    <input type="text" name="queston" value="${card.question}" />
    <label for="answer">Answer</label>
    <input type="text" name="answer" value="${card.answer}" />
    <label for="options">Options</label>
    <input type="text" name="option" value="${card.options}" />
    <div>
      <button class="btn-primary">Update Card 🃏</button>
      <button id="cancel-button" class="btn-primary">Cancel ❌</button>
    </div>
  </form>
  `;

  cardEditForm
    .querySelector('#cancel-button')
    .addEventListener('click', clearEditForm);
}

function clearEditForm() {
  const cardEditForm = document.querySelector('.edit-card-form');
  cardEditForm.innerHTML = ``;
}

function renderFreeResponseForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  cardForm.innerHTML = `
    <form class="new-card-form">
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
  <form class="new-card-form">
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
