const starsInputs = Array.from(document.getElementsByClassName('star-input'));

starsInputs.forEach(input => {
  input.onclick = refillStars;
});

function refillStars(event) {
  const clickedStarNumber = event.target.value;

  starsInputs.forEach(starInput => {
    console.log(starInput);
    const actualStarNumber = starInput.value;

    if (actualStarNumber <= clickedStarNumber) {
      starInput.nextElementSibling.classList.replace('ph', 'ph-fill');
    } else {
      starInput.nextElementSibling.classList.replace('ph-fill', 'ph');
    }
  });
}

function focusCommentField() {
  document.querySelector('textarea').focus();
}