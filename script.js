const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const saveBtn = document.getElementById("saveBtn");
const formatSelect = document.getElementById("formatSelect");

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = colorPicker.value;
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 4, 0, Math.PI * 2);
  ctx.fill();
}

saveBtn.addEventListener("click", () => {
  const format = formatSelect.value;
  let mimeType = "image/png";

  if (format === "jpeg") mimeType = "image/jpeg";
  else if (format === "heic") {
    alert("HEIC format is not natively supported in browsers. Try PNG or JPG.");
    return;
  }

  const link = document.createElement("a");
  link.download = `drawing.${format}`;
  link.href = canvas.toDataURL(mimeType);
  link.click();
});
