// UPI ID validation — just checks for @ with content on both sides
function isValidUPI(id) {
  const parts = id.split('@');
  return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
}

function showError(fieldId, hintId, show) {
  const input = document.getElementById(fieldId);
  const hint  = document.getElementById(hintId);
  if (show) {
    input.classList.add('error');
    hint.classList.add('visible');
  } else {
    input.classList.remove('error');
    hint.classList.remove('visible');
  }
}

// Function to generate QR code
function generateQRCode() {
  const upiID  = document.getElementById("upiID").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const note   = document.getElementById("note").value.trim();
  const qrCodeDiv = document.getElementById("qrCode");
  const qrSection = document.getElementById("qrSection");

  // Clear any existing QR code
  qrCodeDiv.innerHTML = "";

  let hasError = false;

  if (!upiID || !isValidUPI(upiID)) {
    showError("upiID", "upiError", true);
    hasError = true;
  } else {
    showError("upiID", "upiError", false);
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    showError("amount", "amountError", true);
    hasError = true;
  } else {
    showError("amount", "amountError", false);
  }

  if (hasError) return;

  // Create the UPI payment string
  let upiString = `upi://pay?pa=${upiID}&am=${amount}`;
  if (note) {
    upiString += `&tn=${encodeURIComponent(note)}`;
  }

  // Generate QR code
  QRCode.toCanvas(upiString, {
    width: 240,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: '#111111', light: '#ffffff' }
  }, function (error, canvas) {
    if (error) {
      console.error(error);
      alert("Failed to generate QR Code.");
      return;
    }

    qrCodeDiv.appendChild(canvas);

    document.getElementById("qrUpiLabel").textContent = upiID;
    document.getElementById("qrAmountLabel").textContent =
      `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` +
      (note ? ' · ' + note : '');

    qrSection.classList.add('visible');
  });
}

// On page load, extract URL parameters, populate fields, and auto-generate QR if applicable
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const upiID  = urlParams.get("upiId");
  const amount = urlParams.get("amount");
  const note   = urlParams.get("note");

  if (upiID)  document.getElementById("upiID").value  = upiID;
  if (amount) document.getElementById("amount").value = amount;
  if (note)   document.getElementById("note").value   = decodeURIComponent(note);

  if (upiID && amount) generateQRCode();
};

// Clear errors on typing
document.getElementById("upiID").addEventListener("input", () => showError("upiID", "upiError", false));
document.getElementById("amount").addEventListener("input", () => showError("amount", "amountError", false));

// Event listener for manual generation — matches original structure
document.getElementById("generateQR").addEventListener("click", generateQRCode);
