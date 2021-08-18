const question = document.querySelector("#question");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");
// function fillQuestionElements(data) {
//   question.innerText = data.question;
//   answer1.innerText = data.answers[0];
//   answer2.innerText = data.answers[1];
//   answer3.innerText = data.answers[2];
//   answer4.innerText = data.answers[3];
// }

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "YOU WIN";
    return;
  }
  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "YOU LOST";
    return;
  }

  question.innerText = data.question;

  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
    console.log(i);
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      fillQuestionElements(data);
    });
}

showNextQuestion();

const goodAnswersSpan = document.querySelector("#good-answers");

function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll(".answer-btn");
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}

const tipDiv = document.querySelector("#tip");
function handleFriendsAnswer(data) {
  tipDiv.innerText = data.text;
}

function callToAFriend() {
  fetch("/help/friend", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      //   fillQuestionElements(data);
      console.log(data);
      handleFriendsAnswer(data);
    });
}

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFriend);

function handleHalfByhalfAnswer(data) {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = "";
      }
    }
  }
}

function halfByhalf() {
  fetch("/help/half", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      //   fillQuestionElements(data);
      console.log(data);
      handleHalfByhalfAnswer(data);
    });
}

document.querySelector("#halfByhalf").addEventListener("click", halfByhalf);

function handleCrowdAnswer(data) {
    console.log(data);
  if (typeof data.text === 'string') {
       tipDiv.innerText = data.text} else {
       data.chart.forEach((percent, index) => {
           
          buttons[index].innerText = `${buttons[index].innerText}: ${percent}%` ;

        });
    }
}

function questionToTheCrowd() {
  fetch("/help/crowd", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      //   fillQuestionElements(data);
      handleCrowdAnswer(data);
    });
}

document
  .querySelector("#questionToTheCrowdUsed")
  .addEventListener("click", questionToTheCrowd);
