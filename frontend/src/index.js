let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  fetchPacks();
  renderHeader();

  const loginButton = document.querySelector('#modal_opener');
  loginButton.addEventListener('click', toggleModal);

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', loginUser);
});

function toggleNav() {
  const navUl = document.querySelector('.nav-links');
  if (navUl.classList.contains('show-nav')) {
    navUl.classList.remove('show-nav');
  } else if (navUl.classList.contains('show-small-nav')) {
    navUl.classList.remove('show-small-nav');
  } else {
    currentUser
      ? navUl.classList.add('show-nav')
      : navUl.classList.add('show-small-nav');
  }
}

function loginUser(e) {
  e.preventDefault();
  currentUser = e.target[0].value;
  renderHeader();
  const closeModal = document.querySelector('.close_modal');
  closeModal.click();
}

function logoutUser() {
  currentUser = null;
  renderHeader();
}

function renderHeader() {
  const body = document.querySelector('body');
  const oldHeader = document.querySelector('header');
  if (oldHeader) {
    oldHeader.remove();
  }
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
        <ul class="nav-links">
        </ul>
      </div>
    </nav>
  `;
  pageHeader.querySelector('button').addEventListener('click', toggleNav);
  body.prepend(pageHeader);
  renderNavLinks();
}

function renderNavLinks() {
  const navUl = document.querySelector('.nav-links');
  if (currentUser) {
    const homeLink = document.createElement('li');
    const newPackLink = document.createElement('li');
    const profileLink = document.createElement('li');
    const logoutLink = document.createElement('li');

    homeLink.innerText = `Home`;
    newPackLink.innerText = `New Pack`;
    profileLink.innerText = `Profile`;
    logoutLink.innerText = `Logout`;

    homeLink.addEventListener('click', renderHomePage);
    newPackLink.addEventListener('click', renderNewPackPage);
    profileLink.addEventListener('click', renderProfilePage);
    logoutLink.addEventListener('click', logoutUser);

    navUl.appendChild(homeLink);
    navUl.appendChild(newPackLink);
    navUl.appendChild(profileLink);
    navUl.appendChild(logoutLink);
  } else {
    const loginLink = document.createElement('li');
    loginLink.innerText = `Login`;
    loginLink.id = 'modal_opener';
    navUl.appendChild(loginLink);
  }
}

function renderHomePage() {}
function renderLoginPage() {}
function renderProfilePage() {}
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
        <img src='../../backend/app/assets/images/${
          pack.image_url
        }' alt='Picture of ${pack.name}'>
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

// modal

function attachModalListeners(modalEl) {
  modalEl.querySelector('.close_modal').addEventListener('click', toggleModal);
  modalEl.querySelector('.overlay').addEventListener('click', toggleModal);
}

function detachModalListeners(modalEl) {
  modalEl
    .querySelector('.close_modal')
    .removeEventListener('click', toggleModal);
  modalEl.querySelector('.overlay').removeEventListener('click', toggleModal);
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  let currentState = modal.style.display;

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block';
    attachModalListeners(modal);
  } else {
    modal.style.display = 'none';
    detachModalListeners(modal);
  }
}
