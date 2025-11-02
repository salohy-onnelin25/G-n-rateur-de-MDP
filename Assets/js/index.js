document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('lengthInput');
    const lengthValueSpan = document.getElementById('lengthValue'); 
    const lowercaseCheck = document.getElementById('lowercase');
    const uppercaseCheck = document.getElementById('uppercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const passwordOutput = document.getElementById('passwordOutput');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const alertMessage = document.getElementById('alertMessage');

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    function showAlert(message, type) {
        alertMessage.className = 'alert-box';
        alertMessage.style.display = 'block';
        alertMessage.classList.add(`alert-${type}`);
        alertMessage.textContent = message;
        setTimeout(() => alertMessage.classList.add('visible'), 10);
        setTimeout(() => {
            alertMessage.classList.remove('visible');
            setTimeout(() => alertMessage.style.display = 'none', 300);
        }, 3000);
    }

    function generatePassword() {
        let length = parseInt(lengthInput.value); 
        let characters = "";
        let password = "";
        
        const isLowercase = lowercaseCheck.checked;
        const isUppercase = uppercaseCheck.checked;
        const isNumbers = numbersCheck.checked;
        const isSymbols = symbolsCheck.checked;

        if (!isLowercase && !isUppercase && !isNumbers && !isSymbols) {
            showAlert("⚠️ Veuillez sélectionner au moins un type de caractère.", 'error');
            passwordOutput.value = "";
            return;
        }

        if (isLowercase) characters += lower;
        if (isUppercase) characters += upper;
        if (isNumbers) characters += num;
        if (isSymbols) characters += sym;
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        passwordOutput.value = password;
    }

    function copyPassword() {
        const password = passwordOutput.value;

        if (!password) {
            showAlert("Rien à copier. Générez un mot de passe d'abord.", 'error');
            return;
        }

        navigator.clipboard.writeText(password).then(() => {
            showAlert("✅ Mot de passe copié dans le presse-papiers!", 'success');
        }).catch(err => {
            passwordOutput.select();
            document.execCommand('copy');
            showAlert("✅ Mot de passe copié (méthode de repli)!", 'success');
        });
    }

    lengthInput.addEventListener('input', (event) => {
        lengthValueSpan.textContent = event.target.value;
    });

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    generatePassword(); 
});