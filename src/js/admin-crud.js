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

// ADDING DATA TO ASSET REGISTRY - BUILDINGS & STRUCTURES
try {
  document
    .getElementById("assetFormBuildings")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const assetData = {
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
        sourceOfFund: document.getElementById("sourceOfFund").value,
        costOfAcquisition: document.getElementById("costOfAcquisition").value,
        dateOfAcquisition: document.getElementById("dateOfAcquisition").value,
        totalLifeYears: document.getElementById("totalLifeYears").value,
        accountableOfficer: document.getElementById("accountableOfficer").value,
        assetLocation: document.getElementById("assetLocation").value,
        remarks: document.getElementById("remarks").value,
      };

      const assetDataRef = push(ref(db, `assetRegistry/buildings/`));

      set(assetDataRef, assetData)
        .then(() => {
          alert("Data saved successfully!");
          window.location.href = "admin-ar-buildings.html";
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          alert("Error saving data: " + error.message);
        });
    });
} catch {}

// ADDING DATA TO ASSET REGISTRY - LAND
try {
  document
    .getElementById("assetFormLand")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const assetData = {
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
        costOfAcquisition: document.getElementById("costOfAcquisition").value,
        dateOfAcquisition: document.getElementById("dateOfAcquisition").value,
        totalLifeYears: document.getElementById("totalLifeYears").value,
        accountableOfficer: document.getElementById("accountableOfficer").value,
        assetLocation: document.getElementById("assetLocation").value,
        remarks: document.getElementById("remarks").value,
      };

      const assetDataRef = push(ref(db, `assetRegistry/land/`));

      set(assetDataRef, assetData)
        .then(() => {
          alert("Data saved successfully!");
          window.location.href = "admin-land.html";
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          alert("Error saving data: " + error.message);
        });
    });
} catch {}

// ADDING DATA TO ASSET REGISTRY - OTHER STRUCTURE
try {
  document
    .getElementById("assetFormOtherStructure")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const assetData = {
        articleItem: document.getElementById("articleItem").value,
        description: document.getElementById("description").value,
        newpropertyNo: document.getElementById("newpropertyNo").value,
        personAccountable: document.getElementById("personAccountable").value,
        unitCostValue: document.getElementById("unitCostValue").value,
        totalCostValue: document.getElementById("totalCostValue").value,
        remarks: document.getElementById("remarks").value,
      };

      const assetDataRef = push(ref(db, `assetRegistry/otherStructure/`));

      set(assetDataRef, assetData)
        .then(() => {
          alert("Data saved successfully!");
          window.location.href = "admin-other-structure.html";
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          alert("Error saving data: " + error.message);
        });
    });
} catch {}

// ADDING DATA TO ASSET REGISTRY - SEMI HIGH VALUE
try {
  document
    .getElementById("assetFormSemiHighValue")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const assetData = {
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
        costOfAcquisition: document.getElementById("costOfAcquisition").value,
        dateOfAcquisition: document.getElementById("dateOfAcquisition").value,
        totalLifeYears: document.getElementById("totalLifeYears").value,
        accountableOfficer: document.getElementById("accountableOfficer").value,
        assetLocation: document.getElementById("assetLocation").value,
        remarks: document.getElementById("remarks").value,
      };

      const assetDataRef = push(ref(db, `assetRegistry/semiHighValue/`));

      set(assetDataRef, assetData)
        .then(() => {
          alert("Data saved successfully!");
          window.location.href = "admin-semi-high-value.html";
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          alert("Error saving data: " + error.message);
        });
    });
} catch {}
