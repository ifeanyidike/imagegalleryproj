import express from 'express'
const router = express.Router()

import { addImage, getImageById, getAllImages } from "../controllers/imageControllers.js"
import { imageUploads } from "../controllers/uploadControllers.js"

router.post('/', addImage)
router.get('/', getAllImages)
router.get('/:id', getImageById)

export default router