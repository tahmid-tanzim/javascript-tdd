import express from "express";
import { getLetterCount } from "./letter-count";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am using babel in NodeJS",
        status: "success",
        data: getLetterCount("Tahmid Tanzim Lupin")
    });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log("Server up and running on port -", PORT);
});