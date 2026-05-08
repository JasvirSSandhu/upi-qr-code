// UPI ID validation — must match standard format: localpart@provider
function isValidUPI(id) {
  // Must contain exactly one @, localpart non-empty, provider non-empty (letters only)
  return /^[a-zA-Z0-9._\-]+@[a-zA-Z]{3,}$/.test(id);
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

// Clear errors on input
["upiID", "amount"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    const hintId = id === "upiID" ? "upiError" : "amountError";
    showError(id, hintId, false);
  });
});

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

document.getElementById("generateQR").addEventListener("click", generateQRCode);
