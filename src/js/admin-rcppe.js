import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
  query,
  orderByKey,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//DISPLAYING ASSET REGISTRY - LAND
async function fetchAndDisplayData() {
  const tableBody = document.querySelector("#room-data-table tbody");

  const assetRegistryRef = ref(db, "rcppe");
  const orderedQuery = query(assetRegistryRef, orderByKey());

  try {
    const snapshot = await get(orderedQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      tableBody.innerHTML = "";

      const sortedKeys = Object.keys(data).reverse();

      sortedKeys.forEach((assetId) => {
        const asset = data[assetId];
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="px-6 py-4 border">${asset.article || "-"}</td>
          <td class="px-6 py-4 border">${asset.description || "-"}</td>
          <td class="px-6 py-4 border">${asset.propertyNo || "-"}</td>
          <td class="px-6 py-4 border">${asset.unitOfMeasure || "-"}</td>
           <td class="px-6 py-4 border">
          ${
            asset.unitValue
              ? parseFloat(asset.unitValue).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-"
          }
          </td>
          <td class="px-6 py-4 border">${asset.quantityPerCard || "-"}</td>
          <td class="px-6 py-4 border">${asset.quantityPerCount || "-"}</td>
          <td class="px-6 py-4 border">${
            asset.shortageOverageQuantity || "-"
          }</td>
          <td class="px-6 py-4 border">
          ${
            asset.shortageOverageValue
              ? parseFloat(asset.shortageOverageValue).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-"
          }
          </td>
          <td class="px-6 py-4 border">${asset.remarks || "-"}</td>
          <td class="px-6 py-4 flex justify-center gap-2">
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition edit-btn hover:scale-105"
              data-id="${assetId}"
            >
              Edit
            </button>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition delete-btn hover:scale-105"
              data-id="${assetId}"
            >
              Delete
            </button>
          </td>
        `;

        tableBody.appendChild(row);

        document.querySelectorAll(".edit-btn").forEach((button) => {
          button.addEventListener("click", handleEdit);
        });

        document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", handleDelete);
        });
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="p-6 bg-gray-200 text-center font-bold border" colspan="20">No Data</td>`;
      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while fetching data. Please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);

function handleEdit(event) {
  const itemId = event.target.getAttribute("data-id");
  const roomId = localStorage.getItem("roomId");

  const itemRef = ref(db, `rcppe/${itemId}`);
  get(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const itemData = snapshot.val();

        document.getElementById("article").value = itemData.article || "";
        document.getElementById("description").value =
          itemData.description || "";
        document.getElementById("propertyNo").value = itemData.propertyNo || "";
        document.getElementById("unitOfMeasure").value =
          itemData.unitOfMeasure || "";
        document.getElementById("unitValue").value = itemData.unitValue || "";
        document.getElementById("quantityPerCard").value =
          itemData.quantityPerCard || "";
        document.getElementById("quantityPerCount").value =
          itemData.quantityPerCount || "";
        document.getElementById("shortageOverageQuantity").value =
          itemData.shortageOverageQuantity || "";
        document.getElementById("shortageOverageValue").value =
          itemData.shortageOverageValue || "";
        document.getElementById("remarks").value = itemData.remarks || "";

        document.getElementById("editModal").style.display = "flex";

        document.getElementById("editForm").onsubmit = async (e) => {
          e.preventDefault();

          const updatedData = {
            article: document.getElementById("article").value,
            description: document.getElementById("description").value,
            propertyNo: document.getElementById("propertyNo").value,
            unitOfMeasure: document.getElementById("unitOfMeasure").value,
            unitValue: document.getElementById("unitValue").value,
            quantityPerCard: document.getElementById("quantityPerCard").value,
            quantityPerCount: document.getElementById("quantityPerCount").value,
            shortageOverageQuantity: document.getElementById(
              "shortageOverageQuantity"
            ).value,
            shortageOverageValue: document.getElementById(
              "shortageOverageValue"
            ).value,
            remarks: document.getElementById("remarks").value,
          };

          try {
            await set(itemRef, updatedData);
            alert("Item updated successfully!");
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
    });
}

function handleDelete(event) {
  const itemId = event.target.getAttribute("data-id");

  const modal = document.getElementById("deleteModal");
  const confirmButton = document.getElementById("confirmDelete");
  const cancelButton = document.getElementById("cancelDelete");

  modal.style.display = "flex";

  confirmButton.onclick = async () => {
    try {
      await remove(ref(db, `rcppe/${itemId}`));
      alert("Item deleted successfully.");
      modal.style.display = "none";
      location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting the item.");
      console.log("Item ID:", itemId);
      console.log("Firebase Path:", `rcppe/${itemId}`);
    }
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
