let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  fetchPacks();
  renderHeader();

  const loginButton = document.querySelector('#modal_opener');
  loginButton.addEventListener('click', () => toggleModal("login"));

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', loginUser);
});

<<<<<<< HEAD
function switchPage(e, pageId) {
  // Switches the display property of the page passed in to block
  // all other pages get set to display none
  const pages = ['home-page', 'pack-show-page', 'pack-new-page', 'user-page'];
  pages.forEach(page => {
    document.getElementById(page).style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
=======
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
  toggleModal('login')
}

function logoutUser() {
  currentUser = null;
  renderHeader();
>>>>>>> user-stuff
}

// PAGE HEADER //
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
  // Renders nav links in the header based on the user logged in status
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
<<<<<<< HEAD
    newPackLink.addEventListener('click', e => {
      switchPage(e, 'pack-new-page');
      renderNewPackPage();
    });
    profileLink.addEventListener('click', renderProfilePage);
=======
    newPackLink.addEventListener('click', renderNewPackPage);
    profileLink.addEventListener('click', () => toggleModal("profile"));
>>>>>>> user-stuff
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

function renderNewPackPage() {}

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

// LOGIN //
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

// PACKS //
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

// MODAL //

function switchPage(e, pageId) {
  const pages = ['home-page', 'pack-show-page', 'pack-new-page', 'user-page'];
  pages.forEach(page => {
    document.getElementById(page).style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

function attachModalListeners(modalEl, modalChoice) {
  modalEl.querySelector('.close_modal').addEventListener('click', () => toggleModal(modalChoice));
  modalEl.querySelector('.overlay').addEventListener('click', () => toggleModal(modalChoice));
}

function detachModalListeners(modalEl, modalChoice) {
  modalEl
    .querySelector('.close_modal')
    .removeEventListener('click', () => toggleModal(modalChoice));
  modalEl.querySelector('.overlay').removeEventListener('click', () => toggleModal(modalChoice));
}

function toggleModal(modalChoice) {
  const modal = document.querySelector(`.${modalChoice}.modal`);
  let currentState = modal.style.display;
  if (currentState === 'none') {
    modal.style.display = 'block';
    attachModalListeners(modal, modalChoice);
  } else {
    modal.style.display = 'none';
    detachModalListeners(modal, modalChoice);
  }
}
