function packPlay(e, pack){
  e.preventDefault()
  switchPage("pack-play-page")
  const packPlayConatiner = document.getElementById('pack-play-page');
  const createDate = new Date(pack.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  packPlayConatiner.innerHTML = `
    <div class="deets">
      <div class="deets-card">
        <img src='../../backend/app/assets/images/${
          pack.image_url
        }' alt='Picture of ${pack.name.toLowerCase()}' class='deets-image'>
        <h2>${pack.name}</h2>
      </div>
      <div id="card-space" class="deets-preview">
      </div>
    </div>
  `;
  const stackCount = pack.cards.length
  let currentCardNum = 0
  const cardSpace = document.getElementById("card-space")

  function playCard(currentCardNum){
    if (currentCardNum < stackCount){
      cardSpace.innerHTML = `
        <div class="deets-preview"> 
          <div>
            <h2>Question</h2>
            <h4>${pack.cards[currentCardNum].question}</h4>
          </div>
          <button id="presume-bttn" class="pack-bttn">I think know the answer</button>
          <button id="dunno-bttn" class="pack-bttn">I don't know the answer</button>
          <div id="answer"></div>
        </div>
      </div>
      `;
      document.getElementById("presume-bttn").addEventListener("click", () => renderAnswer(pack, currentCardNum));
      document.getElementById("dunno-bttn").addEventListener("click", () => renderAnswer(pack, currentCardNum));
    }
  }

  function renderAnswer(pack, currentCardNum) {
    document.getElementById("answer").innerHTML = `
      <h2>Answer</h2>
      <h4>${pack.cards[currentCardNum].answer}</h4>
      <button id="right-bttn" class="pack-bttn">I knew it!</button>
      <button id="wrong-bttn" class="pack-bttn">Actually I didn't know it.</button>
    `;
    document.getElementById("right-bttn").addEventListener("click", () => playCard(++currentCardNum));
    document.getElementById("wrong-bttn").addEventListener("click", () => playCard(++currentCardNum));   
  }

  playCard(currentCardNum)
}
