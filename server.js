const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/calculate-bmi", (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);

    if (!weight || !height || weight <= 0 || height <= 0) {
        return res.send("Invalid input");
    }

    const heightM = height / 100;
    const bmiValue = weight / (heightM * heightM);
    const bmi = bmiValue.toFixed(2);

    let category;
    if (bmiValue < 18.5) category = "Underweight";
    else if (bmiValue < 24.9) category = "Normal weight";
    else if (bmiValue < 29.9) category = "Overweight";
    else category = "Obese";

    const categoryClass = category.replace(" ", "-");

    res.render("result", {
        bmi,
        category,
        categoryClass
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
