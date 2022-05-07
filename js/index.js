const open = document.getElementById("open");
const modalContainer = document.getElementById("modal-container");
const close = document.getElementById("close");

const difficulties = document.querySelectorAll(".difficulty");
difficulties.forEach((difficulty) => {
  difficulty.addEventListener("click", (event) => {
    sessionStorage.setItem("difficulty", event.target.value);
  });
});

const themes = document.querySelectorAll(".theme");
themes.forEach((theme) => {
  theme.addEventListener("click", (event) => {
    sessionStorage.setItem("theme", event.target.value);
  });
});

open.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

close.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
