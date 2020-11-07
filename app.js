const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(express.json())

const uri = "mongodb+srv://khrakib:khr@kib@cluster0.peszb.mongodb.net/auth?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     console.log('database connected !');
//     const collection = client.db("auth").collection("users");
// });

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('database connected !');
})

const userRouter = require('./routes/User');
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})