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
      <img src='../../backend/app/assets/images/${
        pack.image_url
      }' alt='Picture of ${pack.name.toLowerCase()}' class='deets-image'>
      <h2>${pack.name}</h2>
    </div>
    <div class="deets-preview">
      <h2>${pack.description}</h2>
      <p>Created: ${createDate} by ${pack.user.name}</p>
      <form id="start-form">
        <label>Set timer per flashcard (sec)</label>
        <div id="play">
          <input type="number" placeholder="10"/>
          <button class="pack-bttn">Start</button>
        </div>
      </form>
      <button class="pack-bttn pack-edit">Edit Pack</button>
    </div>
    <div class="pack-stats">
      <h2>Stats</h2>
      <div>
        <h3>Stats for All Users</h3>
        <p>Right: <strong>55%</strong></p>
        <p>Thought they knew it: <strong>20%</strong></p>
        <p>Wrong: <strong>25%</strong></p>
        <p>Times viewed: <strong>263</strong></p><br>
      </div>
      <div>
        <h3>Your Stats</h3>
        <p>Right: <strong>60%</strong></p>
        <p>Thought I knew it: <strong>30%</strong></p>
        <p>Wrong: <strong>10%</strong></p>
        <p>Times viewed: <strong>15</strong></p>
      </div>
    </div>
  </div>
  `;
}
