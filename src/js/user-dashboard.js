import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const roomId = localStorage.getItem("roomId");

    const roomDataRef = ref(db, `roomDatas/${roomId}`);
    const snapshot = await get(roomDataRef);

    if (snapshot.exists()) {
      const roomData = snapshot.val();
      const tableBody = document.getElementById("roomDataBody");

      tableBody.innerHTML = "";

      const roomDataArray = Object.entries(roomData).map(([key, value]) => ({
        key,
        ...value,
      }));

      roomDataArray.sort((a, b) => {
        if (a.article > b.article) return -1;
        if (a.article < b.article) return 1;
        return 0;
      });

      roomDataArray.forEach((data) => {
        const row = document.createElement("tr");
        row.classList.add("hover:bg-gray-100", "transition");

        row.innerHTML = `
          <td class="px-6 py-4 border">${data.article}</td>
          <td class="px-6 py-4 border">${data.description}</td>
          <td class="px-6 py-4 border"><small>${data.stockNumber}</small></td>
          <td class="px-6 py-4 border"><small>${data.serialNumber}</small></td>
          <td class="px-6 py-4 border"><small>${data.model}</small></td>
          <td class="px-6 py-4 border">${data.unitOfMeasure}</td>
          <td class="px-6 py-4 border">${data.unitValue}</td>
          <td class="px-6 py-4 border">${data.balancePerCard}</td>
          <td class="px-6 py-4 border">${data.onHandPerCount}</td>
          <td class="px-6 py-4 border">${data.shortageQuantity}</td>
          <td class="px-6 py-4 border">${data.shortageValue}</td>
          <td class="px-6 py-4 border"><small>${data.remarks}</small></td>
          <td class="px-6 py-4 flex justify-center gap-2">
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition edit-btn hover:scale-105"
              data-id="${data.key}"
            >
              Edit
            </button>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition delete-btn hover:scale-105"
              data-id="${data.key}"
            >
              Delete
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });

      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", handleEdit);
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleDelete);
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td class="p-6 bg-gray-200 text-center font-bold border" colspan="13">No Room Data</td>`;
      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching room data:", error);
    alert(
      "An error occurred while fetching room data. Please try again later."
    );
  }
});

function handleEdit(event) {
  const itemId = event.target.getAttribute("data-id");
  const roomId = localStorage.getItem("roomId");

  const itemRef = ref(db, `roomDatas/${roomId}/${itemId}`);
  get(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const itemData = snapshot.val();

        document.getElementById("editArticle").value = itemData.article;
        document.getElementById("editDescription").value = itemData.description;
        document.getElementById("editStockNumber").value = itemData.stockNumber;
        document.getElementById("editSerialNumber").value =
          itemData.serialNumber;
        document.getElementById("editmodel").value = itemData.model;
        document.getElementById("editUnitOfMeasure").value =
          itemData.unitOfMeasure;
        document.getElementById("editUnitValue").value = itemData.unitValue;
        document.getElementById("editBalancePerCard").value =
          itemData.balancePerCard;
        document.getElementById("editOnHandPerCount").value =
          itemData.onHandPerCount;
        document.getElementById("editShortageQuantity").value =
          itemData.shortageQuantity;
        document.getElementById("editShortageValue").value =
          itemData.shortageValue;
        document.getElementById("editRemarks").value = itemData.remarks;

        document.getElementById("editModal").style.display = "flex";

        document.getElementById("editForm").onsubmit = async (e) => {
          e.preventDefault();

          const updatedData = {
            article: document.getElementById("editArticle").value,
            description: document.getElementById("editDescription").value,
            stockNumber: document.getElementById("editStockNumber").value,
            serialNumber: document.getElementById("editSerialNumber").value,
            model: document.getElementById("editmodel").value,
            unitOfMeasure: document.getElementById("editUnitOfMeasure").value,
            unitValue: document.getElementById("editUnitValue").value,
            balancePerCard: document.getElementById("editBalancePerCard").value,
            onHandPerCount: document.getElementById("editOnHandPerCount").value,
            shortageQuantity: document.getElementById("editShortageQuantity")
              .value,
            shortageValue: document.getElementById("editShortageValue").value,
            remarks: document.getElementById("editRemarks").value,
          };

          try {
            await set(itemRef, updatedData);
            // alert("Item updated successfully!");
            document.getElementById("editModal").style.display = "none";
            location.reload();
          } catch (error) {
            console.error("Error updating item:", error);
            alert("An error occurred while updating the item.");
          }
        };

        document.getElementById("cancelEdit").onclick = () => {
          document.getElementById("editModal").style.display = "none";
        };
      } else {
        alert("Item data not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching item data:", error);
      alert("An error occurred while fetching the item data.");
    });
}

function handleDelete(event) {
  const itemId = event.target.getAttribute("data-id");
  const roomId = localStorage.getItem("roomId");

  const modal = document.getElementById("deleteModal");
  const confirmButton = document.getElementById("confirmDelete");
  const cancelButton = document.getElementById("cancelDelete");

  modal.style.display = "flex";

  confirmButton.onclick = async () => {
    try {
      await remove(ref(db, `roomDatas/${roomId}/${itemId}`));
      alert("Item deleted successfully.");
      modal.style.display = "none";
      location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
