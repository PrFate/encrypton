const alphabet = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к',
'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я',
'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К',
'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];

const ukrAlphaLength = alphabet.length / 2;

function validateInput(msg) {
  let hasUkrLetters = false;
  let hasLatinLetters = false;
  for (var i = 0; i < msg.length; i++) {
    if(alphabet.includes(msg[i])) {
      hasUkrLetters = true;
    }
    if((/[a-zA-Z]/).test(msg[i])) {
      hasLatinLetters = true;
    }
  }

  if(hasUkrLetters === true && hasLatinLetters === true) {
    throw new Error("Can't have both ukranian and latin letters in a message");
  }
}

//Функція шифрує один символ за алгоритмом Цезара
function Cipher(symbol, key) {
  //Якщо символ не є буквою з алфавіту, повернути його без модифікацій
  if((/[a-zA-Z]/).test(symbol)) {
    let startPoint = (symbol.toUpperCase() === symbol ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0));
    let numKey = parseInt(key);

    return String.fromCharCode(((symbol.charCodeAt(0) + numKey - startPoint) % 26) + startPoint);
  } else if(alphabet.includes(symbol)) {
    let startPoint = alphabet.indexOf(symbol === symbol.toLowerCase() ? 'а' : 'А');
    let numKey = parseInt(key);
    //Імлементація алгоритму Цезара
    return alphabet[((((alphabet.indexOf(symbol)) + numKey - startPoint) % ukrAlphaLength) + startPoint)];
  }
  return symbol;
}
//Функія шифрування
function Encipher(msg, key) {
  try {
      validateInput(msg);

      for (let i = 0; i < msg.length; i++) {
        if(alphabet.includes(msg[i])) {
          if(key > ukrAlphaLength) {
            key = parseInt(key) % ukrAlphaLength;
          }
          i = msg.length;
        } else {
          if(key > 26) {
            key = parseInt(key) % 26;
          }
          i = msg.length;
        }
      }
      var output = '';

      var msgSymbols = msg.split('');
      msgSymbols.forEach((letter, i) => {
        output += Cipher(letter, key);
      });
      return output;

  } catch(err) {
    alert(err);
  }
}
//Функія дешифрування
function Decipher(msg, key) {
  try {
      validateInput(msg);

      for (let i = 0; i < msg.length; i++) {
        if(alphabet.includes(msg[i])) {
          if(key > ukrAlphaLength) {
            key = parseInt(key) % ukrAlphaLength;
          }
          return Encipher(msg, ukrAlphaLength - key);
          i = msg.length;
        } else {
          if(key > 26) {
            key = parseInt(key) % 26;
          }
          return Encipher(msg, 26 - key);
          i = msg.length;
        }
      }
  } catch(err) {
    alert(err);
  }
}

const textAreaEl = document.querySelector('.cypher-form__textarea');
const encryptBtn = document.getElementById('encrypt');
const keyInput = document.querySelector("input[name='key']");
const decryptBtn = document.getElementById('decrypt');
const decrTextAreaEl = document.querySelector('textarea[name = "msg-decr"]');
const decrKeyInput = document.querySelector('.ceasar-form-decr > input[type = "number"]');

let userText = null;
let encryptedMsg = null;
let decryptedMsg = null;
let userKey = null;

encryptBtn.addEventListener('click', function(e) {
  userText  = textAreaEl.value;
  userKey = keyInput.value;
  encryptedMsg = Encipher(userText, userKey);
  document.querySelector('.result__result').textContent = encryptedMsg;
});

decryptBtn.addEventListener('click', function(e) {
  userText = decrTextAreaEl.value;
  userKey = decrKeyInput.value;
  decryptedMsg = Decipher(userText, userKey);
  document.querySelector('.decr-result').textContent = decryptedMsg;
});

document.querySelector('#saveFile').addEventListener('click', function() {
  if(document.querySelector('.btn-switch').textContent === 'Encryption mode') {
    var blob = new Blob([document.querySelector('.result__result').textContent], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'message.txt');
  } else {
    var blob = new Blob([document.querySelector('.decr-result').textContent], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'message.txt');
  }
});
