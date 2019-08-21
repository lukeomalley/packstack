let currentUser;

document.addEventListener('DOMContentLoaded', () => {
  currentUser = null;
  renderHeader();
  renderFilters();
  fetchPacks();

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', loginUser);

  document.getElementById('profile-form').addEventListener('submit', editUser);

  renderLoginOptions();
  document.getElementById('login-form').addEventListener('submit', loginUser);
});

function switchPage(pageId) {
  // switches the visible page to the one passed in
  const pages = [
    'home-page',
    'pack-show-page',
    'pack-new-page',
    'pack-edit-page',
    'pack-play-page',
    'stats-page',
  ];
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

function fetchAllUsers() {
  return fetch('http://localhost:3000/users').then(res => res.json());
}

function renderLoginOptions() {
  const userSelect = document.querySelector('#login-form select');
  userSelect.innerHTML = '';
  fetchAllUsers().then(users => {
    users.map(user => {
      const userOpt = document.createElement('option');
      userOpt.value = user.id;
      userOpt.innerText = user.name;
      userSelect.appendChild(userOpt);
    });
  });
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
            PACK <span>STACK</span>
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

    homeLink.addEventListener('click', () => switchPage('home-page'));
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
    const statsLink = document.createElement('li');

    statsLink.innerText = `Stats`;

    loginLink.innerText = `Login`;
    loginLink.addEventListener('click', () => toggleModal('login'));

    statsLink.addEventListener('click', e => {
      switchPage('stats-page');
      renderStatsPage();
    });

    navUl.appendChild(loginLink);
    navUl.appendChild(statsLink);
  }
}

// FILTERS //
function renderFilters() {
  const homePage = document.querySelector('#home-page');
  const filterDiv = document.createElement('div');
  filterDiv.id = 'filters';

  const userFilterEl = document.createElement('div');
  userFilterEl.innerHTML = `
    <div>
      <p>Filter by User:</p>
      <select id="user-filter" class="select-css" data-id="All">
        <option>All</option>
      </select>
    </div>
  `;
  filterDiv.appendChild(userFilterEl);

  const categoryFilterEl = document.createElement('div');
  categoryFilterEl.innerHTML = `
    <div>
      <p>Filter by Category:</p>
      <select id="category-filter" class="select-css" data-id="All">
        <option>All</option>
      </select>
    </div>
  `;
  filterDiv.appendChild(categoryFilterEl);

  homePage.prepend(filterDiv);
  renderCategoryFilterOptions();
  renderUserFilterOptions();
}

function renderCategoryFilterOptions() {
  fetch('http://localhost:3000/categories')
    .then(resp => resp.json())
    .then(categoryData => addCategorySelectOptions(categoryData.categories));
  function addCategorySelectOptions(categoryArray) {
    const categoryFilterEl = document.getElementById('category-filter');
    for (let i = 0; i < categoryArray.length; i++) {
      const categoryOptionEl = document.createElement('option');
      categoryOptionEl.value = categoryArray[i];
      categoryOptionEl.innerText = categoryArray[i];
      categoryFilterEl.appendChild(categoryOptionEl);
    }
    categoryFilterEl.addEventListener('change', e => {
      const category = e.target.value;
      const user_id = document.getElementById('user-filter').dataset.id;
      categoryFilterEl.dataset.id = category;
      fetchPacks(category, user_id);
    });
  }
}

function renderUserFilterOptions() {
  fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(userArray => addUserSelectOptions(userArray));
  function addUserSelectOptions(userArray) {
    const userFilterEl = document.getElementById('user-filter');
    userArray.forEach(user => {
      const userOptionEl = document.createElement('option');
      userOptionEl.value = user.id;
      userOptionEl.innerText = user.name;
      userFilterEl.appendChild(userOptionEl);
    });
    userFilterEl.addEventListener('change', e => {
      const category = document.getElementById('category-filter').dataset.id;
      const user_id = e.target.value;
      userFilterEl.dataset.id = user_id;
      fetchPacks(category, user_id);
    });
  }
}

// LOGIN //
function loginUser(e) {
  e.preventDefault();
  setUser(e.target[0].value);
  toggleModal('login');
}

function logoutUser() {
  currentUser = null;
  renderHeader();
}

function setUser(userId) {
  fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      currentUser = { id: user.id, name: user.name, image_url: user.image_url };
      const profileForm = document.getElementById('profile-form');
      profileForm.querySelector('#edit-name').value = currentUser.name;
      profileForm.querySelector('#edit-url').value = currentUser.image_url;
      renderHeader();
    });
}

// PACKS //
function fetchPacks(category = 'All', userId = 'All') {
  document.getElementById('packs-container').innerHTML = '';
  fetch(urlGeneratorForFetch(category, userId))
    .then(resp => resp.json())
    .then(renderPacks);
}

function urlGeneratorForFetch(category, userId) {
  if (category === 'All' && userId === 'All') {
    return 'http://localhost:3000/packs';
  } else if (category === 'All') {
    return `http://localhost:3000/packs?user_id=${userId}`;
  } else if (userId === 'All') {
    return `http://localhost:3000/packs?category=${category}`;
  } else {
    return `http://localhost:3000/packs?category=${category}&user_id=${userId}`;
  }
}

function renderPacks(packsArray) {
  document.querySelector('#packs-container').innerHTML = ``;
  packsArray.forEach(renderPack);
}

function renderPack(pack) {
  const packsDiv = document.getElementById('packs-container');
  const packDiv = document.createElement('div');
  packDiv.classList.add('pack-card');
  packDiv.dataset.id = pack.id;
  packDiv.innerHTML = `
        <img src='${pack.image_url}' alt='Picture of ${pack.name}'>
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
function editUser(e) {
  e.preventDefault();
  const userData = {
    user: {
      name: e.target[0].value,
      image_url: e.target[1].value,
    },
  };
  const configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  };
  fetch(`http://localhost:3000/users/${currentUser.id}`, configObj)
    .then(resp => resp.json())
    .then(user => {
      setUser(user.id);
      renderLoginOptions();
    })
    .catch(function(error) {
      alert('Invalid user info. Try again.');
    });
  toggleModal('profile');
}
