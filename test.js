// Funktion, um den Countdown zu starten
function startCountdown() {
    // Elemente holen
    let buttonContainer = document.getElementById("button-container");
    let countdownContainer = document.getElementById("countdown-container");
    let countdownElement = document.getElementById("countdown");
    let button = document.getElementById("start-button");
    let countdownValue = 30;

    // Button ausblenden und Countdown sichtbar machen
    buttonContainer.style.display = 'none';
    countdownContainer.style.display = 'block';

    // Countdown anzeigen und runterzählen
    const countdownInterval = setInterval(() => {
        countdownElement.innerText = countdownValue;
        countdownValue--;

        // Wenn Countdown 0 erreicht, den Schlüssel abrufen
        if (countdownValue < 0) {
            clearInterval(countdownInterval);  // Countdown stoppen
            fetchKey();  // Schlüssel abrufen
        }
    }, 1000); // 1 Sekunde warten
}

// Funktion, um den Schlüssel von der Pastebin-URL abzurufen
async function fetchKey() {
    try {
        // Verwende einen anderen CORS-Proxy (AllOrigins)
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://pastebin.com/raw/pRFn0s20'));
        
        // Überprüfen, ob die Antwort OK ist
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Daten");
        }

        // Extrahiere den Text des Schlüssels aus der Antwort
        const data = await response.json();
        const key = data.contents;
        
        // Ausgabe des Schlüssels in der Konsole für Debugging
        console.log("Abgerufener Schlüssel:", key);

        // Den Schlüssel im Popup anzeigen
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
