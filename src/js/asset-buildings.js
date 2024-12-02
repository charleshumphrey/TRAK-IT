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

//DISPLAYING ASSET REGISTRY - BUILDINGS & STRUCTURES
function fetchAndDisplayData() {
  const tableBody = document.querySelector("#room-data-table tbody");

  const assetRegistryRef = ref(db, "assetRegistry/buildings");

  get(assetRegistryRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        tableBody.innerHTML = "";

        Object.keys(data).forEach((assetId) => {
          const asset = data[assetId];
          const row = document.createElement("tr");

          row.innerHTML = `
              <td class="px-6 py-4 border">${asset.officeType}</td>
              <td class="px-6 py-4 border">${asset.regionalDivisionOffice}</td>
              <td class="px-6 py-4 border">${asset.assetClassification}</td>
              <td class="px-6 py-4 border">${asset.assetSubClass}</td>
              <td class="px-6 py-4 border">${asset.uacsObjectCode}</td>
              <td class="px-6 py-4 border">${asset.assetItem}</td>
              <td class="px-6 py-4 border">${asset.manufacturer}</td>
              <td class="px-6 py-4 border">${asset.model}</td>
              <td class="px-6 py-4 border">${asset.serialNumber}</td>
              <td class="px-6 py-4 border">${asset.specification}</td>
              <td class="px-6 py-4 border">${asset.sourceOfFund}</td>
              <td class="px-6 py-4 border">${asset.costOfAcquisition}</td>
              <td class="px-6 py-4 border">${asset.dateOfAcquisition}</td>
              <td class="px-6 py-4 border">${asset.totalLifeYears}</td>
              <td class="px-6 py-4 border">${asset.accountableOfficer}</td>
              <td class="px-6 py-4 border">${asset.assetLocation}</td>
              <td class="px-6 py-4 border">${asset.remarks}</td>
            `;

          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td class="p-6 bg-gray-200 text-center font-bold border" colspan="17">No Data</td>`;
        tableBody.appendChild(row);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayData);
