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

      document.getElementById("generate-rcpi").addEventListener("click", () => {
        const { jsPDF } = window.jspdf;

        const doc = new jsPDF("l", "mm", "a4");

        doc.addFont("Times-Roman", "Times", "normal");

        doc.setFont("Times", "normal");
        doc.setFontSize(10);

        const title = "REPORT ON THE PHYSICAL COUNT OF INVENTORIES (RPCI)";
        const subtitle = "ICT Equipment";

        const currentDate = formatDate(new Date());

        const titleX =
          (doc.internal.pageSize.width -
            doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
          2;
        const subtitleX =
          (doc.internal.pageSize.width -
            doc.getStringUnitWidth(subtitle) * doc.internal.getFontSize()) /
          2;

        doc.text(title, titleX, 10);
        doc.setFontSize(8);
        doc.text(subtitle, subtitleX, 20);

        doc.setFontSize(8);
        doc.text(`Date: ${currentDate}`, 10, 30);

        doc.setFontSize(8);
        doc.text(
          `Room Number: ${roomTitle.querySelector("strong").textContent}`,
          10,
          40
        );

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
          "Shortage/Overage Quantity",
          "Shortage/Overage Value",
          "Remarks",
        ];

        const rows = Object.values(roomData).map((data) => [
          data.article,
          data.description,
          data.stockNumber,
          data.serialNumber || "N/A",
          data.model || "N/A",
          data.unitOfMeasure,
          data.unitValue,
          data.balancePerCard,
          data.onHandPerCount,
          data.shortageQuantity,
          data.shortageValue,
          data.remarks || "N/A",
        ]);

        doc.autoTable({
          head: [headers],
          body: rows,
          startY: 50,
          theme: "grid",
          margin: { top: 10, bottom: 10 },
          tableWidth: "auto",
          columnStyles: {
            0: { halign: "center", cellWidth: "auto" },
            1: { halign: "center", cellWidth: "auto" },
            2: { halign: "center", cellWidth: "auto" },
            3: { halign: "center", cellWidth: "auto" },
            4: { halign: "center", cellWidth: "auto" },
            5: { halign: "center", cellWidth: "auto" },
            6: { halign: "center", cellWidth: "auto" },
            7: { halign: "center", cellWidth: "auto" },
            8: { halign: "center", cellWidth: "auto" },
            9: { halign: "center", cellWidth: "auto" },
            10: { halign: "center", cellWidth: "auto" },
            11: { halign: "center", cellWidth: "auto" },

            1: { cellWidth: 50 },
            11: { cellWidth: 50 },
          },
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: "normal",
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            halign: "center",
            fontSize: 8,
          },
          bodyStyles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
            fontSize: 8,
          },
        });

        const scale = 0.8;
        doc.scale(scale);

        doc.save("RCPI_Report.pdf");
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
