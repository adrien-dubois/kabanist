const Image = require('../models/image');

exports.upload = async(req, res) => {
    try {
        const { image } = req.body;
        if(!image) {
            return res.status(400).json({msg: "Merci de fournir une image"});
        }
        let newImage = new Image({
            image,
        });
        newImage = await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json(err);
    }
}