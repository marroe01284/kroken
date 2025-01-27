import { connection } from "../config/db.js";

export async function getAllWaters(req, res){
    try {
        const [rows] = await connection.query("SELECT * FROM water");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving waters" });
    }
}

export async function getWaterById(req, res){
    try {
        const id = Number(req.params.id);
        if (isNaN(id)){
            return res.status(400).json({ message: "ID is not a valid number" });
        }
        const[waterRows] = await connection.query("SELECT * FROM water WHERE id=?",[id]);
        if(waterRows.length === 0){
            return res.status(404).json({ message: "Water not found" });
        }
        const [lureRows] = await connection.query(`
        SELECT l.title, l.content, l.name, l.image_path
        FROM lure l
        JOIN water w ON l.water_id = w.id
        WHERE l.water_id = ?`,
        [id]
      );
      res.json({
        water: waterRows[0],
        lures: lureRows
      });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error retrieving water" });
    }
}

export async function createWater(req, res){
    try {
        const { name, species } = req.body;
        const [result] = await connection.query("INSERT INTO water(name, species) VALUES(?,?)",[name, species]);
        res.status(201).json({ message: "Water created successfully", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating water" });
    }
}