var videoHeader = document.getElementById('HeaderFirst');
var videoBlock = document.getElementById('Video');
var testBlock = document.getElementById('Test');
var buttonTest = document.getElementById('TestActive');
var buttonCheck = document.getElementById('TestCheck');
var bodyContent = document.getElementById('body');
var count = 0;
var randomMass = [];

while (randomMass.length < 10) {
	var temp = random(1,15);
	chekMass(temp);
}

function chekMass (number) {
	for (var i = 0; i < randomMass.length; i++) {
		if (randomMass[i] == number) {
			return false
		}
	}
	randomMass.push(number);
}

function random(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getJson () {
	$.getJSON('q.json', function(data) {
		count = createTest(data);
	})
}

function createTest (data) {
	var questionsCount = 0;
	testBlock.innerHTML = '';
	for (var j = 0; j < randomMass.length; j++) {
		questionsCount++;
		var questions = data[randomMass[j]];
		console.log("questions", questions);
		var question = '<p class="Test-Question">'+questions.q+'</p><div class="Test-LabelWrap">';
		for (var i = 0; i < questions.a.length; i++) {
			if (i == questions.ansver) {
				question += '<label class="Test-Label">';
				question += '<input type="radio" name="q'+randomMass[j]+'" value="true">';
				question += questions.a[i] + '</label>';
			} else {
				question += '<label class="Test-Label">';
				question += '<input type="radio" name="q'+randomMass[j]+'" value="false">';
				question += questions.a[i] + '</label>';
			}
		}
		question += '</div><hr/>';
		testBlock.innerHTML += question;
	}
	var button = '<a href="#" class="TestCheck Button Button_Color_Red Button_Size_Lg" onclick="checkTest(); return false;">';
	button += '<span class="Button-Text Button-Text_Color_White Button-Text_Uppercase">проверить<span></a>';
	testBlock.innerHTML += button;
	return questionsCount;
}
function checkTest () {
	var inputMass = document.getElementsByTagName('input');
	var itogo = 0;
	for (var i = 0; i < inputMass.length; i++) {
		if (inputMass[i].checked) {
			if (inputMass[i].value == 'true') {
				itogo++; 	
			}
		}
	}
	console.log('itogo', itogo);
	console.log('count ', count);
	if (itogo < (count-1)) {
		testBlock.innerHTML = '<h1>Вы не смогли пройти тест, советуем еще раз просмотреть видео и пройти тест заново. Количество правильных ответов '+itogo+' из '+count+' </h1>';
		videoHeader.classList.remove('Hide');
		videoBlock.classList.remove('Hide');
	} else {
		bodyContent.innerHTML = '<h1>Поздравляем, вы успешно прошли тест, данное окно можно закрыть. Количество правильных ответов '+itogo+' из '+count+' </h1>';
	}
}

buttonTest.addEventListener('click', function(event){
	event.preventDefault();
	videoHeader.classList.add('Hide');
	videoBlock.classList.add('Hide');
	testBlock.classList.remove('Hide');
	count = getJson();
});