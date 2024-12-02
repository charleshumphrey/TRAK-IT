import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
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
