import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function login(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const nameErrorTxt = document.getElementById("name-error");
  const passwordErrorTxt = document.getElementById("password-error");

  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    let userFound = false;
    let passwordCorrect = false;

    if (snapshot.exists()) {
      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();

        if (userData.name === name) {
          userFound = true;
          if (userData.password === password) {
            passwordCorrect = true;

            localStorage.setItem("name", userData.name);
            localStorage.setItem("type", userData.type);
            localStorage.setItem("userId", userSnapshot.key);
            localStorage.setItem("roomId", userData.roomId);
            localStorage.setItem("isLoggedIn", true);

            if (userData.type === "admin") {
              window.location.href = "src/html/admin-dashboard.html";
            } else if (userData.type === "user") {
              window.location.href = "src/html/user-dashboard.html";
            }
          }
        }
      });

      if (!userFound) {
        nameErrorTxt.innerText = "Name not found. Please check your name.";
        passwordErrorTxt.innerText = "";
      } else if (!passwordCorrect) {
        passwordErrorTxt.innerText = "Incorrect password. Please try again.";
        nameErrorTxt.innerText = "";
      }
    } else {
      alert("No users found in the database.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    alert("Something went wrong. Please try again.");
  }
}

document.querySelector("form").addEventListener("submit", login);
