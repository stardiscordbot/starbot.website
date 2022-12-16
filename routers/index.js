const { bot } = require('../bot')
const markdown = require('markdown-it')()
const axios = require('axios')
const config = require('../config.json')
const express = require('express')
const router = express.Router()

router.get('/', (request, response) => {
  return response.status(200).render('index', {
    bot
  })
})

router.get('/commands', (request, response) => {
  return response.status(200).render('comandos', {
    bot
  })
})

router.get('/staff', (request, response) => {
  const modInfo = []
  const devInfo = []
  config.moderators.forEach(async (mod) => {
    await axios.get(`https://api.starbot.website/users/profile/${mod}`).then((res) => {
      res.data.user.bio = markdown.render(res.data.user.bio)
      modInfo.push(res.data)
    })
  })
  config.developers.forEach(async (dev) => {
    await axios.get(`https://api.starbot.website/users/profile/${dev}`).then((res) => {
      res.data.user.bio = markdown.render(res.data.user.bio)
      devInfo.push(res.data)
    })
  })
  setTimeout(() => {
    return response.status(200).render('equipe', {
      modInfo,
      devInfo,
      bot
    })
  }, 2000)
})

router.get('/add', (request, response) => {
  response.redirect('https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=8&scope=bot')
})

router.get('/support', (request, response) => {
  response.redirect('https://discord.gg/URVABpmDTe')
})

router.get('/github', (request, response) => {
  response.redirect('https://github.com/yADGithub/starbot')
})

router.get('/discord', (request, response) => {
  response.redirect('https://discord.gg/URVABpmDTe')
})

router.get('/twitter', (request, response) => {
  response.redirect('https://twitter.com/Starzinha_BOT')
})

router.get('/temvagapraadm', (request, response) => {
  response.status(200).send('<h1>Não!</h1>')
})

module.exports = router
