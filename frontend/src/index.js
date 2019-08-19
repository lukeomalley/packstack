let currentUser;

document.addEventListener('DOMContentLoaded', () => {
  currentUser = null;
  fetchPacks();
  renderHeader();

  const loginButton = document.querySelector('#modal_opener');
  loginButton.addEventListener('click', () => toggleModal('login'));

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', loginUser);

  const profileForm = document.getElementById('profile-form');
  profileForm.addEventListener('submit', editUser);
  // profileForm.querySelector("#edit-name").value = currentUser.name
  // profileForm.querySelector("#edit-url").value = currentUser.image_url
});

function switchPage(pageId) {
  // Switches the display property of the page passed in to block
  // all other pages get set to display none
  const pages = ['home-page', 'pack-show-page', 'pack-new-page', 'user-page'];
  pages.forEach(page => {
    document.getElementById(page).style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

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
  toggleModal('login');
}

function logoutUser() {
  currentUser = null;
  renderHeader();
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
          <a>
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
  pageHeader
    .querySelector('a')
    .addEventListener('click', () => switchPage('home-page'));
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
    const statsLink = document.createElement('li');
    const profileLink = document.createElement('li');
    const logoutLink = document.createElement('li');

    homeLink.innerText = `Home`;
    newPackLink.innerText = `New Pack`;
    statsLink.innerText = `Stats`;
    profileLink.innerText = `Profile`;
    logoutLink.innerText = `Logout`;

    homeLink.addEventListener('click', renderHomePage);
    newPackLink.addEventListener('click', e => {
      switchPage('pack-new-page');
      renderNewPackPage();
    });
    statsLink.addEventListener('click', e => {
      switchPage('stats-page');
      renderStatsPage();
    });
    profileLink.addEventListener('click', () => toggleModal('profile'));
    logoutLink.addEventListener('click', logoutUser);

    navUl.appendChild(homeLink);
    navUl.appendChild(newPackLink);
    navUl.appendChild(statsLink);
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

function renderStatsPage() {
  console.log("stats page here!")
}

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
            <h5>by ${pack.user.name}</h5>
        </div>
        `;
  packDiv.addEventListener('click', e => {
    switchPage('pack-show-page');
    renderPackPage(packDiv.dataset.id);
  });
  packsDiv.appendChild(packDiv);
}

// MODAL //
function attachModalListeners(modalEl, modalChoice) {
  modalEl
    .querySelector('.close_modal')
    .addEventListener('click', () => toggleModal(modalChoice));
  modalEl
    .querySelector('.overlay')
    .addEventListener('click', () => toggleModal(modalChoice));
}

function detachModalListeners(modalEl, modalChoice) {
  modalEl
    .querySelector('.close_modal')
    .removeEventListener('click', () => toggleModal(modalChoice));
  modalEl
    .querySelector('.overlay')
    .removeEventListener('click', () => toggleModal(modalChoice));
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

// EDIT USER //
function editUser(e){
  e.preventDefault()
  const userData = {
      user: {
      name: e.target[0].value,
      image_url: e.target[1].value
    }
  };
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(userData)
  };
  fetch("http://localhost:3000/users/73", configObj)
  // fetch(`http://localhost:3000/users/${currentUser.id}`, configObj)
    .then(resp => resp.json())
    .catch(function(error) {
      alert("Invalid user info. Try again.");
    });  
}