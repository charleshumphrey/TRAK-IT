import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document
  .getElementById("roomDataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const roomId = localStorage.getItem("roomId");

    const roomData = {
      article: document.getElementById("article").value,
      description: document.getElementById("description").value,
      stockNumber: document.getElementById("stockNumber").value,
      serialNumber: document.getElementById("SerialNumber").value,
      model: document.getElementById("model").value,
      unitOfMeasure: document.getElementById("unitOfMeasure").value,
      unitValue: document.getElementById("unitValue").value,
      balancePerCard: document.getElementById("balancePerCard").value,
      onHandPerCount: document.getElementById("onHandPerCount").value,
      shortageQuantity: document.getElementById("shortageQuantity").value,
      shortageValue: document.getElementById("shortageValue").value,
      remarks: document.getElementById("remarks").value,
    };

    const roomDataRef = push(ref(db, `roomDatas/${roomId}`));

    set(roomDataRef, roomData)
      .then(() => {
        alert("Data saved successfully!");
        window.location.href = "user-dashboard.html";
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Error saving data: " + error.message);
      });
  });
