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

document.getElementById("logoutButton").addEventListener("click", logout);
