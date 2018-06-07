// VARIABLES FOR QUESTIONS
var myQuestions = [
    {
        question: "A forensic blood spatter analyst who lives a secret life as a vigilante serial killer. ",
        answers: [
            "Lemony Snicket",
            "Walter White",
            "Dexter Morgan",
            "Better Call Saul",
        ],
        correctAnswer: 2,
        answerGif: "assets/images/answer1.gif",
        showName: "'Dexter'"
    },
    {
        question: "Real-life comedian who created and starred in his own sitcom 'about nothing' and heavily based in a coffee shop",
        answers: [
            "Jerry Seinfeld",
            "Joe Rogan",
            "Dave Chappelle",
            "Amy Schumer",
        ],
        correctAnswer: 0,
        answerGif: "assets/images/answer2.gif",
        showName: "'Seinfeld'"
    },
    {
        question: "High-school chemistry teacher who develops lung cancer and turns drug kingpin through the production of crystal meth",
        answers: [
            "Walter White",
            "Kramer",
            "Mr. Bynes",
            "Lora Croft",
        ],
        correctAnswer: 0,
        answerGif: "assets/images/answer3.gif",
        showName: "'Breaking Bad'"
    },
    {
        question: "New York City television show that features the lives of six individuals.",
        answers: [
            "The Simpsons",
            "F.R.I.E.N.D.S",
            "Lost",
            "All in the Family",
        ],
        correctAnswer: 1,
        answerGif: "assets/images/answer4.gif",
        showName: "'F.R.I.E.N.D.S.'"
    },
    {
        question: "HBO featured television show based on the fictional novel by George R. R. Martin where humans encounter wolves, dragons, and 'white walkers'.",
        answers: [
            "Scandal",
            "House of Cards",
            "Billions",
            "Game of Thrones",
        ],
        correctAnswer: 3,
        answerGif: "assets/images/answer5.gif",
        showName: "'Game Of Thrones'"
    },
    {
        question: "A cartoon boy who is bald and has an arrow on his head that has the ability to bend water, fire, and air.",
        answers: [
            "Aang",
            "Katara",
            "Zuko",
            "Patel",
        ],
        correctAnswer: 0,
        answerGif: "assets/images/answer6.gif",
        showName: "'Avatar: The Last Airbender'"
    },
    {
        question: "A widower with a 13-year-old son, named after a famous singer, must find a way to keep his families business intact while his father is away in prison.",
        answers: [
            "Leroy Jenkins",
            "Homer Simpson",
            "Frank Underwood",
            "Michael Bluth",
        ],
        correctAnswer: 3,
        answerGif: "assets/images/answer7.gif",
        showName: "'Arrested Development'"
    },
    {
        question: "Based in a futuristic Wild-West amusement park, most android hosts replay plot lines while a select few fight to break the mold ",
        answers: [
            "Wild Wild West",
            "Westworld",
            "West of the Fest",
            "Wake up, Mr. West",
        ],
        correctAnswer: 1,
        answerGif: "assets/images/answer8.gif",
        showName: "'Westworld'"
    },
    {
        question: "The 'Twilight Zone' reinvented for the 21st Century that features twisted futuristic plots that show the darkness of technology. ",
        answers: [
            "Black Mirror",
            "Homeland",
            "Stranger Things",
            "Mr. Robot",
        ],
        correctAnswer: 0,
        answerGif: "assets/images/answer9.gif",
        showName: "'Black Mirror'"
    },
    {
        question: "A young and talented actor living in L.A. with his closest friends and brother tries to make it big and bring everyone along with him. ",
        answers: [
            "House",
            "All in the Family",
            "Entourage",
            "Mad Men",
        ],
        correctAnswer: 2,
        answerGif: "assets/images/answer10.gif",
        showName: "'Entourage'"
    },
]

var currentQuestion;
var goodAnswer;
var incorrectAnswer;
var wins;
var losses;
var seconds;
var time;
var answerPicked;
var userChoice;
var thisGif;
var theAnswer;
var questionHolder;
var eachAnswer;

var messages = {
    correct: "That is the right answer!",
    incorrect: "Sorry, that is incorrect. You should probably go watch the show...",
    timeUp: "You are out of time",
    end: "Lets see how you did!"

}
    
var nextQuestion = {
    time: 3,

    start: function() {
        delay = setInterval(nextQuestion.count, 1000);
        setTimeout (function(newQuestion) {
            clearInterval(delay);
            // newQuestion();
        }, 1000*3)
    },

    count: function() {
        nextQuestion.time--;
    },

    reset: function() {
        nextQuestion.time = 3;
    }
}

//TIMER
function countDown() {
    seconds = 10;
    $("#timer").html("<h2 class='animated bounceInUp'>TIME REMAINING: " + seconds + "</h2>");
    answerPicked = false;
    time = setInterval(showCountdown, 1000);
}

function resetCountDown() {
    countDown();
}

function showCountdown() {
    seconds--;
    $("#timer").html("<h2>TIME REMAINING: " + seconds + "</h2>");
    if(seconds < 1){
        unanswered++;
        clearInterval(time);
        uAnswer();
     }
}

