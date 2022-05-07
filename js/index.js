const open = document.getElementById("open");
const modalContainer = document.getElementById("modal-container");
const close = document.getElementById("close");

const select = document.getElementById("selectbox");
select.addEventListener("change", () => {
  sessionStorage.setItem(
    "difficulty",
    select.options[select.selectedIndex].value
  );
});

open.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

close.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
