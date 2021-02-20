import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import imageRoutes from "./routes/imageRoutes.js"
import path from 'path'

import { addImage, getImageById, getAllImages } from "./controllers/imageControllers.js"
import { imageUploads } from "./controllers/uploadControllers.js"

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.post('/api/gallery', imageUploads.single('image'), addImage)
app.get('/api/gallery', getAllImages)
app.get('/api/gallery/:id', getImageById)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 4000

app.listen(PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode or port ${PORT}`))