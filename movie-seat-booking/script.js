const seats = document.querySelectorAll("#seats .seat:not(.occupied)");
const movieSelect = document.getElementById("movie-select");
const countEle = document.getElementById("count");
const totalEle = document.getElementById("total");

(() => {
  restore();

  seats.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      e.target.classList.toggle("selected");
      calculate();
      store();
    });
  });

  movieSelect.addEventListener("change", () => {
    calculate();
    store();
  });
})();
//------------------------------------------------------------------------
function calculate() {
  let seatSelected = document.querySelectorAll("#seats .seat.selected");

  let price = movieSelect.value;
  let count = seatSelected.length;
  let total = price * count;

  countEle.textContent = count;
  totalEle.textContent = total;
}
function store() {
  let seatSelected = document.querySelectorAll("#seats .seat.selected");

  let seatIndex = [...seatSelected].map((seat) => [...seats].indexOf(seat));
  let movieIndex = movieSelect.selectedIndex;

  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));
  localStorage.setItem("movieIndex", JSON.stringify(movieIndex));
}
function restore() {
  let seatIndex = JSON.parse(localStorage.getItem("seatIndex"));
  let movieIndex = JSON.parse(localStorage.getItem("movieIndex"));

  movieSelect.selectedIndex = movieIndex;
  seatIndex.forEach((index) => [...seats][index].classList.add("selected"));
  calculate();
}
