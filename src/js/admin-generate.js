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

//GENERATE ASSET REGISTRY EXCEL FOR BUILDINGS
try {
  function generateARbuildings() {
    const assetRegistryRef = ref(db, "assetRegistry/buildings");

    get(assetRegistryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Asset Registry");

          const headers = [
            "Office Type",
            "Regional Division Office",
            "Asset Classification",
            "Asset Sub Class",
            "UACS Object Code",
            "Asset Item",
            "Manufacturer",
            "Model",
            "Serial Number",
            "Specification",
            "Source of Fund",
            "Cost of Acquisition",
            "Date of Acquisition",
            "Estimated Total Life Years",
            "Accountable Officer",
            "Asset Location",
            "Remarks",
          ];

          const headerRow = worksheet.addRow(headers);

          headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFF" } };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "002060" },
            };
            cell.alignment = {
              horizontal: "center",
              vertical: "middle",
              wrapText: true,
            };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const row = [
              asset.officeType || "",
              asset.regionalDivisionOffice || "",
              asset.assetClassification || "",
              asset.assetSubClass || "",
              asset.uacsObjectCode || "",
              asset.assetItem || "",
              asset.manufacturer || "",
              asset.model || "",
              asset.serialNumber || "",
              asset.specification || "",
              asset.sourceOfFund || "",
              asset.costOfAcquisition || "",
              asset.dateOfAcquisition || "",
              asset.totalLifeYears || "",
              asset.accountableOfficer || "",
              asset.assetLocation || "",
              asset.remarks || "",
            ];
            const dataRow = worksheet.addRow(row);

            dataRow.eachCell((cell) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { horizontal: "center", vertical: "middle" };
            });
          });

          worksheet.columns.forEach((column) => {
            column.width = column.header
              ? Math.max(
                  ...column.header.map((val) => val.toString().length),
                  20
                )
              : 20;
          });

          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "Asset_Registry_Buildings_&_Structures.xlsx";
              link.click();
              window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
              console.error("Error creating Excel file:", error);
            });
        } else {
          alert("No data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      });
  }

  document
    .getElementById("generateassetBuildings")
    .addEventListener("click", generateARbuildings);
} catch {}

//GENERATE ASSET REGISTRY EXCEL FOR LAND
try {
  function generateARland() {
    const assetRegistryRef = ref(db, "assetRegistry/land");

    get(assetRegistryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Asset Registry");

          const headers = [
            "Office Type",
            "Regional Division Office",
            "Asset Classification",
            "Asset Sub Class",
            "UACS Object Code",
            "Asset Item",
            "Manufacturer",
            "Model",
            "Serial Number",
            "Specification",
            "Property Number",
            "Current Condition",
            "Source of Fund",
            "Cost of Acquisition",
            "Date of Acquisition",
            "Estimated Total Life Years",
            "Accountable Officer",
            "Asset Location",
            "Remarks",
          ];

          const headerRow = worksheet.addRow(headers);

          headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFF" } };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "002060" },
            };
            cell.alignment = {
              horizontal: "center",
              vertical: "middle",
              wrapText: true,
            };
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const row = [
              asset.officeType || "",
              asset.regionalDivisionOffice || "",
              asset.assetClassification || "",
              asset.assetSubClass || "",
              asset.uacsObjectCode || "",
              asset.assetItem || "",
              asset.manufacturer || "",
              asset.model || "",
              asset.serialNumber || "",
              asset.specification || "",
              asset.propertyNumber || "",
              asset.currentCondition || "",
              asset.sourceOfFund || "",
              asset.costOfAcquisition || "",
              asset.dateOfAcquisition || "",
              asset.totalLifeYears || "",
              asset.accountableOfficer || "",
              asset.assetLocation || "",
              asset.remarks || "",
            ];
            const dataRow = worksheet.addRow(row);

            dataRow.eachCell((cell) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { horizontal: "center", vertical: "middle" };
            });
          });

          worksheet.columns.forEach((column) => {
            column.width = column.header
              ? Math.max(
                  ...column.header.map((val) => val.toString().length),
                  20
                )
              : 20;
          });

          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "Asset_Registry_Land.xlsx";
              link.click();
              window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
              console.error("Error creating Excel file:", error);
            });
        } else {
          alert("No data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      });
  }

  document
    .getElementById("generateassetLand")
    .addEventListener("click", generateARland);
} catch {}
