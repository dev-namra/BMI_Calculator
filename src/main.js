// var weight, height, measure, bmi, error ;

// function calculate() {
// 	weight = document.getElementById("weight").value;
// 	height = document.getElementById("height").value;
// 	error = "Please enter some values";
// 	height /= 100;
// 	height *= height;
// 	bmi = weight/height;
// 	bmi = bmi.toFixed(1);

// 	if (bmi <= 18.4) {
// 		measure = "Your BMI is " + bmi + " which means " + "you are Underweight";
// 	} else if (bmi >= 18.5 && bmi <= 24.9) {
// 		measure = "Your BMI is " + bmi + " which means " + "You are Normal";
// 	} else if (bmi >= 25 && bmi <= 29.9) {
// 		measure = "Your BMI is " + bmi + " which means " + "You are Overweight";
// 	} else if (bmi >= 30) {
// 		measure = "Your BMI is " + bmi + " which means " + "You are Obese";
// 	}
	

// 	if (weight === 0 ) {
// 		document.getElementById("results").innerHTML = error;
// 	} else if (height === 0){
// 		document.getElementById("results").innerHTML = error;
// 	}
// 	 else {

// 		document.getElementById("results").innerHTML = measure;
// 	}
// 	if (weight < 0) {
// 		document.getElementById("results").innerHTML = "Negative Values not Allowed";
// 	}
// }

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
})

// Weight Unit Toggle
let unitWeight = document.querySelector('#unitWeight');
unitWeight.addEventListener('change', () => {
	const selectedWeightUnit = document.getElementById("unitWeight").value;
	const weightKgInput = document.getElementById("weightKg");
	const weightPoundInput = document.getElementById("weightPound");

	if (selectedUnit === "kg") {
		weightKgInput.classList.remove("hidden");
		weightPoundInput.classList.add("hidden");
	} else if (selectedUnit === "lb") {
		weightKgInput.classList.add("hidden");
		weightPoundInput.classList.remove("hidden");
	}
})


//Sumbit Button Event Handling
let bmiInputSection = document.querySelector('#bmiInputSection');
let resultSection = document.querySelector('#resultSection');
let submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', () => {
	bmiInputSection.classList.add('hidden');
	resultSection.classList.remove('hidden');
	console.log('hello')
})