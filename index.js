const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// User details
const USER_ID = "abbas_raza_02072003";
const EMAIL = "abbas.raza2023@vitbhopal.ac.in";
const ROLL_NUMBER = "22BCH10004";

// GET
app.get("/bfhl", (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input format. 'data' should be an array."
            });
        }

        const numbers = data.filter(item => !isNaN(item) && item !== '');
        const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => item >= 'a' && item <= 'z');
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestLowercaseAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
