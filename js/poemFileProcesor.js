const inputFileEncr = document.querySelector('input[name="file-encr"]');
const inputFileDecr = document.querySelector('input[name="file-decr"]');

const textAreaEncr_ing = document.querySelector('.poem-form-encr > textarea');
const textareaDecr_ing = document.querySelector('.poem-form-decr > textarea');

inputFileEncr.addEventListener('change', function() {
  const reader = new FileReader();
  reader.onload = function() {
    textAreaEncr_ing.value = reader.result;
  }
  reader.readAsText(inputFileEncr.files[0]);
}, false);

inputFileDecr.addEventListener('change', function() {
  const reader = new FileReader();
  reader.onload = function() {
    textareaDecr_ing.value = reader.result;
  }
  reader.readAsText(inputFileDecr.files[0]);
}, false);
