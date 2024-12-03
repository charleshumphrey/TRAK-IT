import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

document.addEventListener("DOMContentLoaded", async () => {
  const roomId = getQueryParam("roomId");
  if (!roomId) {
    alert("Room ID not provided");
    return;
  }

  const roomTitle = document.querySelector("#room-title");
  const roomDataTableBody = document.querySelector("#room-data-table tbody");

  try {
    const roomRef = ref(db, `rooms/${roomId}`);
    const roomSnapshot = await get(roomRef);

    if (roomSnapshot.exists()) {
      const { roomNumber, roomName } = roomSnapshot.val();
      roomTitle.innerHTML = `<span>Room:</span> <strong>${roomName}`;
    } else {
      alert("Room details not found.");
      return;
    }

    const roomDataRef = ref(db, `roomDatas/${roomId}`);
    const roomDataSnapshot = await get(roomDataRef);

    if (roomDataSnapshot.exists()) {
      const roomData = roomDataSnapshot.val();

      Object.values(roomData).forEach((data, index) => {
        const row = document.createElement("tr");
        row.classList.add(index % 2 === 0 ? "bg-white" : "bg-gray-100");
        row.classList.add("hover:bg-gray-50");
        row.innerHTML = `
          <td class="px-6 py-4 border">${data.article}</td>
          <td class="px-6 py-4 border">${data.description}</td>
          <td class="px-6 py-4 border">${data.stockNumber}</td>
          <td class="px-6 py-4 border">${data.serialNumber || " "}</td>
          <td class="px-6 py-4 border">${data.model || " "}</td>
          <td class="px-6 py-4 border">${data.unitOfMeasure}</td>
          <td class="px-6 py-4 border">${data.unitValue}</td>
          <td class="px-6 py-4 border">${data.balancePerCard}</td>
          <td class="px-6 py-4 border">${data.onHandPerCount}</td>
          <td class="px-6 py-4 border">${data.shortageQuantity}</td>
          <td class="px-6 py-4 border">${data.shortageValue}</td>
          <td class="px-6 py-4 border">${data.remarks || ""}</td>
        `;
        roomDataTableBody.appendChild(row);
      });
    } else {
      alert("No data found for this room.");
    }
  } catch (error) {
    console.error("Error fetching room data:", error);
    alert(
      "An error occurred while fetching room data. Please try again later."
    );
  }
});

