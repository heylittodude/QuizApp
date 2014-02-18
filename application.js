$(document).ready(function() {
	
	var question1 = {question: "Johnny’s mother had three children. The first child was named April. The second child was named May. What was the third child’s name?", choices: ["June", "Nova", "Johnny", "Jose"], correct: "Johnny", answer: ""};
	var question2 = {question: "How many birthdays do the average man have?", choices: ["75", "1", "80", "00000"], correct: "1", answer: ""};
	var question3 = {question: "A farmer has 17 sheeps.  All but 9 died.  How many are left?", choices: ["9", "8", "26", "17"], correct: "17", answer: ""};
	var question4 = {question: "How many animals of each gender did Moses take on the ark?", choices: ["0", "1", "2", "100"], correct: "0", answer: ""};
	var question5 = {question: "A clerk at a butcher shop stands five feet ten inches tall and wears size 13 sneakers. What does he weigh?", choices: ["Who Knows", "250 maybe?", "Meat", "Alot"], correct: "Meat", answer: ""};
	var questionArr = [question1, question2, question3, question4, question5];//Array consisting all of the questions
	var questionNum = 0;//Current question index, initially set to 0
	var correctAnsNum = 0;//Number of correctly answered questions, initially 0
	var correctAnsArr = [];//Array consists of the question numbers that were answered correctly
	var answered = false;//Variable that checks whether or not a question has been answered.

	$(".header").hide();
	$("#submit").hide();
	$("#next").hide();
	$("#restart").hide();
	$("#resultScreen").hide();
	$(".result").html(correctAnsNum);

	$(window).load(function() {
		$(".startScreen").onload.fadeIn(1500);
		$("#start").fadeIn(1500);
	});
	
	//display the current question and answer choices
	function display() {
		$(".header").show();
		var currentQuestion = questionArr[questionNum];
		$(".questionNum").text(questionNum + 1);
		$(".questions").text(currentQuestion.question);
		$(".choices").empty();
		$.each(currentQuestion.choices, function(index, value) {
			var id = value.replace(/[\s"']/g, "");
			$("<input />", {type: "radio", id: id, name: "choices", value: value}).appendTo($(".choices"));
			$('<label />', { 'for': id, text: value }).appendTo($(".choices"));
			$('<br>').appendTo($(".choices"));
		});
	}
	//Checks the user input choice and provide feedback
	function checkAnswer() {
		var userChoice = $("input[name='choices']:checked").val();
		var currentQuestion = questionArr[questionNum];
		console.log(userChoice);
		if (!userChoice) {
			$("#ansCheck").html("Please pick an answer!");
		} else if (userChoice == currentQuestion.correct) {
			$("#submit").hide();
			$("#ansCheck").html("You got it!");
			answered = true;
			currentQuestion.answer = "Correct";
			correctAnsNum++;
			$(".result").html(correctAnsNum);
		} else {
			$("#submit").hide();
			$("#ansCheck").html("Incorrect, the answer is " + currentQuestion.correct + ".");
			answered = true;
			currentQuestion.answer = "Incorrect";
		}
	}
	//Function that checks each element of the questionArr for the answer property that is set to "Correct" and add its index to correctAnsArr
	function correctAnswers() {
		$.each(questionArr, function(index, value) {
			if (questionArr[index].answer == "Correct") {
				correctAnsArr.push((index+1));
			}
			console.log(correctAnsArr);
		});
		if(correctAnsArr.length > 0) {
			$(".correctAns").html(correctAnsArr.join(", "));
		} else {
			$(".correctAns").html("none");
		}
	}
	//click start to call display function
	$("#start").click(function() {
		$("#start").hide();
		$(".startScreen").hide();
		$("#submit").show();
		$("#next").show();
		$("#restart").show();
		display();
	});
	//click next to move on to next set of question and choices
	$("#next").click(function() {
		$("#ansCheck").html("");
		if (!answered && (questionNum < (questionArr.length-1))) {
			return $("#ansCheck").html("Answer this question first.");
		} else if (answered && (questionNum < (questionArr.length-1))) {
			questionNum += 1;
			$("#submit").show();
			display();
			$("#lastOutcome").html(questionArr[questionNum-1].answer);
			answered = false;
		} else {
			correctAnswers();
			$("#resultScreen").fadeIn(1500);
			$("#next").hide();
			$(".header").hide();
			$(".questions").hide();
			$(".choices").hide();
			answered = false;
		}
		
	});
	//click submit to call the checkAnswer function
	$("#submit").click(function(event) {
		checkAnswer();
	});
	//click restart to start over
	$("#restart").click(function() {
		questionNum = 0;
		correctAnsNum = 0;
		correctAnsArr.length = 0;
		$(".result").html(correctAnsNum);
		$("#ansCheck").html("");
		$("#submit").show();
		$("#next").show();
		$(".header").show();
		$(".questions").show();
		$(".choices").show();
		$("#resultScreen").hide();
		$("#lastOutcome").html("");
		display();
	});
});