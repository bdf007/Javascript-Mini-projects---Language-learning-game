let questions = [
  {
    title: "chat",
    alternatives: ["dog", "cat", "bird", "fish"],
    correctAnswer: 1,
  },
  {
    title: "oiseau",
    alternatives: ["mouse", "hamster", "lizard", "bird"],
    correctAnswer: 3,
  },
  {
    title: "requin",
    alternatives: ["cat", "fish", "rat", "shark"],
    correctAnswer: 3,
  },
  {
    title: "poisson",
    alternatives: ["fly", "puma", "fish", "dog"],
    correctAnswer: 2,
  },
];

let app = {
  start: function () {
    this.score = 0;
    this.currPosition = 0;
    // get alternatives
    let alts = document.querySelectorAll(".alternative");
    // old methods with bind
    //         alts.forEach(function(element, index){
    //             console.log(this);
    //
    //             element.addEventListener('click', function(){
    //                 // check correct answer
    //                 this.checkAnswer(index);
    //             }.bind(this));
    //         }.bind(this));

    alts.forEach((element, index) => {
      element.addEventListener("click", () => {
        // check correct answer
        this.checkAnswer(index);
      });
    });

    //refresh the stats
    this.updateStats();

    // show first question
    this.showQuestion(questions[this.currPosition]);
  },

  showQuestion: function (q) {
    // keep track of the current question

    // show question title
    let titleDiv = document.getElementById("title");
    titleDiv.textContent = q.title;

    // show alternatives
    let alts = document.querySelectorAll(".alternative");

    alts.forEach(function (element, index) {
      element.textContent = q.alternatives[index];
    });
  },

  checkAnswer: function (userSelected) {
    let currQuestion = questions[this.currPosition];
    if (currQuestion.correctAnswer == userSelected) {
      // correct
      this.score++;
      this.showResult(true);
      console.log("correct");
    } else {
      // not correct
      this.showResult(false);
      console.log("wrong");
    }

    //refresh the stats
    this.updateStats();

    // increase position
    this.increasePosition();

    // show next question
    this.showQuestion(questions[this.currPosition]);
  },

  increasePosition: function () {
    this.currPosition++;

    if (this.currPosition == questions.length) {
      this.currPosition = 0;
    }
  },

  updateStats: function () {
    let scoreDiv = document.getElementById("score");
    scoreDiv.textContent = `your score : ${this.score}`;
  },

  showResult: function (isCorrect) {
    let resultDiv = document.getElementById("result");
    let result = "";

    // checks
    if (isCorrect) {
      result = "Correct Answer!";
    } else {
      // get the current question
      let currQuestion = questions[this.currPosition];

      // get correct answer (index)
      let correctAnswerIndex = currQuestion.correctAnswer;

      // get correct answer (text)
      let correctAnswerText = currQuestion.alternatives[correctAnswerIndex];
      result = `Wrong Answer! The correct answer was "${correctAnswerText}"`;
    }

    resultDiv.textContent = result;
  },
};

app.start();
