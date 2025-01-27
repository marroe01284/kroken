import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import waterRoutes from './src/routes/waterRoutes.js';
import lureRoutes from './src/routes/lureRoutes.js';

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//router routes
app.use('/water', waterRoutes);
app.use('/lure', lureRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});