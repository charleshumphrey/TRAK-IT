import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "../../index.html";
  } else {
    history.replaceState(null, "", window.location.href);

    const name = localStorage.getItem("name");
    const roomId = localStorage.getItem("roomId");

    document.getElementById("name").innerText = `${name}`;

    const fetchRoomName = async () => {
      try {
        const roomRef = ref(db, `rooms/${roomId}`);
        const snapshot = await get(roomRef);

        if (snapshot.exists()) {
          const roomData = snapshot.val();

          document.getElementById("roomName").innerText = roomData.roomName;
        } else {
          document.getElementById("roomName").innerText = "Room not found.";
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        document.getElementById("roomName").innerText =
          "Error loading room name.";
      }
    };

    fetchRoomName();
  }

  const roomId = localStorage.getItem("roomId");

  if (!roomId) {
    alert("Room ID not found. Please log in again.");
    window.location.href = "../../index.html";
    return;
  }
});

try {
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "../../index.html";
    } else {
      history.replaceState(null, "", window.location.href);

      const userId = localStorage.getItem("userId");

      const changePasswordForm = document.getElementById("changePasswordForm");

      changePasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;
        const errorMessage = document.getElementById("error-message");

        if (newPassword !== confirmPassword) {
          errorMessage.classList.remove("hidden");
          errorMessage.innerText = "New passwords do not match.";
          return;
        }

        try {
          const userRef = ref(db, `users/${userId}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();

            if (userData.password === oldPassword) {
              await update(userRef, {
                password: newPassword,
              });

              alert("Password changed successfully!");
              changePasswordForm.reset();
              errorMessage.classList.add("hidden");
            } else {
              errorMessage.classList.remove("hidden");
              errorMessage.innerText = "Old password is incorrect.";
            }
          } else {
            alert("User not found.");
          }
        } catch (error) {
          console.error("Error changing password:", error);
          alert(
            "An error occurred while changing the password. Please try again."
          );
        }
      });
    }
  });
} catch (error) {
  console.error("An unexpected error occurred:", error);
  alert("An unexpected error occurred. Please try again later.");
}
