import { connection } from "../config/db.js";

export async function getAllLures(req, res){
    try {
            const [rows] = await connection.query("SELECT * FROM lure");
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving lures" });
        }
}

export async function getLureById(req, res){
    try {
            const id = Number(req.params.id);
            if (isNaN(id)){
                return res.status(400).json({ message: "ID is not a valid number" });
            }
            const[lureRows] = await connection.query("SELECT * FROM lure WHERE id=?",[id]);
            if(lureRows.length === 0){
                return res.status(404).json({ message: "Lure not found" });
            }
            res.json(lureRows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving lure" });
        }
}

export async function createLure(req, res){
    try {
            const { title, content, name, image_path, water_id } = req.body;
            const [result] = await connection.query(`
                INSERT INTO lure(title, content, name, image_path, water_id)
                VALUES(?,?,?,?,?)`,
                [title, content, name, image_path, water_id]
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

export async function updateLure(req, res){
    try {
            const lureId = Number(req.params.id);
            if (isNaN(lureId)){
                return res.status(400).json({ message: "ID is not a valid number" });
            }
            const { title, content, name, image_path, water_id } = req.body;
            const [result] = await connection.query(
                `UPDATE lure 
                SET title =?, content =?, name =?, image_path =?, water_id =? 
                WHERE id =?`,
                [title, content, name, image_path, water_id, lureId]
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

export async function deleteLure(req, res){
    try {
            const lureId = Number(req.params.id);
            if (isNaN(lureId)){
                return res.status(400).json({ message: "ID is not a valid number" });
            }
            const [result] = await connection.query("DELETE FROM lure WHERE id=?",[lureId]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting lure" });
        }
}