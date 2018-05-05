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
        answerGif: "assets/images/answer1.gif"
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
        answerGif: "assets/images/answer2.gif"
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
        answerGif: "assets/images/answer3.gif"
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
        answerGif: "assets/images/answer4.gif"
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
        answerGif: "assets/images/answer5.gif"
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
        answerGif: "assets/images/answer6.gif"
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
        answerGif: "assets/images/answer7.gif"
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
        answerGif: "assets/images/answer8.gif"
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
        answerGif: "assets/images/answer9.gif"
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
        answerGif: "assets/images/answer10.gif"
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

var messages = {
    correct: "That is the right answer!",
    incorrect: "Sorry, that is incorrect. You should probably go watch the show...",
    timeUp: "You are out of time",
    end: "Lets see how you did!"

}
    
var showAnswer = {
    time: 3,

    start: function() {
        delay = setInterval(showAnswer.count, 1000);
        setTimeout (function() {
            clearInterval(delay);
        }, 1000*3)
    },

    count: function() {
        showAnswer.time--;
    },

    reset: function() {
        showAnswer.time = 3;
    }
}

//TIMER
function countDown() {
    seconds = 15;
    $("#timer").html("<h3>TIME REMAINING: " + seconds + "</h3>");
    answerPicked = false;
    time = setInterval(showCountdown, 1000);
}

function resetCountDown() {
    countDown();
}

function showCountdown() {
    seconds--;
    $("#timer").html("<h3>TIME REMAINING: " + seconds + "</h3>");
    if(seconds < 1){
        clearInterval(time);
        answered = 0;
        resultsPage();
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
    var randomNumber = Math.floor(Math.random()*myQuestions.length);
    var randomQuestion = myQuestions[randomNumber];
    myQuestions[randomNumber] = myQuestions[0];
    console.log(myQuestions);
    myQuestions.shift();
    goodAnswer = false;
    console.log(myQuestions);
    
    //HOLD THE QUESTION & ANSWER
    var questionHolder = $("<div>");
    questionHolder.addClass("questionHolderClass");
    questionHolder.attr("rightAnswer", randomQuestion.correctAnswer);
    questionHolder.attr("answerInWords", randomQuestion.answers[randomQuestion.correctAnswer]);
    questionHolder.attr("answerGifPath", randomQuestion.answerGif);
    questionHolder.append(randomQuestion.question);

    $("#currentQuestion").append(questionHolder);

    // SETS UP ANSWERS FOR EACH QUESTION
    for (var i=0; i<randomQuestion.answers.length; i++) {
        console.log(randomQuestion.answers);
        var eachAnswer = $("<div>");
        eachAnswer.addClass("answerChoices");
        eachAnswer.attr("thisAnswer", [i]);
        eachAnswer.append(randomQuestion.answers[i]);
        $("#currentQuestion").append(eachAnswer);
    }

    // STARTS TIMER
    countDown();

    // DETECT WHICH ANSWER IS SELECTED BY USER
$("body").on("click", ".answerChoices", function() {
    userChoice = parseInt(($(this).attr("thisAnswer")));
    theAnswer = parseInt(($(".questionHolderClass").attr("rightAnswer")));
    thisGif = $(".questionHolderClass").attr("answerGifPath");
    userChoice = $(this).attr("thisAnswer");
    console.log("User Choice")
    console.log(userChoice);
    clearInterval(time);
    console.log(userChoice);
    console.log($(".questionHolderClass").attr("rightAnswer"));
    console.log("The answer is " + theAnswer);

     resultsPage();
});

}

// FUNCTION TO SHOW ANSWER PAGE
function resultsPage() {
    $("#currentQuestion").empty();
    $(".answerChoices").empty();
    $(".randomQuestion").empty();

    console.log("resultsPage");
    console.log(userChoice);
    console.log(theAnswer);

    if (userChoice == theAnswer) {
        wins++;
        goodAnswer = true;
        console.log(goodAnswer);
        console.log("correct");
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        console.log(thisGif);
        $("#timer").empty();
        $(".questionHolderClass").remove();
        $(".answerChoices").remove();
        $("#messages").append(messages.correct);
        $("#results").html("<img src=" + thisGif + ">");
    } else {
        losses++;
        goodAnswer = false;
        console.log(goodAnswer);
        console.log("incorrect");
        console.log("Losses: " + losses);
        console.log("Wins " + wins);
        $("#timer").empty();
        $(".questionHolderClass").remove();
        $(".answerChoices").remove();
        $("#messages").html(messages.incorrect);
    }

//NEED TO FIX CODE BELOW  
    // if(currentQuestion == (myQuestions.length-1)) {
    //     setTimeout(resultsPage, 5000)
    // } else {
    //     // currentQuestion++;
    //     setTimeout(newQuestion, 5000);
    //     $("#results").empty();
    // }
}

// START GAME WHEN BUTTON IS CLICKED
$("body").on("click", ".startButton", function() {
    console.log("ready");

    $(".startButton").hide();
    $("#timer").show();

    startQuiz();
    newQuestion();
    
});



//TODO: 

//NEED TO FIX TIMEOUT FUNCTION
//NEED TO ADD UP SCORE AND DISPLAY AFTER LAST QUESTION
//NEED TO ADD TEXT ABOVE GIF WHEN CORRECT ANSWER IS CHOSEN
//NEED TO ADD CSS
//NEED TO CLEAN UP BUGS