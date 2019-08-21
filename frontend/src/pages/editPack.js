function renderEditPackPage(packId) {
  fetchPack(packId).then(pack => {
    const editPackDiv = document.querySelector('#pack-edit-page');
    editPackDiv.innerHTML = `
      <div class="pack-edit-page-container">
      <h2>Edit ${pack.name} Pack</h2>
        <div class="edit-header">
          <img 
            src='${pack.image_url}' 
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
              <div>
                <button type="submit" class="btn-primary">Update Pack 🤙</button>
                <button id="delete-pack" class="btn-primary">Delete Pack 🗑</button>
              </div>
              </form>
          </div>
        <hr />
        <h2>Cards</h2>
        <div class="cards-container"></div>
        <div class="edit-card-form"></div>
        <hr />
        <div class="add-cards-container" id="${packId}">
          <h2>Add Cards</h2>
            <p>Select a card type:</p>
            <div class="new-card-type">
              <label>Free Response</label>
              <label>Multiple Choice</label>
              <input
                id="free-response"
                type="radio"
                name="form-type"
                value="free-response"
              />
              <input
                id="multiple-choice"
                type="radio"
                name="form-type"
                value="multiple-choice"
              />
            </div>
            <div id="card-form"></div>
          <div>
        <div>
    `;
    editPackDiv
      .querySelector('form')
      .addEventListener('submit', e => editPack(e, pack));

    editPackDiv
      .querySelector('#delete-pack')
      .addEventListener('click', e => deletePack(e, pack));

    editPackDiv
      .querySelector('#free-response')
      .addEventListener('change', renderFreeResponseForm);

    editPackDiv
      .querySelector('#multiple-choice')
      .addEventListener('change', renderMultipleChoiceForm);

    editPackDiv.querySelector('#free-response').click();

    renderCards(packId);
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

function deletePack(e, pack) {
  console.log('deleting pack');
  let result = confirm('Are you sure you want to delete this pack?');
  if (result) {
    fetch(`http://localhost:3000/packs/${pack.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(() => {
      fetchPacks();
      switchPage('home-page');
    });
  }
}

function renderCards(packId) {
  fetchPack(packId).then(pack => {
    const cardsDiv = document.querySelector('.cards-container');
    cardsDiv.innerHTML = ``;
    if (pack.cards.length > 0) {
      pack.cards.forEach(card => {
        cardsDiv.appendChild(renderCard(card));
      });
    } else {
      const noCardsText = document.createElement('p');
      noCardsText.innerText = ` ⬇️ Add some cards to this pack below ⬇️`;
      cardsDiv.appendChild(noCardsText);
    }
  });
}

function renderCard(card) {
  const cardEl = document.createElement('div');
  card.id = `card-${card.id}`;
  cardEl.classList.add('card');
  cardEl.innerHTML = `
    <p>${card.question}</p>
    <hr />
    <p>${card.answer}</p>
  `;
  if (card.is_multi) {
    cardEl.addEventListener('click', () => renderEditMultiCardForm(card));
  } else {
    cardEl.addEventListener('click', () => renderEditFreeCardForm(card));
  }
  return cardEl;
}

function renderEditMultiCardForm(card) {
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
      <button id="delete-button" class="btn-primary">Delete Card 🗑</button>
    </div>
  </form>
  `;
  cardEditForm
    .querySelector('#cancel-button')
    .addEventListener('click', clearEditForm);

  cardEditForm
    .querySelector('form')
    .addEventListener('submit', e => updateMultiCard(e, card));
}

function updateMultiCard(e, card) {
  e.preventDefault();
  cardId = parseInt(card.id.split('-')[1], 10);
  fetch(`http://localhost:3000/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      cards: {
        question: e.target[1].value,
        answer: e.target[2].value,
        options: e.target[3].value,
      },
    }),
  })
    .then(res => res.json())
    .then(card => {
      renderCards(card.pack_id);
      e.target[1].value = card.question;
      e.target[2].value = card.answer;
      e.target[3].value = card.options;
    });
}

function renderEditFreeCardForm(card) {
  const cardEditForm = document.querySelector('.edit-card-form');
  cardEditForm.innerHTML = ``;
  cardEditForm.innerHTML = `
    <form class="edit-pack-form">
      <input type="hidden" name="is_multi" value="true" />
      <label for="question">Queston</label>
      <input type="text" name="queston" value="${card.question}" />
      <label for="answer">Answer</label>
      <input type="text" name="answer" value="${card.answer}" />
      <div>
        <button class="btn-primary">Update Card 🃏</button>
        <button id="cancel-button" class="btn-primary">Cancel ❌</button>
        <button id="delete-button" class="btn-primary">Delete Card 🗑</button>
      </div>
    </form>
    `;

  cardEditForm
    .querySelector('#cancel-button')
    .addEventListener('click', clearEditForm);

  cardEditForm
    .querySelector('form')
    .addEventListener('submit', e => updateFreeCard(e, card));
}

function updateFreeCard(e, card) {
  e.preventDefault();
  cardId = parseInt(card.id.split('-')[1], 10);
  fetch(`http://localhost:3000/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      cards: {
        question: e.target[1].value,
        answer: e.target[2].value,
      },
    }),
  })
    .then(res => res.json())
    .then(card => {
      renderCards(card.pack_id);
      e.target[1].value = card.question;
      e.target[2].value = card.answer;
    });
}

function deleteCard(e, card) {}

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
      <input type="text" name="question" placeholder="Question" />

      <label for="answer">Answer</label>
      <input type="text" name="answer" placeholder="Answer"/>

      <button type="submit" class="btn-primary">Add Card</button>
    </form>
  `;
  cardForm.addEventListener('submit', createFreeResponseCard);
}

function renderMultipleChoiceForm() {
  const cardForm = document.querySelector('#card-form');
  cardForm.innerHTML = ``;
  cardForm.innerHTML = `
  <form class="new-card-form">
    <input type="hidden" name="is_multi" value="true" />
    <label for="question">Queston</label>
    <input type="text" name="queston" placeholder="Question"/>
    <label for="question">Answer</label>
    <input type="text" name="answer" placeholder="Answer"/>
    <label for="options">Options</label>
    <input type="text" name="option" placeholder="Options | Separeted | By | Pipe"/>
    <button type="submit" class="btn-primary">Add Card</button>
  </form>
  `;
  cardForm.addEventListener('submit', createMultiCard);
}

function createMultiCard(e) {
  e.preventDefault();
  packId = document.querySelector('.add-cards-container').id;
  fetch('http://localhost:3000/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      cards: {
        is_multi: e.target[0].value,
        question: e.target[1].value,
        answer: e.target[2].value,
        options: e.target[3].value,
        pack_id: packId,
      },
    }),
  })
    .then(res => res.json())
    .then(card => {
      renderCards(card.pack_id);
      e.target[1].value = ``;
      e.target[2].value = ``;
      e.target[3].value = ``;
    });
}

function createFreeResponseCard(e) {
  e.preventDefault();
  packId = document.querySelector('.add-cards-container').id;
  fetch('http://localhost:3000/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      cards: {
        is_multi: e.target[0].value,
        question: e.target[1].value,
        answer: e.target[2].value,
        pack_id: packId,
      },
    }),
  })
    .then(res => res.json())
    .then(card => {
      renderCards(card.pack_id);
      e.target[1].value = ``;
      e.target[2].value = ``;
    });
}
