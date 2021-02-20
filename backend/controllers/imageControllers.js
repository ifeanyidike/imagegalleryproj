import Gallery from "../models/galleryModel.js"

export const addImage = async (req, res) => {
    const images = await Gallery.find({})

    if (!req.file) {
        res.send("image must be provided")
        return
    }

    const image = new Gallery({
        image: req.file.path
    })

    const createdImage = await image.save()

    if (createdImage) {
        if (images) {
            res.status(201).json(images)
        }
    }


}

export const getImageById = async (req, res) => {
    const { id } = req.body
    const image = await Gallery.findById(id)

    if (image) {
        res.send(image)
    } else {
        res.send('No image found')
    }
}

export const getAllImages = async (req, res) => {
    const images = await Gallery.find({})
    if (images) {
        res.send(images)
    } else {
        res.send('No image found')
    }
}