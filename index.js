import express from "express";
import cors from "cors";
import mysql from 'mysql2/promise';
import 'dotenv/config';
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const app = express();
let count = 0;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    count++;
    console.log(count);
    next();
});
app.get("/", async (req, res) => {
    const [result] = await connection.query("SELECT * FROM water")
    res.send(result);
})
// app.get("/water/:id", (req, res)=>{
//     console.log(req.params.id);
//     res.send(req.params.id);
// })
app.listen(3004, () => {
    console.log("server started");
})
app.get("/query", (req, res) => {
    res.send(req.query);
})

app.get("/water/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
        try {
            const [result] = await connection.execute("SELECT * FROM water WHERE id = ?", [id]);
            if (result.length) {
                res.json(result);
            } else {
                res.status(404).json({ message: "Water not found" });
            }
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    } else {
        res.status(400).json({ message: "ID is not a valid number" });
    }
})
app.post("/water", async (req, res) => {
    const { name, species } = req.body;
    res.json(req.body);
    const [result] = await connection.query(`
        INSERT INTO water(name, species)
        VALUES(?,?)`,
        [name, species]
);
    res.json(result);
});
app.post("/lure", async (req, res) => {
    const { title, content, name, image_path, water_id } = req.body;
    try {
        const [result] = await connection.query(`
            INSERT INTO lure(title, content, name, image_path, water_id)
            VALUES(?,?,?,?,?)`,
            [title, content, name, image_path, water_id]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/water", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM water
    `);
    res.json(result);
});
app.get("/lure", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM lure
    `);
    res.json(result);
});

// app.put("/lure/:id", async (req, res) => {
//     const lureId = req.params.id;
//     const { title, content, name, image_path, water_id } = req.body;
    
//     try {
//         const [result] = await connection.query(
//             `UPDATE lure 
//              SET title = ?, content = ?, name = ?, image_path = ?, water_id = ? 
//              WHERE id = ?`,
//             [title, content, name, image_path, water_id, lureId]
//         );
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

const query = "url.com?query=hello"
const param = "url.com/param"
