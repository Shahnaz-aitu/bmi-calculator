const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));  

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return res.send("<h1>Invalid input! Weight and height must be positive numbers.</h1>");
    }

    const heightM = height / 100; 
    const bmi = weight / (heightM * heightM);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body class="${category.replace(" ", "-")}">
                <div class="result-box">
                    <h1>Your BMI Result</h1>
                    <p><strong>BMI:</strong> ${bmi.toFixed(2)}</p>
                    <p class="category"><strong>Category:</strong> ${category}</p>
                    <a class="back-btn" href="/">Back</a>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
