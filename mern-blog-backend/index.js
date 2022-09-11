const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const cors = require('cors')
const path = require('path')

const app = express()
const port = 5000
app.use(cors())

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))


mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected to MongoDB"))
    .catch((err) => console.log(err));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
    console.log(`mern-blog app listening on port ${port}`)
})


// app.use(express.static(path.join(__dirname, "/mern-blog/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/mern-blog/build', 'index.html'));
// });

// app.listen(process.env.PORT || port, () => {
//     console.log(`mern-blog app listening on port ${port}`)
// })