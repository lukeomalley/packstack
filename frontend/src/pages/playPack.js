function packPlay(e, pack){
  e.preventDefault()
  switchPage("pack-play-page")
  const packPlayConatiner = document.getElementById('pack-play-page');
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
  let currentCardNum = 0
  nextCard(pack, currentCardNum)
}

function nextCard(pack, currentCardNum){
  if (currentCardNum < pack.cards.length){
    routeByCardType(pack, currentCardNum)
  } else {
    switchPage(stats)
  };
}

function routeByCardType(pack, currentCardNum){
  let card = pack.cards[currentCardNum]
  document.getElementById("card-space").innerHTML = `
  <div class="deets-preview"> 
    <div>
      <h2>Question</h2>
      <h4>${card.question}</h4>
    </div>
    <div id="answer-options-space"></div>
  </div>
  `;
  if (!card.is_multi){
    playFreeCard(pack, currentCardNum, card);
  } else {
    playMultiCard(pack, currentCardNum, card);
  };
};

function playFreeCard(pack, currentCardNum, card){
  document.getElementById("answer-options-space").innerHTML = `
    <button id="presume-bttn" class="pack-bttn">I think know the answer</button>
    <button id="dunno-bttn" class="pack-bttn">I don't know the answer</button>
    <div id="answer"></div>
  `;
  document.getElementById("presume-bttn").addEventListener("click", () => renderFreeAnswer(pack, currentCardNum, card));
  document.getElementById("dunno-bttn").addEventListener("click", (e) => {
    renderFreeAnswer(pack, currentCardNum, card);
    recordView(e, pack, card, "wrong")
  });
};

function playMultiCard(pack, currentCardNum, card){
  let answerId = "answer-0"
  document.getElementById("answer-options-space").innerHTML = `
    <div id="answer"></div>
  `;
  card.options.split("|").forEach(option => {
    renderMultiOption(pack, currentCardNum, card, option, answerId);
    answerId = "answer-" + (1 + Number(answerId.split("-")[1]));
  });  
};

function renderMultiOption(pack, currentCardNum, card, option, answerId){
  const multiChoice = document.getElementById("answer-options-space")
  const newButton = document.createElement("button")
  newButton.name = card.id
  newButton.id = answerId
  newButton.value = option
  newButton.innerText = option
  newButton.className = "pack-bttn"
  newButton.addEventListener("click", (e) => {
    recordView(e, pack, card, e.target.value);
    renderMultiAnswer(pack, currentCardNum, card, e.target.value);
  });
  multiChoice.prepend(newButton)
}

function recordView(e, pack, card, answer){
  let computedResult;
  if (card.is_multi){
    if (answer === card.answer) {
      computedResult = "right"
    } else {
      computedResult = "wrong"
    }
  } else {
    if (answer === "wrong") {
      computedResult = "wrong"
    } else if (1) {
      computedResult = "right"
    } else {
      computedResult = "presumed"
    }
  }
  const data = {
    view: {
      result: computedResult,
      card_id: card.id,
      user_id: currentUser.id
    }
  }
  const configObject = {
    method: "POST",
    headers: {"Content-Type":"application/json",
              Accept:"application/json"},
    body: JSON.stringify(data)
  }
  fetch("http://localhost:3000/views", configObject)
  .then(resp => resp.json())
  .catch(data => alert(data.error))
}

function renderFreeAnswer(pack, currentCardNum, card) {
  document.getElementById("answer").innerHTML = `
    <h2>Answer</h2>
    <h4>${card.answer}</h4>
    <button id="right-bttn" class="pack-bttn">I knew it!</button>
    <button id="wrong-bttn" class="pack-bttn">Actually I didn't know it.</button>
  `;
  document.getElementById("right-bttn").addEventListener("click", () => nextCard(pack, ++currentCardNum));
  document.getElementById("wrong-bttn").addEventListener("click", () => nextCard(pack, ++currentCardNum));
};

function renderMultiAnswer(pack, currentCardNum, card, answerText) {
  const isCorrect = (card.answer === answerText)
  const respondRight = `<h2 class="right-ans">You're right!</h2>`
  const respondWrong = `<h2 class="wrong-ans">Maybe next time.</h2>`
  document.getElementById("answer").innerHTML = `
    <h2>Answer</h2>
    <h4>${card.answer}</h4>
    ${isCorrect ? respondRight : respondWrong}
    <button id="next" class="pack-bttn">Next Card</button>
  `;
  document.getElementById("next").addEventListener("click", () => nextCard(pack, ++currentCardNum));
};