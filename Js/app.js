'use strict'

const muteBtn = document.querySelector('.material-symbols-outlined')
const questionNumber = document.querySelector('.que-number .number')
const showQuestion = document.querySelector('.question')
const showTime = document.querySelector('.timer .sec')
const showOptions = document.querySelectorAll('.options .option')
const removeClassEle = document.querySelectorAll('.options .option.active')
const nextBtn = document.querySelector('.next-key button')
const activeOpt = document.querySelector('.active')
const body = document.body

// variables for options selection
const opt_1 = document.getElementById('ans1')
const opt_2 = document.getElementById('ans2')
const opt_3 = document.getElementById('ans3')
const opt_4 = document.getElementById('ans4')

let queCounter = 0
let time = 30
let counter, score

muteBtn.addEventListener('click', () => {
  if (muteBtn.innerText === 'volume_up') {
    muteBtn.innerText = 'volume_off'
  } else {
    muteBtn.innerText = 'volume_up'
  }
})

function loadQuestion() {
  for (let opt of questions) {
    //to randomly sort options
    opt.options.sort(() => Math.random() - 0.5)
  }

  let quest = questions[queCounter]
  showQuestion.innerText = quest.question

  for (let i = 0; i < showOptions.length; i++) {
    const element = showOptions[i]
    element.innerText = quest.options[i]
  }

  showQuestionNumber()
  clearInterval(counter)
  starttimer(time)
}

// when answer is correct this will execute

// to show question number counter
function showQuestionNumber() {
  questionNumber.innerText = ` ${queCounter + 1} / ${questions.length} `
}

// for increase question count
nextBtn.addEventListener('click', () => {
  incrementQue()
  removeClass()
})

function incrementQue() {
  queCounter++
  if (queCounter === questions.length) {
    endGame()
  }
  removeClass()
  loadQuestion()
}

// removing all active classed

function removeClass() {
  showOptions.forEach((element) => {
    element.classList.remove('active')
    element.classList.remove('correct')
    element.classList.remove('wrong')
    body.classList.remove('less-time')
  })
}

// validating Answer
function checkOpt() {
  let que = questions[queCounter]
  if (opt_1.classList.contains('active')) {
    if (opt_1.innerText === que.answer) {
      ansCorrect()
    } else {
      ansWrong()
    }
  } else if (opt_2.classList.contains('active')) {
    if (opt_2.innerText === que.answer) {
      ansCorrect()
    } else {
      ansWrong()
    }
  } else if (opt_3.classList.contains('active')) {
    if (opt_3.innerText === que.answer) {
      ansCorrect()
    } else {
      ansWrong()
    }
  } else if (opt_4.classList.contains('active')) {
    if (opt_4.innerText === que.answer) {
      ansCorrect()
    } else {
      ansWrong()
    }
  } else {
    console.log('select something')
  }
}

function ansCorrect() {
  showOptions.forEach((e) => {
    if (e.classList.contains('active')) {
      e.classList.add('correct')
    } else {
      e.classList.remove('correct')
    }
  })
}
function ansWrong() {
  showOptions.forEach((e) => {
    if (e.classList.contains('active')) {
      e.classList.add('wrong')
    } else {
      e.classList.remove('wrong')
    }
  })
}
// to cycle between options

showOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    showOptions.forEach((opt) => {
      opt.classList.remove('active')
    })
    opt.classList.add('active')
    checkOpt()
  })
})

// to show and all time related funtionality
function starttimer(time) {
  counter = setInterval(timer, 1000)
  function timer() {
    showTime.innerText = `${time}s`
    time--
    if (time < 10) {
      showTime.innerText = `0${time}s`
      bgBreathEffectTime()
    }
    if (time < 0) {
      showTime.innerText = `00s`
      incrementQue()
    }
  }
}

function bgBreathEffectTime() {
  body.classList.add('less-time')
}

function endGame() {
  location.href = './result.html'
}

document.onload = loadQuestion()
document.onload = showQuestionNumber()
