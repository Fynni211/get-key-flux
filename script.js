// Funktion, um den Countdown zu starten
function startCountdown() {
    let buttonContainer = document.getElementById("button-container");
    let countdownContainer = document.getElementById("countdown-container");
    let countdownElement = document.getElementById("countdown");
    let countdownValue = 30;

    // Button ausblenden und Countdown starten
    buttonContainer.style.display = 'none';
    countdownContainer.style.display = 'block';

    const countdownInterval = setInterval(() => {
        countdownElement.innerText = countdownValue;
        countdownValue--;

        if (countdownValue < 0) {
            clearInterval(countdownInterval);  // Countdown stoppen
            fetchKey();  // Schlüssel abrufen
        }
    }, 1000); // Jede Sekunde aktualisieren
}

// Funktion, um den Schlüssel von Pastebin abzurufen
async function fetchKey() {
    try {
        const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://pastebin.com/raw/pRFn0s20'));

        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Daten");
        }

        const key = await response.text();
        console.log("Abgerufener Schlüssel:", key);

        // Schlüssel im Popup anzeigen
        document.getElementById("key").textContent = key;
        document.getElementById("key-popup").style.display = "block";
    } catch (error) {
        console.error("Fehler beim Abrufen des Schlüssels:", error);
        alert("Fehler beim Abrufen des Schlüssels. Bitte versuche es später noch einmal.");
    }
}

// Funktion zum Schließen des Popups
function closePopup() {
    document.getElementById("key-popup").style.display = "none";
}