// CLEAR ALL STATS
function startQuiz() {
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    currentQuestion = 0;
    unanswered = 0;
    wins = 0;
    losses = 0;
}
// SELECT NEW RANDOM QUESTION
function newQuestion() {

    goodAnswer = false;

    clearInterval(time);

    $("#messages").html("");
    $("#results").html("");
    $("#currentQuestion").empty();

    var randomNumber = Math.floor(Math.random()*myQuestions.length);
    var randomQuestion = myQuestions[randomNumber];
    myQuestions[randomNumber] = myQuestions[0];
    console.log(myQuestions);
    myQuestions.shift();
    goodAnswer = false;
    console.log(myQuestions);
    console.log(myQuestions.length);

    if (myQuestions.length === 0) {
        clearInterval(time);
        $("#timer").empty();
        finalDisplay();
        return;
    }

    countDown();
    
    //HOLD THE QUESTION & ANSWER
    questionHolder = $("<div>");
    questionHolder.addClass("questionHolderClass animated bounceInUp");
    questionHolder.attr("rightAnswer", randomQuestion.correctAnswer);
    questionHolder.attr("answerInWords", randomQuestion.answers[randomQuestion.correctAnswer]);
    questionHolder.attr("answerGifPath", randomQuestion.answerGif);
    questionHolder.attr("answerShowName", randomQuestion.showName);
    questionHolder.append(randomQuestion.question);

    $("#currentQuestion").html(questionHolder);

    // SETS UP ANSWERS FOR EACH QUESTION
    for (var i=0; i<randomQuestion.answers.length; i++) {
        console.log(randomQuestion.answers);
        eachAnswer = $("<div>");
        eachAnswer.addClass("answerChoices animated bounceInUp");
        eachAnswer.attr("thisAnswer", [i]);
        eachAnswer.append(randomQuestion.answers[i]);
        $("#currentQuestion").append(eachAnswer);
    }

}

function zAnswer() {
    wins++;
    $("#currentQuestion").empty();

    var addText = $("<h3 class='animated fadeInUp'>").text("YOU ARE CORRECT! GOOD JOB.")
    var addGif = $("<img class='animated fadeInUp' src=" + questionHolder.attr("answerGifPath") + ">");
    
    $("#currentQuestion").append(addText);
    $("#currentQuestion").append(addGif);

    console.log("Wins: " + wins);
    console.log("Losses: " + losses);

    setTimeout(newQuestion, 3 * 1000);

}
    
function xAnswer() {
    losses++;
    $("#currentQuestion").empty();
    
    var addText = $("<h3 class='animated fadeInUp'>").text("Sorry, you are incorrect! You should go check out " + questionHolder.attr("answerShowName") + ".")
    // var addGif = $("<img src=" + questionHolder.attr("answerGifPath") + ">");
    
    $("#currentQuestion").append(addText);

    console.log("Wins: " + wins);
    console.log("Losses: " + losses);

    setTimeout(newQuestion, 3 * 1000);

}

function uAnswer() {
    losses++;
    $("#currentQuestion").empty();
    
    var addText = $("<h3 class='animated fadeInUp'>").text("Sorry, you are out of time! The correct answer is " + questionHolder.attr("answerInWords") + ".")
    // var addGif = $("<img src=" + questionHolder.attr("answerGifPath") + ">");
    
    $("#currentQuestion").append(addText);

    console.log("Wins: " + wins);
    console.log("Losses: " + losses);

    setTimeout(newQuestion, 3 * 1000);

}

function finalDisplay() {
    var showWins = $("<h3>").text("Correct Answers: " + wins + "");
    var showLosses = $("<h3>").text("Incorrect Answers: " + losses + "");
    var showUnanswered = $("<h3>").text("Unanswered Questions: " + unanswered + "");
    var score = (wins/10)*100;
    var showScore = $("<h3>").text("Your score: " + score + "%");

    $("#currentQuestion").append(showWins);
    $("#currentQuestion").append(showLosses);
    $("#currentQuestion").append(showScore);

    return;

}

    // DETECT WHICH ANSWER IS SELECTED BY USER
$("body").on("click", ".answerChoices", function() {
    clearInterval(time);
    
    userChoice = $(this).attr("thisAnswer");
    theAnswer = parseInt(($(".questionHolderClass").attr("rightAnswer")));
    thisGif = $(".questionHolderClass").attr("answerGifPath");
    
    console.log(userChoice);
    console.log(theAnswer);
    console.log(thisGif);
    
    console.log("The answer is " + theAnswer);
    
    if (userChoice == theAnswer) {
        console.log("KEEP GOING");
        zAnswer();
    } else (xAnswer())

});

// START GAME WHEN BUTTON IS CLICKED
$("body").on("click", ".startButton", function() {
    console.log("ready");

    $(".startButton").hide();
    $("#timer").show();

    startQuiz();
    newQuestion();
    
});


//TODO: 
//NEED TO ADD CSS
//NEED TO CLEAN UP BUGS