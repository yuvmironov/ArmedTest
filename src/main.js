var videoHeader = document.getElementById('HeaderFirst');
var videoBlock = document.getElementById('Video');
var testBlock = document.getElementById('Test');
var buttonTest = document.getElementById('TestActive');
var buttonCheck = document.getElementById('TestCheck');
var bodyContent = document.getElementById('body');
var testForm = document.getElementById('TestForm');
var headTwo = document.getElementsByClassName('HeaderTwo');

var count = 0;
var randomMass = [];

while (randomMass.length < 10) {
	var temp = random(1, 15);
	chekMass(temp);
}

function chekMass(number) {
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

function getJson() {
	$.getJSON('q.json', function (data) {
		count = createTest(data);
	})
}

function createTest(data) {
	var questionsCount = 0;
	testBlock.innerHTML = '<h2 class="Header">Ответьте на 10 вопросов за<br><span id="timer" long="10:00">10:00</span></h2>';
	for (var j = 0; j < randomMass.length; j++) {
		questionsCount++;
		var questions = data[randomMass[j]];
		var question = '<p class="Test-Question">' + questions.q + '</p><div class="Test-LabelWrap">';
		for (var i = 0; i < questions.a.length; i++) {
			if (i == questions.ansver) {
				question += '<div class="radioButton">'
				question += '<input type="radio" id="i' + randomMass[j] + 'q'+ i +'" name="q' + randomMass[j] + '" value="true">';
				question += '<label for="i' + randomMass[j] + 'q'+ i +'" class="radio-label Test-Label" >';
				question += questions.a[i] + '</label></div>';
			} else {
				question += '<div class="radioButton">'
				question += '<input type="radio" id="i' + randomMass[j] + 'q'+ i +'" name="q' + randomMass[j] + '" value="false">';
				question += '<label for="i' + randomMass[j] + 'q'+ i +'" class="radio-label Test-Label" >';
				question += questions.a[i] + '</label></div>';
			}
		}
		question += '</div>';
		testBlock.innerHTML += question;
	}
	var button = '<a href="#" class="Test-Check Button Button_Color_Red Button_Size_Lg" onclick="checkTest(); return false;">';
	button += '<span class="Button-Text Button-Text_Color_White Button-Text_Uppercase">проверить<span></a>';
	testBlock.innerHTML += button;
	return questionsCount;
}

function checkTest() {
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
	if (itogo < (count - 1)) {
		testBlock.innerHTML = '<h1 class="Test-Answer">Вы не смогли пройти тест, советуем еще раз просмотреть видео и пройти тест заново.<br> Количество правильных ответов<span class="ErrorAnswer">&nbsp;' + itogo + '</span> из ' + count + ' </h1>';
		videoHeader.classList.remove('Hide');
		videoBlock.classList.remove('Hide');
		buttonTest.classList.remove('Hide');
		for (var i = 0; i < headTwo.length; i++) {
			headTwo[i].classList.remove('Hide');
		}
	
		//timer.classList.add('Hide');
	} else {
		bodyContent.innerHTML = '<h1 class="Test-Answer">Поздравляем, вы успешно прошли тест, данное окно можно закрыть.<br> Количество правильных ответов <span class="GoodAnswer">' + itogo + '</span> из ' + count + ' </h1>';
		testForm.classList.remove('Hide')
	}
}

buttonTest.addEventListener('click', function (event) {
	event.preventDefault();
	videoHeader.classList.add('Hide');
	videoBlock.classList.add('Hide');
	testBlock.classList.remove('Hide');
	buttonTest.classList.add('Hide');
	for (var i = 0; i < headTwo.length; i++) {
		headTwo[i].classList.add('Hide');
	}
	
	//timer.classList.remove('Hide');
	var t = setInterval(function () {
		function f(x) {
			return (x / 100).toFixed(2).substr(2)
		}
		var o = document.getElementById('timer'),
			w = 60,
			y = o.innerHTML.split(':'),
			v = y[0] * w + (y[1] - 1),
			s = v % w,
			m = (v - s) / w;
		if (s < 0)
			var v = o.getAttribute('long').split(':'),
				m = v[0],
				s = v[1];
		o.innerHTML = [f(m), f(s)].join(':');
		if (v == 0) {
			clearInterval(t);
			testBlock.innerHTML = '<h1 class="Test-Answer">Ваше время на прохождение теста истекло, просмотрите видео заново и пройдите тест</h1>';
			videoHeader.classList.remove('Hide');
			videoBlock.classList.remove('Hide');
			buttonTest.classList.remove('Hide');
			//timer.classList.add('Hide');
		}
	}, 1000);
	count = getJson();
});