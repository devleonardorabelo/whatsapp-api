const express      = require('express')
const mongoose     = require('mongoose')
const port         = process.env.PORT || 21068
const app          = express()
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const session      = require('express-session')
const passport     = require('passport')
const exphbs       = require('express-handlebars')
const path         = require('path')

mongoose.connect('mongodb://localhost:27017/apiwhatsapp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: '44(%09u7*jgjtk&218g1erg41fstkytdr8',
    resave: true,
    saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())


const auth      = require('./routes/auth')
const panel     = require('./routes/panel')
const redirects = require('./routes/redirects')


app.use('/auth', auth)
app.use('/panel', panel)
app.use('/', redirects)

app.listen(port, () =>  {
    console.log(`connected in port: ${port}`)
})