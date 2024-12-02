document
  .getElementById("asset-registry-toggle")
  .addEventListener("click", function () {
    const menu = document.getElementById("asset-registry-menu");
    const icon = this.querySelector(".fa-chevron-down");
    menu.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });

function logout() {
  localStorage.clear();
  window.location.href = "../../index.html";
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

const menuBTN = document.getElementById("name-container");
menuBTN.addEventListener("click", toggleMenu());

document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const nameElement = document.getElementById("name");
  if (!menu.contains(event.target) && !nameElement.contains(event.target)) {
    menu.classList.add("hidden");
  }
});
