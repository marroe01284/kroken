import express from "express";
import cors from "cors";
import mysql from 'mysql2/promise';
import 'dotenv/config';
const connection  = await mysql.createConnection({
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
app.get("/", async (req, res)=>{
    const [result] = await connection.query("SELECT * FROM water")
    res.send(result);
})
// app.get("/water/:id", (req, res)=>{
//     console.log(req.params.id);
//     res.send(req.params.id);
// })
app.listen(3004, ()=>{
    console.log("server started");
})
app.get("/query", (req,res) => {
    res.send(req.query);
})

app.get("/water/:id", async (req, res)=>{
    const id = Number(req.params.id);
    if(!isNaN(id)){
        try {
            const [result] = await connection.execute("SELECT * FROM water WHERE id = ?", [id]);
            if(result.length){
                res.json(result);
            }else{
                res.status(404).json({message: "Water not found"});
            }
        }catch (error){
            res.status(500).send("something went wrong");
        }
    }else{
        res.status(400).json({message: "ID is not a valid number"});
    }
})
app.post("/water", async (req, res) => {
    const {id, name} = req.body;
res.json(req.body);
const [result]= await connection.query(`
INSERT INTO water(id, name)
VALUES('${id}', '${name}')
`);
res.json(result);
});
app.get("/water", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM water
    `);
    res.json(result);
});
app.get("/post", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM post
    `);
    res.json(result);
});
const query ="url.com?query=hello"
const param = "url.com/param"
