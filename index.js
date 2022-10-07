require('dotenv').config()
const axios = require('axios')
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const app = express()

const passport = require('passport')
const { Strategy } = require('passport-discord')

app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./views'))

const MemoryStore = require('memorystore')(session)

app.use(session({
  cookie: { maxAge: 604800000 },
  secret: process.env.SECRET,
  store: new MemoryStore({
    checkPeriod: 604800000
  }),
  resave: true,
  saveUninitialized: true
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const scopes = ['identify', 'guilds', 'email', 'guilds.join']

passport.use(new Strategy({
  clientID: process.env.ID,
  clientSecret: process.env.SECRET,
  callbackURL: 'https://starbot.website/api/callback',
  scope: scopes
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(async function () {
    await axios.put(`https://discord.com/api/v8/guilds/1025926077484388373/members/${profile.id}`, {
      access_token: accessToken
    }, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`
      }
    })
    return done(null, profile)
  })
}))

app.use('/', require('./routers/index'))

app.listen(2101, () => {
  console.log('[SERVER] - Servidor iniciado com Sucesso!')
})
require('./bot')
