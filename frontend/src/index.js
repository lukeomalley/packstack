// TODO: create renderLoginPage function
// TODO: create renderUserPage function
// TODO: create renderNewPackPage function
document.addEventListener('DOMContentLoaded', () => {
  fetchPacks();
  renderHeader();
});

function toggleNav() {
  console.log('toggle nav');
  const navButton = document.querySelector('.nav-links');
  if (navButton.classList.contains('show-nav')) {
    navButton.classList.remove('show-nav');
  } else {
    navButton.classList.add('show-nav');
  }
}

function renderHeader() {
  // TODO add click listener for toggle nav button
  // TODO add click listeners for nav list elements
  const body = document.querySelector('body');
  const pageHeader = document.createElement('header');
  pageHeader.innerHTML = `
    <nav class="navbar">
      <div class="nav-center"}>
        <div class="nav-header">
          <a href="./index.html" >
            PACK STACK
          </a>
          <button type="button" class="logo-btn" >
            <i class="material-icons logo-icon">
            format_align_right
            </i>
          </button>
        </div>
        <ul
          class="nav-links"
        >
          <li id="login">Login</li>
          <li id="profile">Profile</li>
          <li id="newPack">New Pack</li>
        </ul>
      </div>
    </nav>
  `;
  pageHeader.querySelector('button').addEventListener('click', toggleNav);
  body.prepend(pageHeader);
}

function renderLoginPage() {}
function renderUserPage() {}
function renderNewPackPage() {}

function fetchPacks() {
  fetch('http://localhost:3000/packs')
    .then(resp => resp.json())
    .then(renderPacks);
}

function renderPacks(packsArray) {
  packsArray.forEach(renderPack);
}

function renderPack(pack) {
  const packsDiv = document.getElementById('packs-container');
  const packDiv = document.createElement('div');
  packDiv.classList.add('pack-card');
  packDiv.dataset.id = pack.id;
  packDiv.innerHTML = `
        <img src='../../backend/app/assets/images/${pack.image_url}' alt='Picture of ${pack.name}'>
        <div>
            <h2>${pack.name}</h2>
            <h3>${pack.category}</h3>
            <h3>${pack.user.name}</h3>
        </div>
        `;
  packDiv.addEventListener('click', e => {
    switchPage(e, 'pack-show-page');
    renderPackPage(packDiv.dataset.id);
  });
  packsDiv.appendChild(packDiv);
}

function switchPage(e, pageId) {
  const pages = ['home-page', 'pack-show-page', 'pack-new-page', 'user-page'];

  pages.forEach(page => {
    document.getElementById(page).style.display = 'none';
  });

  document.getElementById(pageId).style.display = 'block';
}
