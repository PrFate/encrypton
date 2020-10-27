let isEncrMode = true;

const formEncr = document.querySelector('.form__container--1');
const formDecr = document.querySelector('.form__container--2');

document.querySelector('.btn-switch').addEventListener('click', function() {
  if (isEncrMode) {
    this.style.backgroundColor = '#F25E6B';
    this.textContent = 'Decryption mode';
    isEncrMode = false;
    formDecr.classList.add('d-block');
    formDecr.classList.remove('d-none');
    formEncr.classList.add('d-none');
  } else {
    this.style.backgroundColor = '#1BDDF2';
    this.textContent = 'Encryption mode';
    isEncrMode = true;
    formEncr.classList.add('d-block');
    formEncr.classList.remove('d-none');
    formDecr.classList.add('d-none');
  }
});
