const quizData = [
    {
        question: "ข้อใดเป็นสกิลที่ Game Caster ไม่ต้องมี",
        a: "การสื่อสาร",
        b: "ทัศนคติที่ดี",
        c: "การแสดง",
        d: "การตัดต่อวิดีโอให้มีความน่าสนใจ",
        correct: "c",
    },
    {
        question: "ของที่ Game Caster ไม่ต้องมี",
        a: "ไมค์",
        b: "ซอฟต์แวร์",
        c: "คอมพิวเตอร์",
        d: "เครื่องประดับ",
        correct: "d",
    },
    {
        question: "ข้อใดไม่ใช่บทบาทและหน้าที่ของ Game Caster",
        a: "ซ่อมอุปกรณ์",
        b: "ตัดต่อวิดีโอ",
        c: "เล่นเกมหรือแคสเกม",
        d: "ศึกษาข้อมูลเกมและอัปเดตข่าวสาร",
        correct: "a",
    },
    {
        question: "Game Content Creator กับ Creator ต่างกันตรงไหน",
        a: "ลักษณะการทำงาน",
        b: "รูปแบบงาน",
        c: "การตัดต่อ",
        d: "การสร้างสรรค์",
        correct: "b",
    },

];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
async function UpdateScoreDB(score) {
    await fetch("/UpdataScoreDB", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: getCookie("username"),
            score: score
        })
    });
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            UpdateScoreDB(score);
            quiz.innerHTML = `
            <h2>คุณตอบคำถามถูก ${score}/${quizData.length} ข้อ</h2> 

            <button onclick="location.reload()">Try Doing it again</button>
            <p><a href='/allcourse.html'><button id = "project-button2">Back</button></p>
            `
        }

    }

})
