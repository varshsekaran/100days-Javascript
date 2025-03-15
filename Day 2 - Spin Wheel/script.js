const wheel = document.querySelector(".wheel");
const spinButton = document.getElementById("spinButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const segmentsContainer = document.getElementById("segments");

// Define segments with scores and colors
const scores = [10, 20, 50, 100, 200, 500];
const colors = ["red", "yellow", "green", "blue", "orange", "pink"];
const totalSegments = scores.length;

// Generate wheel segments dynamically
const createWheel = () => {
    let angle = 360 / totalSegments;
    let startAngle = -90;

    scores.forEach((score, i) => {
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

        // Calculate the path arc
        let x1 = 150 + 150 * Math.cos((startAngle * Math.PI) / 180);
        let y1 = 150 + 150 * Math.sin((startAngle * Math.PI) / 180);
        let x2 = 150 + 150 * Math.cos(((startAngle + angle) * Math.PI) / 180);
        let y2 = 150 + 150 * Math.sin(((startAngle + angle) * Math.PI) / 180);

        let largeArcFlag = angle > 180 ? 1 : 0;

        path.setAttribute("d", `M150,150 L${x1},${y1} A150,150 0 ${largeArcFlag},1 ${x2},${y2} Z`);
        path.setAttribute("fill", colors[i]);
        segmentsContainer.appendChild(path);

        // Position text
        let textX = 150 + 90 * Math.cos(((startAngle + angle / 2) * Math.PI) / 180);
        let textY = 150 + 90 * Math.sin(((startAngle + angle / 2) * Math.PI) / 180);

        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", "16");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("transform", `rotate(${startAngle + angle / 2}, ${textX}, ${textY})`);
        text.textContent = score;

        segmentsContainer.appendChild(text);
        startAngle += angle;
    });
};

createWheel();

spinButton.addEventListener("click", () => {
    let randomDegree = Math.floor(3600 + Math.random() * 360);
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        let finalDegree = randomDegree % 360;
        let index = Math.floor((360 - finalDegree) / (360 / totalSegments)) % totalSegments;
        let finalScore = scores[index];
        scoreDisplay.innerText = `Your Score: ${finalScore}`;
    }, 3000);
});
