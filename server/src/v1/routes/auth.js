const router = require('express').Router();
const userController = require('../controllers/user');
const { body, param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const User = require('../models/user');

router.post(
    '/signup',
    body('email').isLength({ min: 8 }).withMessage(
        "Minimum 8 caractères"
    ),
    body('password').isLength({ min: 8 }).withMessage(
        "Minimum 8 caractères"
    ),
    body('confirmPassword').isLength({ min: 8 }).withMessage(
        "Minimum 8 caractères"
    ),
    body('email').custom(value => {
        return User.findOne({ email: value })
            .then(user => {
                if(user) {
                    return Promise.reject('Cet identifiant est déjà utilisé.')
                }
        })
    }),
    validation.validate,
    userController.register
);


router.post(
    '/login',
    validation.validate,
    userController.login
);

router.post(
    '/verify-token',
    tokenHandler.verifyToken,
    (req, res) => {
        res.status(200).json({ user: req.user });
    }
);

router.get(
    "/:id/verify/:token/",
    param('id').custom(value => {
        if(!validation.isObjectId(value)){
            return Promise.reject('ID Non valide')
        } else return Promise.resolve()
    }),
    validation.validate,
    userController.verifyEmail
);


router.post(
    "/reset", 
    body('email').isEmail().withMessage(
        "Merci de fournir un email valide"
    ),
    validation.validate,
    userController.reset
);

router.get(
    "/:id/:token",
    param('id').custom(value => {
        if(!validation.isObjectId(value)){
            return Promise.reject('ID Non valide')
        } else return Promise.resolve()
    }),
    validation.validate,
    userController.verifyReset
);

module.exports = router;