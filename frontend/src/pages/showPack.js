function renderPackPage(packId) {
  fetchPack(packId).then(renderPackDeets);
}

function fetchPack(id) {
  return fetch(`http://localhost:3000/packs/${id}`).then(resp => resp.json());
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
        <img src='${
          pack.image_url
        }' alt='Picture of ${pack.name}' class='deets-image'>
        <h2>${pack.name}</h2>
      </div>
      <div class="deets-preview">
        <h2>${pack.description}</h2>
        <p>Created: ${createDate} by ${pack.user.name}</p>
        <button id="start-bttn" class="pack-bttn">Start</button>
        <button class="pack-bttn pack-edit">Edit Pack</button>
      </div>
      <div id="pack-stats" class="pack-stats">
        <h2>Stats</h2>
        <div>
          <h3>Stats for All Users</h3>
          <p>Right: <strong>55%</strong></p>
          <p>Thought they knew it: <strong>20%</strong></p>
          <p>Wrong: <strong>25%</strong></p>
          <p>Times viewed: <strong>263</strong></p><br>
        </div>
        <div id="pack-page-your-stats-div"></div>
      </div>
    </div>
  `;
  const yourStatsHTML = `
    <h3>Your Stats</h3>
    <p>Right: <strong>60%</strong></p>
    <p>Thought I knew it: <strong>30%</strong></p>
    <p>Wrong: <strong>10%</strong></p>
    <p>Times viewed: <strong>15</strong></p>
  `;
  if (!!currentUser){
    document.getElementById("pack-page-your-stats-div").innerHTML = yourStatsHTML
  };
  packPageConatiner
    .querySelector('.pack-edit')
    .addEventListener('click', () => {
      if (!!currentUser){
        switchPage('pack-edit-page');
        renderEditPackPage(pack.id);
      } else {
        toggleModal('login')
      }
    });
  document
    .getElementById('start-bttn')
    .addEventListener('click', e => packPlay(e, pack));
}
