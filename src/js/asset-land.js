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

  const assetRegistryRef = ref(db, "assetRegistry/land");
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
          <td class="px-6 py-4 border">${asset.officeType || "-"}</td>
          <td class="px-6 py-4 border">${
            asset.regionalDivisionOffice || "-"
          }</td>
          <td class="px-6 py-4 border">${asset.assetClassification || "-"}</td>
          <td class="px-6 py-4 border">${asset.assetSubClass || "-"}</td>
          <td class="px-6 py-4 border">${asset.uacsObjectCode || "-"}</td>
          <td class="px-6 py-4 border">${asset.assetItem || "-"}</td>
          <td class="px-6 py-4 border">${asset.manufacturer || "-"}</td>
          <td class="px-6 py-4 border">${asset.model || "-"}</td>
          <td class="px-6 py-4 border">${asset.serialNumber || "-"}</td>
          <td class="px-6 py-4 border">${asset.specification || "-"}</td>
          <td class="px-6 py-4 border">${asset.propertyNumber || "-"}</td>
          <td class="px-6 py-4 border">${asset.currentCondition || "-"}</td>
          <td class="px-6 py-4 border">${asset.sourceOfFund || "-"}</td>
          <td class="px-6 py-4 border">${asset.costOfAcquisition || "-"}</td>
          <td class="px-6 py-4 border">${asset.dateOfAcquisition || "-"}</td>
          <td class="px-6 py-4 border">${asset.totalLifeYears || "-"}</td>
          <td class="px-6 py-4 border">${asset.accountableOfficer || "-"}</td>
          <td class="px-6 py-4 border">${asset.assetLocation || "-"}</td>
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

  const itemRef = ref(db, `assetRegistry/land/${itemId}`);
  get(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const itemData = snapshot.val();

        document.getElementById("officeType").value = itemData.officeType || "";
        document.getElementById("regionalDivisionOffice").value =
          itemData.regionalDivisionOffice || "Oriental Mindoro";
        document.getElementById("assetClassification").value =
          itemData.assetClassification || "";
        document.getElementById("assetSubClass").value =
          itemData.assetSubClass || "";
        document.getElementById("uacsObjectCode").value =
          itemData.uacsObjectCode || "1060402000";

        document.getElementById("assetItem").value = itemData.assetItem || "";
        document.getElementById("manufacturer").value =
          itemData.manufacturer || "";
        document.getElementById("model").value = itemData.model || "";
        document.getElementById("serialNumber").value =
          itemData.serialNumber || "";
        document.getElementById("specification").value =
          itemData.specification || "";
        document.getElementById("propertyNumber").value =
          itemData.propertyNumber || "";
        document.getElementById("currentCondition").value =
          itemData.currentCondition || "";
        document.getElementById("sourceOfFund").value =
          itemData.sourceOfFund || "";

        document.getElementById("costOfAcquisition").value =
          itemData.costOfAcquisition || "";
        document.getElementById("dateOfAcquisition").value =
          itemData.dateOfAcquisition || "";
        document.getElementById("totalLifeYears").value =
          itemData.totalLifeYears || "";
        document.getElementById("accountableOfficer").value =
          itemData.accountableOfficer || "";
        document.getElementById("assetLocation").value =
          itemData.assetLocation || "";
        document.getElementById("remarks").value = itemData.remarks || "";

        document.getElementById("editModal").style.display = "flex";

        document.getElementById("editForm").onsubmit = async (e) => {
          e.preventDefault();

          const updatedData = {
            officeType: document.getElementById("officeType").value,
            regionalDivisionOffice: document.getElementById(
              "regionalDivisionOffice"
            ).value,
            assetClassification: document.getElementById("assetClassification")
              .value,
            assetSubClass: document.getElementById("assetSubClass").value,
            uacsObjectCode: document.getElementById("uacsObjectCode").value,
            assetItem: document.getElementById("assetItem").value,
            manufacturer: document.getElementById("manufacturer").value,
            model: document.getElementById("model").value,
            serialNumber: document.getElementById("serialNumber").value,
            specification: document.getElementById("specification").value,
            propertyNumber: document.getElementById("propertyNumber").value,
            currentCondition: document.getElementById("currentCondition").value,
            sourceOfFund: document.getElementById("sourceOfFund").value,
            costOfAcquisition:
              document.getElementById("costOfAcquisition").value,
            dateOfAcquisition:
              document.getElementById("dateOfAcquisition").value,
            totalLifeYears: document.getElementById("totalLifeYears").value,
            accountableOfficer:
              document.getElementById("accountableOfficer").value,
            assetLocation: document.getElementById("assetLocation").value,
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
      await remove(ref(db, `assetRegistry/land/${itemId}`));
      alert("Item deleted successfully.");
      modal.style.display = "none";
      location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting the item.");
      console.log("Item ID:", itemId);
      console.log("Firebase Path:", `assetRegistry/buildings/${itemId}`);
    }
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
