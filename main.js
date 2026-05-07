const questions = [
    {
        q: "Waa maxay Magaceyga oo sidaxan?",
        a: [
            { text: "Mohamed abdi ali", correct: false },
            { text: "Mohamed muuse jamac", correct: false },
            { text: "Mohamed Ali Ahmed", correct: true }
        ]
    },
    {
        q: "Waa maxay Nanesta an ugu jeclahay in laigu yeero?",
        a: [
            { text: "Kolkoliyoow", correct: false },
            { text: "Foodey", correct: true },
            { text: "Kalaay", correct: false },
            { text: "Manaa", correct: false }
        ]
    },
    {
        q: "waa maxay cuntoyinka an jeclahay?",
        a: [
            { text: "bariis iyo malaay", correct: true},
            { text: "Basto iyo chicken", correct: false },
            { text: "Canbuulo io soor", correct: false },
            { text: "xalwo iyo dolsho", correct: false }
        ]
    },
    {
        q: "Waa maxay cuntoyinka an necbahay?",
        a: [
            { text: "canbuulo", correct: false },
            { text: "caloley ", correct: true },
            { text: "basto makaroni", correct: false },
            { text: "cadinta hilibka leh", correct: false }
        ]
    },
    {
        q: "Waa maxay colors ka an jeclahay?",
        a: [
            { text: "blue and white ", correct: true },
            { text: "cream and black", correct: false },
            { text: "red and yellow", correct: false }
        ]
    },
    {
        q: "Waa maxay colors ka an adunka ugu necbahay?",
        a: [
            { text: "pink and yellow", correct: true },
            { text: "green and red ", correct: false },
            { text: "orange and gray", correct: false },
            { text: "brown and nevy blue", correct: false }
        ]
    },
    {
        q: "fotball postion ke ayaan ka dhelaa?",
        a: [
            { text: "goolhaaye", correct: false },
            { text: "difaac", correct: false },
            { text: "qad dhexe", correct: true },
            { text: "weerar", correct: false }
        ]
    },
    {
        q: "marke lacag iso gasho wxa ugu horeyo an sameyo waa?",
        a: [
            { text: "inaa maqayad tago", correct: false },
            { text: "inaa asxabteydah wado", correct: false },
            { text: "inaa ka labisto", correct: true },
            { text: "inaa iska hesto", correct: false }
        ]
    },
    {
        q: "Waa maxay wax yabaha hobby keygah ah mrka waqtiga firaaqada ah ku qaato?",
        a: [
            { text: "sleep, eat food", correct: false },
            { text: "gym and football", correct: true },
            { text: "reading books, watching movies", correct: false },
            { text: "family and friends", correct: false }
        ]
    },
    {
        q: "Imisa daqiiqo ayan kaso dahay mrka an balano bdnaa?",
        a: [
            { text: "0-5min", correct: false },
            { text: "5-10min", correct: false },
            { text: "10-20min", correct: true },
            { text: "20-30min", correct: false }
        ]
    },
    {
        q: "Waa maxay waxa ugu horeyo ey is badalo mrka an xanaqo?",
        a: [
            { text: "Codka ayaan kor u qaadaa", correct: false },
            { text: "Waan iska aamusaa (Silent mode)", correct: true },
            { text: "Waan qoslaa si aan u qariyo", correct: false},
            { text: "wan qeyliyaa", correct: false }
        ]
    },
    {
        q: "Maxay ahayd waxii ugu horreeyay ee aan kugu jeclaaday (First attraction)?",
        a: [
            { text: "Dabeecaddaada", correct: false },
            { text: "Muuqaalkaaga", correct: true },
            { text: "Sida aad u hadasho", correct: false },
            { text: "Xishoodkaaga", correct: false }
        ]
    },
    {
        q: "Haddii aan is khilaafno (dagaalno), yaa badanaa ugu horreeya ee raalligelin bixiya?",
        a: [
            { text: "Aniga", correct: true },
            { text: "Adiga", correct: false },
            { text: "Labadaba mar qura", correct: false },
            { text: "Qofna ma bixiyo", correct: false }
        ]
    },
    {
        q: "waa maxay waxa adiga kugu sabsan oo aniga an ka jeclahay?",
        a: [
            { text: "qosolkagah", correct: false },
            { text: "dhibkagah", correct: false },
            { text: "shumiskagah", correct: true },
            { text: "xanaqagah", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    document.getElementById('question-container').classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.q;

    currentQuestion.a.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add('correct');
            }
        });
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    document.getElementById('question-container').classList.add('hide');
    nextButton.classList.add('hide');
    resultContainer.classList.remove('hide');

    // Xisaabinta boqolleyda
    const percentage = Math.round((score / questions.length) * 100);
    
    // Fariimaha Natiijada
    let message = "";
    if (percentage === 100) {
        message = "Maashallaah! wad ka baxsatay , 100% ayaad i taqaanaa! ❤️";
    } else if (percentage >= 70) {
        message = "Aad baad u mahadsantahay! Waxaad tahay qof igu dhow. 😊";
    } else if (percentage >= 50) {
        message = "Ma xuma, laakiin weli wax badan ayaa kuu dhiman inaad i barato! 🤔";
    } else {
        message = "Saaxiib, ma hubtaa inaan is naqaan? Iska soo bar! 😅";
    }

    scoreText.innerHTML = `
        <div style="font-size: 45px; margin-bottom: 15px; color: #38bdf8;">${percentage}%</div>
        <p style="font-size: 20px; line-height: 1.6;">${message}</p>
        <p style="margin-top: 10px;">Waxaad saxday ${score} ka mid ah ${questions.length} su'aalood.</p>
    `;
}

startQuiz();