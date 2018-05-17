var videoHeader = document.getElementById('HeaderFirst');
var videoBlock = document.getElementById('Video');
var testBlock = document.getElementById('Test');
var buttonTest = document.getElementById('TestActive');
var buttonCheck = document.getElementById('TestCheck');
var bodyContent = document.getElementById('body');
var count = 0;
function getJson () {
	$.getJSON('q.json', function(data) {
		count = createTest(data);
	})
}

function createTest (data) {
	console.group('Создаем тест');
	var questionsCount = 0;
	testBlock.innerHTML = '';
	for (var key in data) {
		questionsCount++;
		var questions = data[key];
		var question = '<p class="Test-Question">'+questions.q+'</p><div class="Test-LabelWrap">';
		for (var i = 0; i < questions.a.length; i++) {
			if (i == questions.ansver) {
				question += '<label class="Test-Label">';
				question += '<input type="radio" name="'+key+'" value="true">';
				question += questions.a[i] + '</label>';
			} else {
				question += '<label class="Test-Label">';
				question += '<input type="radio" name="'+key+'" value="false">';
				question += questions.a[i] + '</label>';
			}
		}
		question += '</div><hr/>';
		testBlock.innerHTML += question;
	}
	var button = '<a href="#" class="TestCheck Button Button_Color_Red Button_Size_Lg" onclick="checkTest(); return false;">';
	button += '<span class="Button-Text Button-Text_Color_White Button-Text_Uppercase">проверить<span></a>';
	testBlock.innerHTML += button;
	console.groupEnd();
	return questionsCount;
}

function checkTest () {
	console.group('Проверяем тест');
	var inputMass = document.getElementsByTagName('input');
	console.log(inputMass);
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
	console.groupEnd();
}

buttonTest.addEventListener('click', function(event){
	event.preventDefault();
	videoHeader.classList.add('Hide');
	videoBlock.classList.add('Hide');
	testBlock.classList.remove('Hide');
	count = getJson();
});