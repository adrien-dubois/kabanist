const router = require('express').Router({ mergeParams: true });
const tokenHandler = require('../handlers/tokenHandler');
const imageController = require('../controllers/image');

router.post(
    '/',
    tokenHandler.verifyToken,
    imageController.upload
);

module.exports = router;