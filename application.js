$(document).ready(function() {
	
	var question1 = {question: "What is 1 + 1?", choices: ["1", "11", "2", "-485"], correct: "2"};
	var question2 = {question: "What's 2 x 2?", choices: ["4", "6", "12", "22"], correct: "4"};
	var question3 = {question: "What day is before Wednesday?", choices: ["Sunday", "beforeday", "Thursday", "Tuesday"], correct: "Tuesday"};
	var question4 = {question: "How many weeks are there in a year?", choices: ["12", "52", "365", "4"], correct: "52"};
	var questionArr = [question1, question2, question3, question4];
	var questionNum = 0;
	var answered = false;
	
	$("#submit").hide();
	$("#next").hide();
	
	//display the current question and answer choices
	function display() {
		var currentQuestion = questionArr[questionNum];
		$(".questions").text(currentQuestion.question);
		$("<br>").appendTo($(".questions"));
		$.each(currentQuestion.choices, function(index, value) {
			var id = value.replace(/[\s"']/g, "");
			$("<input />", {type: "radio", id: id, name: "choices", value: value}).appendTo($(".questions"));
			$('<label />', { 'for': id, text: value }).appendTo($(".questions"));
			$('<br>').appendTo($(".questions"));
		});
	}
	//Checks the user input choice and provide feedback
	function checkAnswer() {
		var userChoice = $("input[name='choices']:checked").val();
		var currentQuestion = questionArr[questionNum];
		console.log(userChoice);
		if (!userChoice) {
			$("#ansCheck").html("Please pick an answer!").css({color: 'black'});
		} else if (userChoice == currentQuestion.correct) {
			$("#submit").hide();
			$("#ansCheck").html("You got it!").css({color: 'black'});
			answered = true;
		} else {
			$("#submit").hide();
			$("#ansCheck").html("Incorrect, the answer is " + currentQuestion.correct).css({color: 'black'});
			answered = true;
		}
	}
	//click start to call display function
	$("#start").click(function() {
		$("#start").hide();
		$("#submit").show();
		$("#next").show();
		display();
	});
	//click next to move on to next set of question and choices
	$("#next").click(function() {
		if (answered) {
			return $("#ansCheck").html("Answer this question first.").css({color: 'black'});;
		} else if (!answered && (questionNum < (questionArr.length-1))) {
			questionNum += 1;
			$("#submit").show();
			display();
		} else {
			alert("End of questions!");
		}
		
	});
	//click submit to call the checkAnswer function
	$("#submit").click(function(event) {
		event.preventDefault();
		checkAnswer();
	});
	
});