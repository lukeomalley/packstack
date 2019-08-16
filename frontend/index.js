document.addEventListener('DOMContentLoaded', () => {
  console.log('yo.');
  fetchPacks();
});
function fetchPacks() {
  fetch('http://localhost:3000/packs')
    .then(resp => resp.json())
    .then(packsArray => renderPacks(packsArray));
}
function renderPacks(packsArray) {
  packsArray.forEach(renderPack);
}
function renderPack(pack) {
  const packsDiv = document.getElementById('packs-container');
  const packDiv = document.createElement('div');
  packDiv.classList.add('pack-card');
  packDiv.innerHTML = `
        <img src=${pack.image_url}>
        <div>
            <h2>${pack.name}</h2>
            <h3>${pack.category}</h3>
            <h3>${pack.user.name}</h3>
        </div>
        `;
  packsDiv.appendChild(packDiv);
}
