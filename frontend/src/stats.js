function renderStatsPage() {
  const statsPage = document.querySelector('#stats-page');
  statsPage.innerHTML = `
    <h1>Global Stats</h1>
    <div class="stats-table">
      <div>
        <div class="table-cell heading-cell">Category</div>
        <div class="table-cell">Total correct card views</div>
        <div class="table-cell">Total "thought they knew" card views</div>
        <div class="table-cell">Total wrong card views</div>
        <div class="table-cell">Total card views</div>
      </div>
      <div>
        <div class="table-cell heading-cell stat-cell">Stat</div> 
        <div class="table-cell stat-cell">55%</div> 
        <div class="table-cell stat-cell">20%</div> 
        <div class="table-cell stat-cell">25%</div> 
        <div class="table-cell stat-cell">4938</div> 
      </div>
    </div>
    <h1>Your Stats</h1>
    <div class="stats-table">
      <div>
        <div class="table-cell heading-cell">Category</div>
        <div class="table-cell">Your correct card views</div>
        <div class="table-cell">Your "thought you knew" card views</div>
        <div class="table-cell">Your wrong card views</div>
        <div class="table-cell">Your card views</div>
      </div>
      <div>
        <div class="table-cell heading-cell stat-cell">Stat</div> 
        <div class="table-cell stat-cell">60%</div>
        <div class="table-cell stat-cell">30%</div> 
        <div class="table-cell stat-cell">10%</div> 
        <div class="table-cell stat-cell">438</div> 
      </div>
    </div>
  `;
}