import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", async () => {
  const roomListDiv = document.getElementById("room-list");

  try {
    const roomsRef = ref(db, "rooms");
    const snapshot = await get(roomsRef);

    if (snapshot.exists()) {
      const rooms = snapshot.val();

      Object.entries(rooms).forEach(([roomId, room]) => {
        const roomButton = document.createElement("button");
        if (room.building === "building") {
          roomButton.className =
            "px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition m-2";
        } else {
          roomButton.className =
            "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition m-2";
        }

        const icon = document.createElement("i");
        icon.className = "fas fa-building text-white mr-2";

        const roomText = document.createTextNode(room.roomName);

        roomButton.appendChild(icon);
        roomButton.appendChild(roomText);

        roomButton.onclick = () => {
          window.location.href = `room_data.html?roomId=${roomId}`;
        };

        roomListDiv.appendChild(roomButton);
      });
    } else {
      roomListDiv.textContent = "No rooms found.";
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   const roomForm = document.getElementById("room-form");

//   roomForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const roomName = document.getElementById("roomName").value.trim();
//     const building = document.getElementById("building").value;

//     if (!roomName) {
//       alert("Please enter a valid room name.");
//       return;
//     }

//     try {
//       const roomsRef = ref(db, "rooms");
//       await push(roomsRef, { roomName, building });

//       roomForm.reset();
//     } catch (error) {
//       console.error("Error adding room:", error);
//       alert("An error occurred while adding the room. Please try again.");
//     }
//   });
// });
