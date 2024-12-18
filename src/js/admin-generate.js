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

          headerRow.height = 40;

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

          const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const costOfAcquisition = asset.costOfAcquisition
              ? currencyFormatter.format(asset.costOfAcquisition)
              : "";

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
              costOfAcquisition || "",
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

          headerRow.height = 40;

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

          const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const costOfAcquisition = asset.costOfAcquisition
              ? currencyFormatter.format(asset.costOfAcquisition)
              : "";
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
              costOfAcquisition || "",
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

//GENERATE ASSET REGISTRY EXCEL FOR OTHER STRUCTURE
try {
  function generateAROtherStructure() {
    const assetRegistryRef = ref(db, "assetRegistry/otherStructure");

    get(assetRegistryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("Asset Registry");

          worksheet.getCell("G1").value = "Annex B";
          worksheet.getCell("G1").alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell("G1").font = { bold: true, size: 13 };

          worksheet.mergeCells("A3:G3");
          worksheet.getCell("A3").value = "FE DEL MUNDO NATIONAL HIGH SCHOOL";
          worksheet.getCell("A3").alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell("A3").font = { bold: true, size: 13 };

          worksheet.mergeCells("A4:G4");
          worksheet.getCell("A4").value = "List of PPEs Found at Station";
          worksheet.getCell("A4").alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell("A4").font = { size: 13 };

          worksheet.mergeCells("A7:I7");
          worksheet.getCell("A7").value =
            "PPE Account Group: _______________________________________";
          worksheet.getCell("A7").alignment = { horizontal: "left" };
          worksheet.getCell("A7").font = { bold: true, size: 13 };

          const headers = [
            "Article/Item",
            "Description",
            "New Property No. Assigned",
            "Person Accountable",
            "Unit Cost VALUE",
            "Total Cost VALUE",
            "Remarks",
          ];

          const headerRow = worksheet.addRow(headers);

          headerRow.height = 50;

          headerRow.eachCell((cell) => {
            cell.font = { bold: true };
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

          const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const formattedUnitCost = asset.unitCostValue
              ? currencyFormatter.format(asset.unitCostValue)
              : "";
            const formattedTotalCost = asset.totalCostValue
              ? currencyFormatter.format(asset.totalCostValue)
              : "";
            const row = [
              asset.articleItem || "",
              asset.description || "",
              asset.newpropertyNo || "",
              asset.personAccountable || "",
              formattedUnitCost || "",
              formattedTotalCost || "",
              asset.remarks || "",
            ];
            const dataRow = worksheet.addRow(row);

            dataRow.eachCell((cell, colNumber) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { vertical: "middle" };

              if (colNumber === 5 || colNumber === 6) {
                cell.alignment = {
                  vertical: "middle",
                  horizontal: "right",
                };
              }
            });
          });

          worksheet.columns.forEach((column, index) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
              const columnLength = cell.value
                ? cell.value.toString().length
                : 0;
              if (columnLength > maxLength) {
                maxLength = columnLength;
              }
            });
            column.width = maxLength + 2;
          });

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.addRow([]);

          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "Prepared by:";

          worksheet.getCell(`F${worksheet.lastRow.number}`).value =
            "Reviewed by:";

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.addRow([]);
          worksheet.mergeCells(
            `A${worksheet.lastRow.number}:B${worksheet.lastRow.number}`
          );
          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "DARCEL S. SOLANOY";
          worksheet.getCell(`A${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`A${worksheet.lastRow.number}`).font = {
            bold: true,
            size: 11,
            underline: true,
          };

          worksheet.getCell(`F${worksheet.lastRow.number}`).value =
            "DBEDILLA B. ESTANDA";
          worksheet.getCell(`F${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`F${worksheet.lastRow.number}`).font = {
            bold: true,
            size: 11,
            underline: true,
          };

          worksheet.addRow([]);
          worksheet.mergeCells(
            `A${worksheet.lastRow.number}:B${worksheet.lastRow.number}`
          );
          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "Property Personnel";
          worksheet.getCell(`A${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`A${worksheet.lastRow.number}`).font = { size: 11 };

          worksheet.getCell(`F${worksheet.lastRow.number}`).value =
            "Property Personnel";
          worksheet.getCell(`F${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`F${worksheet.lastRow.number}`).font = { size: 11 };

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.getCell(`A${worksheet.lastRow.number}`).value = "Date:";

          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "Asset_Registry_Other_Structure.xlsx";
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
    .getElementById("generateassetotherStructure")
    .addEventListener("click", generateAROtherStructure);
} catch (error) {
  console.error("Unexpected error:", error);
}

//GENERATE ASSET REGISTRY EXCEL FOR SEMI HIGH VALUE
try {
  function generateARSemiHighValue() {
    const assetRegistryRef = ref(db, "assetRegistry/semiHighValue");

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

          headerRow.height = 40;

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

          const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const costOfAcquisition = asset.costOfAcquisition
              ? currencyFormatter.format(asset.costOfAcquisition)
              : "";

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
              costOfAcquisition || "",
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
              link.download = "Asset_Registry_Semi_High_Value.xlsx";
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
    .getElementById("generateassetSemiHigh")
    .addEventListener("click", generateARSemiHighValue);
} catch {}

//GENERATE RCPPE
try {
  function generateRCPPE() {
    const assetRegistryRef = ref(db, "rcppe");

    get(assetRegistryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("RPCPPE");

          worksheet.getColumn("A").width = 18;
          worksheet.getColumn("B").width = 60;
          worksheet.getColumn("C").width = 21;
          worksheet.getColumn("D").width = 22;
          worksheet.getColumn("E").width = 22;
          worksheet.getColumn("F").width = 22;
          worksheet.getColumn("G").width = 22;
          worksheet.getColumn("H").width = 20;
          worksheet.getColumn("I").width = 20;
          worksheet.getColumn("J").width = 40;

          worksheet.getCell("J1").value = "         Appendix 73";
          worksheet.getCell("J1").alignment = {
            horizontal: "right",
            vertical: "middle",
          };
          worksheet.getCell("J1").font = {
            italic: true,
            size: 15,
            name: "Times New Roman",
          };

          worksheet.mergeCells("A3:J3");
          worksheet.getCell("A3").value =
            "REPORT ON THE PHYSICAL COUNT OF PROPERTY, PLANT, AND EQUIPMENT";
          worksheet.getCell("A3").alignment = { horizontal: "center" };
          worksheet.getCell("A3").font = { bold: true, size: 14 };

          worksheet.mergeCells("A4:J4");
          worksheet.getCell("A4").value = "SCHOOL BUILDINGS";
          worksheet.getCell("A4").alignment = { horizontal: "center" };
          worksheet.getCell("A4").font = { bold: true, size: 12 };

          worksheet.mergeCells("A5:J5");
          worksheet.getCell("A5").value =
            "(Type of Property, Plant and Equipment)";
          worksheet.getCell("A5").alignment = { horizontal: "center" };
          worksheet.getCell("A5").font = { size: 12 };

          const now = new Date();
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const currentMonth = monthNames[now.getMonth()];
          const currentYear = now.getFullYear();

          worksheet.mergeCells("A6:J6");
          worksheet.getCell(
            "A6"
          ).value = `As at ${currentMonth} ${currentYear}`;
          worksheet.getCell("A6").alignment = { horizontal: "center" };
          worksheet.getCell("A6").font = { size: 12 };

          // worksheet.addRow([]);
          // worksheet.addRow([]);

          worksheet.mergeCells("A9:B9");
          worksheet.getCell(
            "A9"
          ).value = `Fund Cluster : ________________________________`;
          worksheet.getCell("A9").font = { bold: true, size: 12 };

          worksheet.mergeCells("A10:J10");
          worksheet.getCell(
            "A10"
          ).value = `For which  Darcel S. Solanoy , Designated School Facilities Coordinator, FE DEL MUNDO NATIONAL HIGH SCHOOL  is accountable, having assumed such accountability on ${currentMonth} ${currentYear}.									
`;
          worksheet.getCell("A10").font = { bold: true, size: 12 };

          const headers = [
            "Article",
            "Description",
            "Property Number",
            "Unit of Measure",
            "Unit Value",
            "Quantity per Property Card",
            "Quantity per Physical Count",
            "Shortage/Overage (Quantity)",
            "Shortage/Overage (Value)",
            "Remarks",
          ];

          const headerRow = worksheet.addRow(headers);
          headerRow.height = 50;

          headerRow.eachCell((cell) => {
            cell.font = { bold: true };
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

          const currencyFormatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          Object.keys(data).forEach((assetId) => {
            const asset = data[assetId];
            const unitValue = asset.unitValue
              ? currencyFormatter.format(asset.unitValue)
              : "";
            const row = [
              asset.article || "",
              asset.description || "",
              asset.propertyNo || "",
              asset.unitOfMeasure || "",
              unitValue || "",
              asset.quantityPerCard || "",
              asset.quantityPerCount || "",
              asset.shortageOverageQuantity || "",
              asset.shortageOverageValue || "",
              asset.remarks || "",
            ];
            const dataRow = worksheet.addRow(row);

            dataRow.eachCell((cell, colNumber) => {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { vertical: "middle" };

              if (colNumber === 5) {
                cell.alignment = { vertical: "middle", horizontal: "right" };
              }
              if (
                colNumber === 3 ||
                colNumber === 4 ||
                colNumber === 6 ||
                colNumber === 7
              ) {
                cell.alignment = { vertical: "middle", horizontal: "center" };
              }
            });
          });

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "Certified Correct by:";
          worksheet.getCell(`D${worksheet.lastRow.number}`).value =
            "Approved by:";
          worksheet.mergeCells(
            `H${worksheet.lastRow.number}:I${worksheet.lastRow.number}`
          );
          worksheet.getCell(`H${worksheet.lastRow.number}`).value =
            "Verified by:";

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.mergeCells(
            `A${worksheet.lastRow.number}:B${worksheet.lastRow.number}`
          );
          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "DARCEL S. SOLANOY";
          worksheet.getCell(`A${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`A${worksheet.lastRow.number}`).font = {
            bold: true,
            underline: true,
          };

          worksheet.mergeCells(
            `D${worksheet.lastRow.number}:F${worksheet.lastRow.number}`
          );
          worksheet.getCell(`D${worksheet.lastRow.number}`).value =
            "BEDILLA B. ESTANDA";
          worksheet.getCell(`D${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`D${worksheet.lastRow.number}`).font = {
            bold: true,
            underline: true,
          };

          worksheet.addRow([]);
          worksheet.mergeCells(
            `I${worksheet.lastRow.number}:J${worksheet.lastRow.number}`
          );
          worksheet.getCell(`I${worksheet.lastRow.number}`).value =
            "________________________________";
          worksheet.getCell(`I${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
          };

          worksheet.mergeCells(
            `A${worksheet.lastRow.number}:B${worksheet.lastRow.number}`
          );
          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "Signature over Printed Name of Inventory Committee Chair and Members";
          worksheet.getCell(`A${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          worksheet.mergeCells(
            `D${worksheet.lastRow.number}:F${worksheet.lastRow.number}`
          );
          worksheet.getCell(`D${worksheet.lastRow.number}`).value =
            "Signature over Printed Name of Head of  Agency/Entity or Authorized Representative";
          worksheet.getCell(`D${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          // worksheet.mergeCells(
          //   `I${worksheet.lastRow.number}:J${worksheet.lastRow.number}`
          // );
          worksheet.getCell(`I${worksheet.lastRow.number}`).value =
            "Signature over Printed Name of COA Representative";
          worksheet.getCell(`I${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `RCPPE_${currentMonth}_${currentYear}.xlsx`;
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
    .getElementById("generateRCPPE")
    .addEventListener("click", generateRCPPE);
} catch (error) {
  console.error("Unexpected error:", error);
}
