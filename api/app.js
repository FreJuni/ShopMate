const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const multer = require('multer')
// middleware
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

app.use(multer({
    storage,
    fileFilter
}).single("image"));

// for routing
app.use(authRoute);
app.use('/admin', adminRouter);
app.use('/user', userRouter);


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to mongodb');
    app.listen(3000);
}).catch((err) => {
    console.log(err);
})