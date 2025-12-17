const dotenv = require('dotenv');

const express = require('express')
const cors = require('cors');
const session = require('express-session');
const adminRouter = require('./routes/adminRouter')
const publicRouter = require('./routes/publicRouter')
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'super_secret_pass',
    resave: false,
    saveUninitialized : true,
    cookie: { 
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false
    }
}))

app.use('/api', publicRouter);
app.use('/api', adminRouter);


app.use(express.static('public'));



app.get('/admin/login', (req, res) => {
    res.sendFile(
        path.join(__dirname, './public/adminLogin.html')
    )
})

app.get('/public/producto', (req, res) => {
    res.sendFile(
        path.join(__dirname, './public/publicData.html')
    )
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})