import express from "express";
import db from "./db";
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

app.get("/users/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const user = await db.getUserByUsername(username);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log("Server up and running on port -", PORT);
});

export { app };