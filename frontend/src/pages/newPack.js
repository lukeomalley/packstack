// PROBLEMS
// Images do not render because we were using local filesystem for images
// Home page needs to refetch the cards when a new card is added
// Validate the form on the js side

function renderNewPackPage() {
  const newPackDiv = document.querySelector('#pack-new-page');
  newPackDiv.innerHTML = `
    <div class="pack-new-page-container">
      <h1>Create a New Pack</h1>
      <form class="new-pack-form">
        <input type="text" name="name" placeholder="Pack Name" required/>
        <input type="text" name="description" placeholder="Description" required/>
        <input type="text" name="image_url" placeholder="Image URL" required/>
        <input type="text" name="category" placeholder="Category" required/>
        <button class="btn-primary">Continue to Add Cards ➡️</button>
      </form>
    </div>
  `;
  newPackDiv.querySelector('form').addEventListener('submit', createPack);
}

function createPack(e) {
  e.preventDefault();
  fetch('http://localhost:3000/packs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      packs: {
        name: e.target[0].value,
        description: e.target[1].value,
        image_url: e.target[2].value,
        category: e.target[3].value,
        user_id: currentUser.id,
      },
    }),
  })
    .then(res => res.json())
    .then(pack => {
      switchPage('pack-edit-page');
      renderEditPackPage(pack.id);
      fetchPacks();
    });
}
