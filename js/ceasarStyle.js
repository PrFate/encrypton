let isEncrMode = true;

document.querySelector(".cypher-form__textarea").addEventListener('focus', () => {
  document.querySelector("#btn-3").style.backgroundColor = '#2D4259';
  document.querySelector("#btn-2").style.backgroundColor = '#17B978';
  document.querySelector("#btn-1").style.backgroundColor = '#2D4259';
});

document.getElementById('encrypt').addEventListener('click', () => {
  document.querySelector("#btn-3").style.backgroundColor = '#17B978';
  document.querySelector("#btn-2").style.backgroundColor = '#2D4259';
  document.querySelector("#btn-1").style.backgroundColor = '#2D4259';
});

document.querySelector('.btn-switch').addEventListener('click', function() {
  if(isEncrMode) {
    this.style.backgroundColor = '#F25E6B';
    this.textContent = 'Decryption mode';
    document.querySelector(".container--1").style.display = 'none';
    document.querySelector(".container--2").style.display = 'block';
    document.querySelector("#btn-1").style.backgroundColor = '#17B978';
    document.querySelector("#btn-2").style.backgroundColor = '#2D4259';
    isEncrMode = !isEncrMode;
  } else {
    this.style.backgroundColor = '#1BDDF2';
    this.textContent = 'Encryption mode';
    document.querySelector(".container--2").style.display = 'none';
    document.querySelector(".container--1").style.display = 'block';
    document.querySelector("#btn-1").style.backgroundColor = '#17B978';
    isEncrMode = !isEncrMode;
  }
  document.querySelector("#btn-3").style.backgroundColor = '#2D4259';
});
