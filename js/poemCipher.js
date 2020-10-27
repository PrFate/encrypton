const alphaLowerUkr = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к',
'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
const alphaUpperUkr = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К',
'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];
//https://www.ukrlib.com.ua/books/printit.php?tid=633
//шостий
let key = ["невжезадармастількис",
"дотебенайсвятішоюлюб",
"тобіофіруючидушуйтіл",
"задармакрайтвійвесьп",
"твоїхборцівйомувжене",
"украсотісвободііздор",
"задармавсловітвойому",
"ісилаймякістьдотепіп",
"івсечимможевгорудухп",
"задармавпіснітвоїйлл"];

function Becipher(el) {

  if (el[0].match(/\D/)) {
    return el;
  }

  const [row, col] = el.split('/');

  return key[parseInt(row) - 1][col - 1];
}

function Cipher(sym) {

  if(!alphaLowerUkr.includes(sym) && !alphaUpperUkr.includes(sym)) {
    return sym;
  }

  if(alphaUpperUkr.includes(sym)) {
    sym = alphaLowerUkr[alphaUpperUkr.indexOf(sym)];
  }

  if(sym === 'ґ') {
    sym = 'г';
  } else if(sym === 'є') {
    sym = 'е';
  } else if(sym === 'щ') {
    sym = 'ш';
  }

  for (var i = 0; i < key.length; i++) {
    if (key[i].includes(sym)) {
      return (i + 1) + '/' + (key[i].indexOf(sym) + 1);
    }
  }

  return sym;
}

function Encipher(msg) {
  let output = '';

  for (var i = 0; i < msg.length; i++) {
    if(msg[i] !== ' ') {
     output += Cipher(msg[i]) + ', ';
   } else {
     output += '" ", ';
   }
  }

  return output.slice(0, output.length - 2);
}

function Decipher(msg) {
  let output = '';

  msg.split(', ').forEach((el) => {
    if(el !== '" "') {
    output += Becipher(el);
  } else {
    output += ' ';
  }
  });
  return output;
}

let testMsg = null;
let encrMsg = null;
let isTextFromFile = false;

const encryptBtn = document.getElementById('encrypt');
const fileInputBtn = document.querySelector('label[for="file-to-encr"]');
const fileInputDecrBtn = document.querySelector('label[for="file-to-decr"]');

fileInputBtn.addEventListener('click', () => {
  isTextFromFile = true;
});

fileInputDecrBtn.addEventListener('click', () => {
  isTextFromFile = true;
});

encryptBtn.addEventListener('click', function() {
  testMsg = document.querySelector('.poem-form-encr > .cypher-form__textarea').value;
  if(!testMsg) {
    document.querySelector('.result').textContent = "The message is empty! Try entering it again";
  } else {
    if(isTextFromFile) {
      testMsg = testMsg.slice(0, testMsg.length - 1);
      isTextFromFile = false;
    }
    encrMsg = Encipher(testMsg);
    document.querySelector('.result').textContent = encrMsg;
  }
});


const decryptBtn = document.getElementById('decrypt');

decryptBtn.addEventListener('click', function() {
  let decryptedMsg = document.querySelector('.poem-form-decr > .cypher-form__textarea').value;
  if (!decryptedMsg) {
    document.querySelector('.result-decr').textContent = "The message is empty! Try entering it again";
  }  else {
    if(isTextFromFile) {
      decryptedMsg = decryptedMsg.slice(0, decryptedMsg.length - 1);
      isTextFromFile = false;
    }
    document.querySelector('.result-decr').textContent = Decipher(decryptedMsg);
  }
});

document.querySelector('#saveFile').addEventListener('click', function() {
  if(document.querySelector('.btn-switch').textContent === 'Encryption mode') {
    var blob = new Blob([document.querySelector('.result').textContent], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'message.txt');
  } else {
    var blob = new Blob([document.querySelector('.result-decr').textContent], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'message.txt');
  }
});
