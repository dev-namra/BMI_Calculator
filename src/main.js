// Weight Unit Toggle
let unitWeight = document.querySelector('#unitWeight');
unitWeight.addEventListener('change', () => {
    const selectedWeightUnit = document.getElementById("unitWeight").value;
    const weightKgInput = document.getElementById("weightKg");
    const weightPoundInput = document.getElementById("weightPound");

    if (selectedWeightUnit === "kg") {
        weightKgInput.classList.remove("hidden");
        weightPoundInput.classList.add("hidden");
    } else if (selectedWeightUnit === "lb") {
        weightKgInput.classList.add("hidden");
        weightPoundInput.classList.remove("hidden");
    }
});

// Height Unit Toggle
let unit = document.querySelector('#unit');
unit.addEventListener('change', () => {
    const selectedUnit = document.getElementById("unit").value;
    const heightCmInput = document.getElementById("heightCm");
    const heightFeetInput = document.getElementById("heightFeet");
    const heightInchesInput = document.getElementById("heightInches");

    if (selectedUnit === "cm") {
        heightCmInput.classList.remove("hidden");
        heightFeetInput.classList.add("hidden");
        heightInchesInput.classList.add("hidden");
    } else if (selectedUnit === "in") {
        heightCmInput.classList.add("hidden");
        heightFeetInput.classList.remove("hidden");
        heightInchesInput.classList.remove("hidden");
    }
});

// Submit Button Event Handling
let bmiInputSection = document.querySelector('#bmiInputSection');
let resultSection = document.querySelector('#resultSection');
let submitBtn = document.querySelector('#submitBtn');
let refreshBtn = document.querySelector('#refresh');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    calculateBMI();
});

refreshBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    bmiInputSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    document.getElementById('bmiForm').reset(); // Reset the form values
});

function calculateBMI() {
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const heightUnit = document.getElementById('unit').value;
    const weightUnit = document.getElementById('unitWeight').value;
    
    let height;
    if (heightUnit === 'cm') {
        height = document.getElementById('heightCm').value / 100; // convert to meters
    } else {
        const heightFeet = document.getElementById('heightFeet').value;
        const heightInches = document.getElementById('heightInches').value;
        height = (heightFeet * 0.3048) + (heightInches * 0.0254); // convert to meters
    }
    
    let weight;
    if (weightUnit === 'kg') {
        weight = document.getElementById('weightKg').value;
    } else {
        weight = document.getElementById('weightPound').value * 0.453592; // convert to kg
    }

    const bmi = (weight / (height * height)).toFixed(1);
    let category;
    if (bmi <= 18.4) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    document.querySelector('#resultSection h2').innerText = `Your result: ${bmi}`;
    document.querySelector('#resultSection p').innerText = `A BMI of ${bmi} means you are ${category}.`;
    
    bmiInputSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
}
