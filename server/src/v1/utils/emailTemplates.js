let confirmRegister = (email, subject, url) => {
    const emailTemplate = {
        from: "contact@kabanist.fr",
        to: email,
        subject: subject,
        html:
            `Bienvenue sur Kabanist, <br>`+
            `Merci de bien vouloir cliquer sur le lien ci dessous afin de confirmer votre inscription et de pouvoir vous connecter. <br>`+
            `<a href='${url}'> Lien de confirmation </a> `
    };
    return emailTemplate;
}

let resetPassword = (email, subject, url) => {
    const emailTemplate = {
        from: "contact@kabanist.fr",
        to: email,
        subject: subject,
        html:
            `Kabanist, <br>`+
            `Vous avez demandé la réinitialisation de votre mot de passe. <br>`+
            `Afin de poursuivre cette demande, veuillez cliquer sur le lien ci-dessous. <br>`+
            `<a href='${url}'> Lien de mote de passe </a> `
    };
    return emailTemplate;
}

module.exports = { confirmRegister, resetPassword }