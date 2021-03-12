const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).sendFile("index.html");
});

router.get("/commands", (request, response) => {
    response.status(200).sendFile("comandos.html", { root: './views' });
});

router.get("/staff", (request, response) => {
    response.status(200).sendFile("equipe.html", { root: './views' });
});

router.get("/add", (request, response) => {
    response.redirect("https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=8&scope=bot");
});

router.get("/support", (request, response) => {
    response.redirect("https://discord.gg/URVABpmDTe");
});

router.get("/github", (request, response) => {
    response.redirect("https://github.com/yADGithub/starbot");
});

router.get("/discord", (request, response) => {
    response.redirect("https://discord.gg/URVABpmDTe");
});

router.get("/twitter", (request, response) => {
    response.redirect("https://twitter.com/Starzinha_BOT")
});

router.get("/temvagapraadm", (request, response) => {
    response.status(200).send("<h1>Não!</h1>");
});

module.exports = router;