try {
  function generateRCPI() {
    const roomId = getQueryParam("roomId");
    const assetRegistryRef = ref(db, `roomDatas/${roomId}`);

    get(assetRegistryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("RPCI ");

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
          const currentDate = now.getDate();
          const currentYear = now.getFullYear();

          worksheet.getColumn("A").width = 20;
          worksheet.getColumn("B").width = 50;
          worksheet.getColumn("C").width = 21;
          worksheet.getColumn("D").width = 22;
          worksheet.getColumn("E").width = 22;
          worksheet.getColumn("F").width = 22;
          worksheet.getColumn("G").width = 22;
          worksheet.getColumn("H").width = 20;
          worksheet.getColumn("I").width = 20;
          worksheet.getColumn("J").width = 20;
          worksheet.getColumn("K").width = 20;
          worksheet.getColumn("L").width = 50;

          worksheet.mergeCells("A1:L1");
          worksheet.getCell("A1").value =
            "REPORT ON THE PHYSICAL COUNT OF INVENTORIES (RPCI)";
          worksheet.getCell("A1").alignment = { horizontal: "center" };
          worksheet.getCell("A1").font = { bold: true, size: 16 };

          worksheet.mergeCells("A2:L2");
          worksheet.getCell("A2").value = "ICT EQUIPMENT";
          worksheet.getCell("A2").alignment = { horizontal: "center" };
          worksheet.getCell("A2").font = { bold: true, size: 16 };

          worksheet.mergeCells("A3:L3");
          worksheet.getCell("A3").value = "(Type of Inventory Item)";
          worksheet.getCell("A3").alignment = { horizontal: "center" };
          worksheet.getCell("A3").font = { size: 10 };

          worksheet.mergeCells("A4:L4");
          worksheet.getCell(
            "A4"
          ).value = `As at ${currentMonth} ${currentDate}, ${currentYear}`;
          worksheet.getCell("A4").alignment = { horizontal: "center" };
          worksheet.getCell("A4").font = { bold: true, size: 12 };

          // worksheet.addRow([]);
          // worksheet.addRow([]);

          worksheet.mergeCells("A6:B6");
          worksheet.getCell(
            "A6"
          ).value = `Fund Cluster : ________________________________`;
          worksheet.getCell("A6").font = { bold: true, size: 12 };

          worksheet.mergeCells("A8:J8");
          worksheet.getCell(
            "A8"
          ).value = `For which  Darcel S. Solanoy , Designated School Facilities Coordinator, FE DEL MUNDO NATIONAL HIGH SCHOOL  is accountable, having assumed such accountability on ${currentMonth} ${currentYear}.									
`;
          worksheet.getCell("A8").font = { bold: true, size: 12 };

          const headers = [
            "Article",
            "Description",
            "Stock Number",
            "Serial Number",
            "Model",
            "Unit of Measure",
            "Unit Value",
            "Balance Per Card (Quantity)",
            "On Hand Per Count (Quantity)",
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
              asset.stockNumber || "",
              asset.serialNumber || "",
              asset.model || "",
              asset.unitOfMeasure || "",
              asset.unitValue || "",
              asset.balancePerCard || "",
              asset.onHandPerCount || "",
              asset.shortageQuantity || "",
              asset.shortageValue || "",
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

              if (colNumber === 7 || colNumber === 11) {
                cell.alignment = { vertical: "middle", horizontal: "right" };
              }
              if (
                colNumber === 3 ||
                colNumber === 8 ||
                colNumber === 9 ||
                colNumber === 10
              ) {
                cell.alignment = { vertical: "middle", horizontal: "center" };
              }
            });
          });

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.getCell(`A${worksheet.lastRow.number}`).value =
            "Prepared by:";
          worksheet.getCell(`E${worksheet.lastRow.number}`).value =
            "Verified by:";
          worksheet.mergeCells(
            `H${worksheet.lastRow.number}:I${worksheet.lastRow.number}`
          );
          worksheet.getCell(`K${worksheet.lastRow.number}`).value =
            "Certified Correct by:";

          worksheet.addRow([]);
          worksheet.addRow([]);

          worksheet.getCell(`B${worksheet.lastRow.number}`).value = "";
          worksheet.getCell(`B${worksheet.lastRow.number}`).border = {
            bottom: {
              style: "thin",
              color: { argb: "FF000000" },
            },
          };
          worksheet.getCell(`B${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`B${worksheet.lastRow.number}`).font = {
            bold: true,
            underline: true,
          };

          worksheet.mergeCells(
            `F${worksheet.lastRow.number}:G${worksheet.lastRow.number}`
          );
          worksheet.getCell(`F${worksheet.lastRow.number}`).value =
            "DARCEL S. SOLANOY";
          worksheet.getCell(`F${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`F${worksheet.lastRow.number}`).font = {
            bold: true,
            underline: true,
          };

          worksheet.getCell(`L${worksheet.lastRow.number}`).value =
            "BEDILLA B. ESTANDA";
          worksheet.getCell(`L${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          worksheet.getCell(`L${worksheet.lastRow.number}`).font = {
            bold: true,
            underline: true,
          };

          worksheet.addRow([]);

          worksheet.getCell(`B${worksheet.lastRow.number}`).value =
            "Teacher and Grade Level";
          worksheet.getCell(`B${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          worksheet.mergeCells(
            `F${worksheet.lastRow.number}:G${worksheet.lastRow.number}`
          );
          worksheet.getCell(`F${worksheet.lastRow.number}`).value =
            "Physical Facility Coordinator/Property Custodian";
          worksheet.getCell(`F${worksheet.lastRow.number}`).alignment = {
            horizontal: "center",
            vertical: "middle",
          };

          worksheet.getCell(`L${worksheet.lastRow.number}`).value =
            "Principal III";
          worksheet.getCell(`L${worksheet.lastRow.number}`).alignment = {
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
              link.download = `RCPI_${currentMonth}_${currentYear}.xlsx`;
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
    .getElementById("generateRCPI")
    .addEventListener("click", generateRCPI);
} catch (error) {
  console.error("Unexpected error:", error);
}
