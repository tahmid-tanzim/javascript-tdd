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
    const user = await db.getUserByUsername(username);
    res.status(200).json(user);
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log("Server up and running on port -", PORT);
});

export { app };