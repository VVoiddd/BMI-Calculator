document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark');

    document.getElementById('theme-toggle').addEventListener('change', () => {
        const isDarkMode = document.getElementById('theme-toggle').checked;
        setTheme(isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});

function calculateBMI() {
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    const heightUnit = document.getElementById('height-unit').value;
    const weightUnit = document.getElementById('weight-unit').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Convert height to cm if necessary
    if (heightUnit === 'in') {
        height = height * 2.54; // Convert inches to cm
    }

    // Convert weight to kg if necessary
    if (weightUnit === 'lb') {
        weight = weight * 0.453592; // Convert pounds to kg
    }

    // Convert height from cm to meters
    height = height / 100;

    // Calculate BMI
    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(1);

    // Update BMI result
    const bmiResult = document.getElementById('bmi-value');
    bmiResult.textContent = `Your BMI is ${bmiValue}`;

    // Determine BMI category and set indicator position
    const indicator = document.getElementById('bmi-indicator');
    let bmiCategory;
    if (bmi < 17.1) {
        indicator.style.left = `${(bmi / 17.1) * 33.33}%`;
        bmiCategory = "Underweight 10 BMI - 17.1 BMI";
    } else if (bmi < 23.2) {
        indicator.style.left = `${33.33 + ((bmi - 17.1) / (23.1 - 17.1)) * 33.33}%`;
        bmiCategory = "Normal 17.1 BMI - 23.2 BMI";
    } else {
        indicator.style.left = `${66.66 + ((bmi - 23.2) / (38 - 23.2)) * 33.33}%`;
        bmiCategory = "Overweight 23.2 BMI - 38 BMI";
    }

    // Append advice based on gender
    let message = `Your BMI is ${bmiValue}<br>(${bmiCategory})`;
    if (gender === 'male') {
        if (bmi < 17.1) {
            message += "<br>Consider gaining weight.";
        } else if (bmi < 23.2) {
            message += "<br>You are in a healthy weight range.";
        } else {
            message += "<br>Consider losing weight.";
        }
    } else if (gender ===  'female') {
        if (bmi < 17.1) {
            message += "<br>Consider gaining weight.";
        } else if (bmi < 23.2) {
            message += "<br>You are in a healthy weight range.";
        } else {
            message += "<br>Consider losing weight.";
        }
    }

    // Display BMI advice
    bmiResult.innerHTML = message;
}

function setTheme(isDarkMode) {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const themeClass = isDarkMode ? 'fade-in-dark' : 'fade-in-light';
    const otherThemeClass = isDarkMode ? 'fade-in-light' : 'fade-in-dark';

    body.classList.add(themeClass);
    body.classList.remove(otherThemeClass);
    header.classList.add(themeClass);
    header.classList.remove(otherThemeClass);
    footer.classList.add(themeClass);
    footer.classList.remove(otherThemeClass);
}
