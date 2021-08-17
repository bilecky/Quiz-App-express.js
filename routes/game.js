function gameRoutes(app) {
  let goodAnswers = 0;
  let callToAfriend = false;
  let isGameOver = false;
  let questionToTheCrowdUsed = false;
  let halfByhalf = false;
  let callToAFriendUsed = false;
  let halfByhalfUsed = false;

  const questions = [
    {
      question: "Jaki jest najlepszy jezyk?",
      answers: ["c++", "fortran", "javascript", "java"],
      correctAnswer: 2,
    },
    {
      question: "test2",
      answers: ["nie", "tak", "test2", "test3"],
      correctAnswer: 1,
    },
    {
      question: "a",
      answers: ["a", "b", "c", "d"],
      correctAnswer: 3,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({ winner: true });
    } else if (isGameOver) {
      res.json({ loser: true });
    } else {
      const nextQuestion = questions[goodAnswers];

      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({ loser: true });
    }

    const { index } = req.params;

    console.log(index);

    const question = questions[goodAnswers];

    const isGoodAnswer =
      question.correctAnswer === Number(index) ? true : false;

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }
    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    });
    // if (question.correctAnswer === Number(index)) {
    //   res.json({ correct: true });
    // } else {
    //   res.json({ correct: false });
    // }
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "kolo zostalo wykorzystane",
      });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;

    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `mysle ze odpowiedz to ${question.answers[question.correctAnswer]}`
        : "i dont knot ",
    });
  });

  app.get("/help/half", (req, res) => {
    if (halfByhalfUsed) {
      return res.json({
        text: "kolo zostalo wykorzystane",
      });
    }

    halfByhalfUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter(
      (s, index) => index !== question.correctAnswer
    );
    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy,
    });
  });

  app.get("/help/crowd", (req, res) => {
    if (questionToTheCrowdUsed) {
      return res.json({
        text: "kolo zostalo wykorzystane",
      });
    }

    questionToTheCrowdUsed = true;

    chart = [10, 20, 30, 40];
    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);
      chart[i] += change;
      chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer } = question;

    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart,
    });
  });
}
module.exports = gameRoutes;
