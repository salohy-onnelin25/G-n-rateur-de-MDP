document.addEventListener("DOMContentLoaded", () => {
    const lengthInput = document.getElementById("lengthInput");
    const lengthValueSpan = document.getElementById("lengthValue");
    const charOptionBtns = document.querySelectorAll(".char-option");
    const passwordOutput = document.getElementById("passwordOutput");
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const alertMessage = document.getElementById("alertMessage");

    // ADDED: Constants for the new date and time elements
    const currentDateElement = document.getElementById("currentDate");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";


    function updateDateTime() {
        const now = new Date();

        // 1. Date for Header
        const dateOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        // Format date in French
        const formattedDate = now.toLocaleDateString("fr-FR", dateOptions);
        
        // CHECK: Ensure element exists before setting textContent
        if (currentDateElement) {
            currentDateElement.textContent = formattedDate;
        }


        // 2. Time (Flip Clock structure - only updating text here)
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        // Update the clock elements (CHECK: Ensure elements exist before updating)
        if (hoursElement && minutesElement && secondsElement) {
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
        }
    }

    // Run immediately to show time, then update every 1000ms (1 second)
    updateDateTime();
    setInterval(updateDateTime, 1000);


    function showAlert(message, type) {
        alertMessage.className = "alert-box";
        alertMessage.style.display = "block";
        alertMessage.classList.add(`alert-${type}`);
        alertMessage.textContent = message;
        setTimeout(() => alertMessage.classList.add("visible"), 10);
        setTimeout(() => {
            alertMessage.classList.remove("visible");
            setTimeout(() => (alertMessage.style.display = "none"), 300);
        }, 3000);
    }

    function generatePassword() {
        let length = parseInt(lengthInput.value);
        let characters = "";
        let password = "";
        let activeCount = 0;

        charOptionBtns.forEach((btn) => {
            if (btn.classList.contains("active")) {
                activeCount++;
                const charType = btn.getAttribute("data-char");
                switch (charType) {
                    case "lower":
                        characters += lower;
                        break;
                    case "upper":
                        characters += upper;
                        break;
                    case "number":
                        characters += num;
                        break;
                    case "symbol":
                        characters += sym;
                        break;
                }
            }
        });

        if (activeCount === 0) {
            showAlert(
                "⚠️ Veuillez sélectionner au moins un type de caractère.",
                "error"
            );
            passwordOutput.value = "";
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        passwordOutput.value = password;
    }

    function copyPassword() {
        const password = passwordOutput.value;

        if (!password) {
            showAlert("Rien à copier. Générez un mot de passe d'abord.", "error");
            return;
        }

        navigator.clipboard
            .writeText(password)
            .then(() => {
                showAlert("✅ Mot de passe copié dans le presse-papiers!", "success");
            })
            .catch((err) => {
                passwordOutput.select();
                document.execCommand("copy");
                showAlert("✅ Mot de passe copié (méthode de repli)!", "success");
            });
    }

    lengthInput.addEventListener("input", (event) => {
        lengthValueSpan.textContent = event.target.value;
    });

    // Logique de bascule (toggle) du bouton, incluant la vérification pour le minimum
    charOptionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let activeCount = 0;
            charOptionBtns.forEach((b) => {
                if (b.classList.contains("active")) {
                    activeCount++;
                }
            });

            if (btn.classList.contains("active") && activeCount === 1) {
                showAlert(
                    "⚠️ Au moins un type de caractère doit être sélectionné.",
                    "warning"
                );
            } else {
                btn.classList.toggle("active");
            }
        });
    });

    generateBtn.addEventListener("click", generatePassword);
    copyBtn.addEventListener("click", copyPassword);

    generatePassword();
});