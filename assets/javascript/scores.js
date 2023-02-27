//check if there are user scores in local storage, display if so. Or display "No Scores" if no scores exist.
const storage = JSON.parse(localStorage.getItem("userScores"));

if (storage === null) {
  scoreEl.textContent = "No Scores";
} else {
  scoreEl.textContent = "";
  for (let i = 0; i < storage.length; i++) {
    let p = document.createElement("p");
    p.textContent = `Name: ${storage[i].name} ------ Score: ${storage[i].finalScore}`;
    scoreEl.append(p);
  }
}
