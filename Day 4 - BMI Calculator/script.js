function calculateBMI() {
    let height = document.getElementById("height").value / 100;
    let weight = document.getElementById("weight").value;
    if (height > 0 && weight > 0) {
        let bmi = (weight / (height * height)).toFixed(1);
        document.getElementById("result").innerText = "Your BMI: " + bmi;
        positionArrow(bmi);
    } else {
        alert("Please enter valid values.");
    }
}

function positionArrow(bmi) {
    let arrow = document.getElementById("arrow");
    let position;
    if (bmi < 18.5) {
        position = "10%";
    } else if (bmi >= 18.5 && bmi < 25) {
        position = "40%";
    } else if (bmi >= 25 && bmi < 30) {
        position = "70%";
    } else {
        position = "90%";
    }
    arrow.style.left = position;
}