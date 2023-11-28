const quizData = [
    {
        question: "ข้อใดเป็นสกิลที่ Streamer ไม่ต้องมี",
        a: "การพูด",
        b: "การเคร่ง",
        c: "การอดทน",
        d: "การมีวินัย",
        correct: "b",
    },
    {
        question: "ของที่ Streamer ไม่ต้องมี",
        a: "ไมค์",
        b: "คอมพิวเตอร์",
        c: "ของตกแต่ง",
        d: "กล้อง",
        correct: "c",
    },
    {
        question: "ข้อใดไม่ใช่บทบาทและหน้าที่ของ Streamer",
        a: "ซ่อมอุปกรณ์",
        b: "ตอบคำถามผู้ชม",
        c: "ตัดต่อวิดีโอ",
        d: "เตรียมอุปกรณ์ถ่ายทอดสด",
        correct: "a",
    },
    {
        question: "การเป็น Streamer จะได้เจออะไรบ้าง ",
        a: "เพื่อน",
        b: "สังคมใหม่ๆ",
        c: "แฟนคลับ",
        d: "ถูกทุกข้อ",
        correct: "d",
    },

];

const quiz= document.getElementById('quiz')
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
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2>คุณตอบคำถามถูก ${score}/${quizData.length} ข้อ</h2>

            <button onclick="location.reload()">Try Doing it again</button>
            <p><a href='/allcourse.html'><button id = "project-button2">Back</button></p>
            `
        }
        
    }
})
