// UPI ID validation — format: localpart@handle
// Handles: name@okhdfcbank, 9876543210@paytm, name@ybl, name@oksbi, etc.
function isValidUPI(id) {
  return /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9]+$/.test(id);
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

// All DOM interactions after page is fully loaded
window.onload = function () {
  // Wire up button
  document.getElementById("generateQR").addEventListener("click", generateQRCode);

  // Clear errors on typing
  document.getElementById("upiID").addEventListener("input", () => showError("upiID", "upiError", false));
  document.getElementById("amount").addEventListener("input", () => showError("amount", "amountError", false));

  // URL param pre-fill
  const urlParams = new URLSearchParams(window.location.search);
  const upiID  = urlParams.get("upiId");
  const amount = urlParams.get("amount");
  const note   = urlParams.get("note");

  if (upiID)  document.getElementById("upiID").value  = upiID;
  if (amount) document.getElementById("amount").value = amount;
  if (note)   document.getElementById("note").value   = decodeURIComponent(note);

  if (upiID && amount) generateQRCode();
};

// Function to generate QR code
function generateQRCode() {
  const upiID  = document.getElementById("upiID").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const note   = document.getElementById("note").value.trim();

  let hasError = false;

  // Validate UPI ID
  if (!upiID || !isValidUPI(upiID)) {
    showError("upiID", "upiError", true);
    hasError = true;
  } else {
    showError("upiID", "upiError", false);
  }

  // Validate amount
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    showError("amount", "amountError", true);
    hasError = true;
  } else {
    showError("amount", "amountError", false);
  }

  if (hasError) return;

  const qrCodeDiv = document.getElementById("qrCode");
  const qrSection = document.getElementById("qrSection");

  qrCodeDiv.innerHTML = "";

  // Build UPI string
  let upiString = `upi://pay?pa=${upiID}&am=${amount}`;
  if (note) upiString += `&tn=${encodeURIComponent(note)}`;

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

    // Show metadata below QR
    document.getElementById("qrUpiLabel").textContent    = upiID;
    document.getElementById("qrAmountLabel").textContent = `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}${note ? ' · ' + note : ''}`;

    // Reveal the QR section
    qrSection.classList.add('visible');
  });
}
