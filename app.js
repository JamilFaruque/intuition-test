const statusDiv = document.querySelector('.status');
const generateBtn = document.querySelector('.generate-btn');
const resultDiv = document.querySelector('.result');
const tryBtn = document.querySelector('.try-btn');
const inputField = document.querySelector('#input-field');
const attemptDiv = document.querySelector('.attempt-div');
const attemptCountDiv = document.querySelector('.attempt');
const attemptTextDiv = document.querySelector('.attempt-text');
const restartBtn = document.querySelector('.restart-btn');


const alertMessages = {
  smallAlertMsg: [
    'Alas!Guess a bigger number',
    'Oops!Choose a bigger number',
    'ahh ohh!Bigger number please',
    'Not really!Guess a bigger one'
  ],
  bigAlertMsg: [
    'Not really!Guess a smaller one',
    'Oops!Choose a smaller number',
    'ahh ohh!smaller number please',
    'Alas!Guess a smaller number',
  ],
  successMsg: [
    'Wow!You have guessed it right',
    'Bingoo!Right guess'
  ]
}

let randomNumber = (endNumber) => {
  return Math.floor(Math.random() * endNumber)
}

let number;
let attempts = 0;


let generateNumber = () => {
  let num = randomNumber(200)
  num = num < 10 ? num += 10 : num;
  let numToString = num.toString().split('');
  statusDiv.innerText = ''
  for (let i = 0; i < numToString.length; i++) {
    statusDiv.innerText += '$ '
  }
  number = num
  attempts = 0;
  console.log(number);
}


let game = () => {
  let userInput = inputField.value;
  let a = statusDiv.innerText
  if (!statusDiv.innerText.includes('$')) {
    resultDiv.innerText = 'Please generate a number'
  } else {
    if (userInput == '') {
      resultDiv.innerText = 'Please guess a number'
    } else {
      if (!isNaN(userInput)) {
        attemptDiv.classList.remove('hidden')
        if (userInput > number) {
          resultDiv.innerText = alertMessages.bigAlertMsg[randomNumber(alertMessages.bigAlertMsg.length)]
          resultDiv.style.background = 'red';
          attempts++
          attemptCountDiv.innerText = attempts
          inputField.value = '';
        } else if (userInput < number) {
          resultDiv.innerText = alertMessages.smallAlertMsg[randomNumber(alertMessages.smallAlertMsg.length)]
          resultDiv.style.background = 'red';
          attempts++
          attemptCountDiv.innerText = attempts
          inputField.value = '';
        } else if (userInput == '') {
          resultDiv.innerText = 'Please guess a number first'
        } else {
          resultDiv.innerText = alertMessages.successMsg[randomNumber(alertMessages.successMsg.length)]
          resultDiv.style.background = 'green';
          attempts++
          attemptTextDiv.innerText = 'Attempts taken: '
          attemptCountDiv.innerText = attempts;
          statusDiv.innerText = number
          restart()
        }
      } else {
        resultDiv.innerText = 'Please use number only';
      }

    }
  }
}

let restart = () => {
  tryBtn.classList.add('hidden');
  restartBtn.classList.remove('hidden');
  restartBtn.addEventListener('click', reset)
}
let reset = () => {
  tryBtn.classList.remove('hidden');
  restartBtn.classList.add('hidden');

  statusDiv.innerText = 'Please Generate a number';
  resultDiv.innerText = 'Result will be shown here';
  attempts = 0;
  attemptDiv.classList.add('hidden');
  inputField.value = '';
  resultDiv.style.background = 'none';
}


generateBtn.addEventListener('click', generateNumber)
tryBtn.addEventListener('click', game)

