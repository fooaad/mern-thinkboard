import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//const express = require("express") // CommonJS syntax
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

//console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001


// middleware to parse JSON request bodies
app.use(express.json());
app.use(rateLimiter);
app.use(cors({
    origin: "http://localhost:5173",
    })
);
// our simple custom middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method} & Request URL: ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

// What is an Endpoint?
// An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({ message: "Note created successfully!"});
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "Note updated successfully!"});
// });
// //http://localhost:5001/api/notes/21

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({ message: "Note deleted successfully!"});
// });
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
    });
});
//mongodb+srv://fuadmdfuadul_db_user:lZZHPhtwlxsR1A5M@cluster0.tzfvnn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0