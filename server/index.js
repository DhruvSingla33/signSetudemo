require("dotenv").config();
const cors= require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Sign = require("./models/Sign");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;





connectDB();
app.use(cors());

app.use(express.urlencoded({ extended: true } ));
app.use(express.json());

app.use("/uploads", express.static("uploads"));








app.get('/api/signs', async (req, res) => {
  try {

    const Signs = await Sign.find();
    
 
    res.status(200).json(Signs);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error });
  }
});

app.get('/api/sign/:id', async (req, res) => {
  try {
    const Signs = await Sign.findById(req.params.id);
    console.log(Signs);
    res.status(200).json(Signs);
  } catch (err) {
   console.error('Error fetching videos:', err);
    res.status(500).json({ message: 'Error fetching videos', err });
  }
});
app.put('/sign/:id', async (req, res) => {
  const { word, definition } = req.body;

  try {
    const updatedSign = await Sign.findByIdAndUpdate(
      req.params.id,
      { word, definition },
      { new: true }
    );

    if (!updatedSign) {
      return res.status(404).json({ message: 'Sign not found' });
    }

    res.status(200).json(updatedSign);
  } catch (error) {
    console.error('Error updating sign:', error);
    res.status(500).json({ message: 'Server error while updating sign' });
  }
});


app.delete("/api/sign/:id", async (req, res) => {
  try {
    const sign = await Sign.findByIdAndDelete(req.params.id);
    if (!sign) return res.status(404).send("Sign not found");
     console.log("dlet");
    res.status(200).json({ message: "Sign deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })


app.post('/api/sign', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    const { word, definition } = req.body;
  const imageUrl = req.files.image?.[0]?.path;
  const videoUrl = req.files.video?.[0]?.path;
    
    const newSign = new Sign({
      word,
      definition,
      imageUrl,
      videoUrl
    });
    console.log(newSign);
 
    await newSign.save();

  
    res.status(201).json({ message: 'Video uploaded successfully', sign: newSign });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
});














app.get("/", (req, res) => {
    res.json("This is the home page.");
});

app.get("*", (req, res) => {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Sever running at Port: ${PORT}`)
});