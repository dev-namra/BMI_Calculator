document.addEventListener("DOMContentLoaded", () => {
    const appStart = document.querySelector('#appStart');
    const coverPage = document.querySelector('#coverPage');
    const bmiInputSection = document.querySelector('#bmiInputSection');
    const resultSection = document.querySelector('#resultSection');
    const bmiForm = document.getElementById("bmiForm");
    const submitBtn = document.getElementById("submitBtn");
    const refreshBtn = document.getElementById("refresh");
    
    const bmiValueText = document.getElementById("bmiValue");
    const bmiProgressBar = document.getElementById("bmiProgressBar");
    const healthyWeightRange = document.getElementById("healthyWeightRange");
    const bmiPrimeText = document.getElementById("bmiPrime");
    const ponderalIndexText = document.getElementById("ponderalIndex");
    const bmiRangeText = document.getElementById("bmiRange");

    appStart.addEventListener('click', () => {
        coverPage.classList.add('hidden');
        bmiInputSection.classList.remove('hidden');
    });

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
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        if (validateForm()) {
            calculateBMI();
        }
    });

    refreshBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        bmiInputSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
        bmiForm.reset(); // Reset the form values
        resetErrors(); // Reset error messages
    });

    function validateForm() {
        let isValid = true;
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const heightCm = document.getElementById('heightCm').value;
        const heightFeet = document.getElementById('heightFeet').value;
        const heightInches = document.getElementById('heightInches').value;
        const weightKg = document.getElementById('weightKg').value;
        const weightPound = document.getElementById('weightPound').value;

        resetErrors();

        if (!gender) {
            document.getElementById('genderError').classList.remove('hidden');
            isValid = false;
        }
        if (!age) {
            document.getElementById('ageError').classList.remove('hidden');
            isValid = false;
        }
        if (document.getElementById("unit").value === 'cm' && !heightCm) {
            document.getElementById('heightError').classList.remove('hidden');
            isValid = false;
        }
        if (document.getElementById("unit").value === 'in' && (!heightFeet || !heightInches)) {
            document.getElementById('heightError').classList.remove('hidden');
            isValid = false;
        }
        if (document.getElementById("unitWeight").value === 'kg' && !weightKg) {
            document.getElementById('weightError').classList.remove('hidden');
            isValid = false;
        }
        if (document.getElementById("unitWeight").value === 'lb' && !weightPound) {
            document.getElementById('weightError').classList.remove('hidden');
            isValid = false;
        }

        return isValid;
    }

    function resetErrors() {
        document.getElementById('genderError').classList.add('hidden');
        document.getElementById('ageError').classList.add('hidden');
        document.getElementById('heightError').classList.add('hidden');
        document.getElementById('weightError').classList.add('hidden');
    }

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
        const bmiPrime = (bmi / 24.9).toFixed(2);
        const ponderalIndex = (weight / (height ** 3)).toFixed(2);
        const healthyWeightLow = (18.5 * (height * height)).toFixed(1);
        const healthyWeightHigh = (24.9 * (height * height)).toFixed(1);

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

        // Update result section
        bmiValueText.textContent = bmi;
        healthyWeightRange.textContent = `${healthyWeightLow}kg - ${healthyWeightHigh}kg`;
        bmiPrimeText.textContent = bmiPrime;
        ponderalIndexText.textContent = ponderalIndex;

        // Update BMI Range text dynamically
        bmiRangeText.textContent = `Healthy BMI Range: 18.5 - 24.9 (${category})`;

        // Update progress bar
        const progressBarWidth = Math.min((bmi / 40) * 100, 100); // Assuming 40 is the max BMI shown
        bmiProgressBar.style.width = `${progressBarWidth}%`;

        // Change progress bar color based on BMI category
        if (category === "Underweight") {
            bmiProgressBar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500');
            bmiProgressBar.classList.add('bg-blue-500');
        } else if (category === "Normal weight") {
            bmiProgressBar.classList.remove('bg-blue-500', 'bg-yellow-500', 'bg-red-500');
            bmiProgressBar.classList.add('bg-green-500');
        } else if (category === "Overweight") {
            bmiProgressBar.classList.remove('bg-green-500', 'bg-blue-500', 'bg-red-500');
            bmiProgressBar.classList.add('bg-yellow-500');
        } else {
            bmiProgressBar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-blue-500');
            bmiProgressBar.classList.add('bg-red-500');
        }

        // Display result section and hide input section
        bmiInputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }
});
