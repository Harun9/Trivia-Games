$(document).ready(function () {
    $("#section1").hide();
    $("#details").hide();
    $('#instruction').modal();
    $('.parallax').parallax();
    $('.tooltipped').tooltip({
        delay: 50
    });


    $("#section1").fadeIn(1000 * 5, function () { });

    $("#questionSpace").hide()
    var correctAnswers = 0,
        wrongAnswers = 0,
        skipQuestions = 0,
        questionIndex = 0;


    var displayCongrants = ['You made it!', 'You are a star!', "Hurah! you Rock!", "You are Good!"];

    function randomDisplay(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomDisplay(displayCongrants.length);
    }

    function countNum() {
        $('.pickAnswer').click(function () {
            $(this).data('clicked', true);
        });
        var i = 20;
        var intervals = setInterval(function () {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(intervals);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(intervals);
                })
            }

            if (i === 0) {
                skipQuestions++;
                clearInterval(intervals);
                questionIndex++;
                $('#timer').effect("pulsate", {
                    times: 20
                }, 1000 * 5);
                i = 20;
                showQuestion(questionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "what year was the Declaration of Independence signed?",
            "c": ["a) 1776", "b) 1802", "c) 1812"],
            "answer": 0
        },
        // question 2
        {
            "q": "Who was the president during the war of 1812?",
            "c": ["a) John adams", "b) james Madison", "c)john smith"],
            "answer": 0
        },
        // question 3
        {
            "q": "Which of the following events led the United States to officially enter WWII?",
            "c": ["a)Attack of pearl harbor", "b)Sinking of Lusitania,", "c)pBombing of London "],
            "answer": 0
        },
        // question 4
        {
            "q": "Which president served three terms in office?",

            "c": ["a)AHarry Truman", "b)Franklin Roosevelt", "c)Grover Cleveland"],
            "answer": 1
        },


    ];


    function showQuestion(n) {

        if (questionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countNum();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops agian
        }

        $(".pickAnswer").on("click", function () {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[questionIndex].answer) {
                correctAnswers++;
                questionIndex++
                randomCongrats();

            } else {
                wrongAnswers++;
                questionIndex++;

            }
            showQuestion(questionIndex);
        })
    }

    function startGame() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctAnswers = 0;
        wrongAnswers = 0;
        skipQuestions = 0;
        questionIndex = 0;

        showQuestion(questionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctAnswers + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + wrongAnswers + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + skipQuestions + "</h4>");

        setTimeout(startGame, 1000 * 10);

    }



    $("#startButton").on("click", function () {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startGame();


    })


});