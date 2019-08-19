function renderPackPage(packId) {
  fetchPack(packId);
}

function fetchPack(id) {
  return fetch(`http://localhost:3000/packs/${id}`)
    .then(resp => resp.json())
    .then(renderPackDeets);
}

function renderPackDeets(pack) {
  const packPageConatiner = document.getElementById('pack-show-page');
  console.log(pack);
  const createDate = new Date(pack.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  packPageConatiner.innerHTML = `
  <div class="deets">
  <img src='../../backend/app/assets/images/${pack.image_url}' alt='Picture of ${pack.name}'>
    <h2>${pack.name}</h2>
    <p>${pack.description}</p>
    <p>Created: ${createDate} by ${pack.user.name}</p>
  </div>
  <div class="preview">
    ${pack.cards[0].question}
    <form id="start-form">
      <label>Set timer per flashcard (sec)</label>
      <input type="number" placeholder="10"/>
      <button>🚗 Start</button>
    </form>
  </div>
  <div class="play">

  </div>
  <div class="stats"></div>
  `;
}
