const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail');
const { confirmRegister, resetPassword } = require('../utils/emailTemplates');

exports.register = async (req, res) => {
    const { password } = req.body
    try{
        req.body.password = CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        );

        const user = await User.create(req.body);
        
        const verifToken = await Token.create({
            userId: user.id,
            token: crypto.randomBytes(32).toString("hex")
        });

        const url = `${process.env.BASE_URL}/auth/${user.id}/verify/${verifToken.token}`;

        const emailTemplate = confirmRegister(user.email, "Confirmation d'inscription", url);
        await sendEmail(emailTemplate);

        res.status(201).json({ user });
    } catch(err) {
        res.status(500).send({ message: "Internal Server Error" });
        console.log('err', err)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('password email verified');
        if(!user){
            return res.status(401).json({
                errors: [
                    {
                        param: 'email',
                        msg: 'Email et/ou mot de passe invalides.'
                    }
                ]
            });
        }

        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPass !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: 'email',
                        msg: 'Email et/ou mot de passe invalides.'
                    }
                ]
            });
        }

        user.password = undefined;

        if(!user.verified){
            let token = await Token.findOne({
                userId: user._id
            });
            if(!token){
                const verifToken = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();
        
                const url = `${process.env.BASE_URL}/auth/${user._id}/verify/${verifToken.token}}`;
        
                const emailTemplate = confirmRegister(user.email, "Confirmation d'inscription", url);
                await sendEmail(emailTemplate);
            }
            return res.status(400).json({
                errors: [
                    {
                        param: 'token',
                        msg: "Un email de vérification vous a été envoyé, merci de vérifier"
                    }
                ]
            })
        }

        const token = user.generateAuthToken();

        res.status(200).json({ user, token });

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if(!user) return res.status(404).json({
            errors: [
                {
                    param: "email",
                    msg: "Lien invalide"
                }
            ]
        });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) return res.status(404).json({
            errors: [
                {
                    param: "email",
                    msg: "Lien invalide"
                }
            ]
        });

        await User.findByIdAndUpdate(
            user._id, 
            { $set:  { verified: true } }
        );
        await token.remove();

        res.status(200).json({
            msg: "Inscription confirmée avec succès"
        })

    } catch (err) {
        console.log('error', err)
        return res.status(500).json(err);
    }


}

exports.reset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(409).json({
                errors: [
                    {
                        param: 'email',
                        msg: "Cet email n'existe pas dans notre base de donnée"
                    }
                ]
            });
        }

        let token = await Token.findOne({ userId: user._id });
        if(!token){
           const newToken = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()

            const url = `${process.env.BASE_URL}/password-reset/${user._id}/${newToken.token}}`;

            const emailTemplate = resetPassword(user.email, "Réinitialisation de mot de passe", url);
            await sendEmail(emailTemplate);
        }

        res.status(200).json({
            msg: "Réinitialisation de mot de passe envoyé avec succès"
        })

    } catch (err) {
        console.log('error', err)
        return res.status(500).json(err);
    }    
}

exports.verifyReset = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if(!user) return res.status(400).json({
            errors: [
                {
                    param: "email",
                    msg: "Lien invalide"
                }
            ]
        });
    } catch (err) {
        return res.status(500).json(err);
    }
}