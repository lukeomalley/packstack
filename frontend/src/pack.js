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
  const createDate = new Date(pack.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  packPageConatiner.innerHTML = `
  <div class="deets">
    <div class="deets-card">
      <img src='../../backend/app/assets/images/${pack.image_url}' alt='Picture of ${pack.name.toLowerCase()}' class='deets-image'>
      <h2>${pack.name}</h2>
    </div>
    <div class="deets-preview">
      <h2>${pack.description}</h2>
      <p>Created: ${createDate} by ${pack.user.name}</p>
      <form id="start-form">
        <label>Set timer per flashcard (sec)</label>
        <div id="start-stuff">
          <input type="number" placeholder="10"/>
          <button class="start-form-bttn">Start</button>
        </div>
      </form>
      
      <div class="play">
      
      </div>
      
      <div class="stats">
      
      </div>
    </div>
  </div>
  `;
}
