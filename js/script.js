document.getElementById('start-quiz').addEventListener('click', function() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
});

const answers = document.querySelectorAll('.answer');
const nextQuestionButton = document.getElementById('next-question');

answers.forEach(answer => {
    answer.addEventListener('click', function() {
        answers.forEach(btn => btn.disabled = true);
        nextQuestionButton.classList.remove('hidden');
    });
});

nextQuestionButton.addEventListener('click', function() {
    answers.forEach(btn => btn.disabled = false);
    nextQuestionButton.classList.add('hidden');
});
