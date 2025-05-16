const displayBox = document.getElementById("displayBox");
const outputBox = document.getElementById("outputPassword");
const charLengthSpan = document.getElementById("charLength");
const rangeInput = document.getElementById("myRange");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.querySelector(".generate");
const strengthBars = document.querySelectorAll(".bars");

rangeInput.addEventListener("input", () => {
    charLengthSpan.textContent = rangeInput.value;
});

function getSelectedOptions() {
    let options = [];
    if (uppercase.checked) options.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (lowercase.checked) options.push("abcdefghijklmnopqrstuvwxyz");
    if (numbers.checked) options.push("0123456789");
    if (symbols.checked) options.push("!@#$%^&*()_+~`|}{[]:;?><,./-=");
    return options;
}

function generatePassword(length) {
    const selectedSets = getSelectedOptions();
    if (selectedSets.length === 0) {
        outputBox.textContent = "Select at least one option!";
        return;
    }

    
    let password = "";

    for (let i = 0; i < length; i++) {
        let randSet = selectedSets[Math.floor(Math.random() * selectedSets.length)];
        password += randSet[Math.floor(Math.random() * randSet.length)];
    }

    outputBox.textContent = password;
    updateStrength(selectedSets.length, length);
}

function updateStrength(typeCount, length) {
    let score = 0;

    if (typeCount >= 1) score++;
    if (typeCount >= 2 && length >= 6) score++;
    if (typeCount >= 3 && length >= 8) score++;
    if (typeCount === 4 && length >= 10) score++;

    strengthBars.forEach((bar, index) => {
        bar.style.backgroundColor = index < score ? "#7fff99" : "#2e2e38";
    });
}

generateBtn.addEventListener("click", () => {
    const length = parseInt(rangeInput.value);
    generatePassword(length);
});

displayBox.addEventListener("click", () => {
    const password = outputBox.textContent.trim();
    if (!password || password === "Select at least one option!") return;

    navigator.clipboard.writeText(password).then(() => {
        displayBox.classList.add("copied");
        setTimeout(() => {
            displayBox.classList.remove("copied");
        }, 1000);
    });
});
