const inputFiles = document.querySelectorAll("input[type='file']");

const textarea = document.querySelector('.cypher-form__textarea');

inputFiles.forEach((elem) => {
  elem.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
      textarea.value = reader.result;
    }
    reader.readAsText(elem.files[0]);
  }, false);
}
);
