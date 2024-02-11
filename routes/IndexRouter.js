const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require('fs');
const path = require('path');
const DIR = './public/';

// Importing Mongoose object model
const Product = require('../models/productModel');

// Configuring Multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

// Routes
router.route('/products')
    .get((req, res)=>{
        Product.find().then(data => { res.status(200).json(data) })
    })
    .post(upload.single('image'), (req, res) =>{
        const { price, description } = req.body;
        
        // Validate credentials
        if(!price || !description) return res.status(401).json({message: 'Invalid credentials'})
        
        const url = req.protocol + '://' + req.get('host');
        const imageAddress =`${url}/public/${req.file.filename}`;
        const newProduct = new Product({ imageAddress, price, description})
        newProduct.save()
    })
    .delete((req, res)=>{
        Product.deleteMany({}).then((res) => {
            console.log('All documents removed from the collection.');
            fs.readdir(DIR, (err, files) => {
                if (err) {
                    console.error('Error reading directory:', err);
                    return;
                }
            
                files.forEach(file => {
                    const filePath = path.join(DIR, file);
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(`Error deleting file: ${filePath}`, err);
                        } else {
                            console.log(`Successfully deleted file: ${filePath}`);
                        }
                    });
                });
            });
        }).catch(err => {
            console.error(err)
        });          
    })

router.route('/product/:id')
    .get((req, res)=>{
        const id = req.params.id;
        
        // Validate credentials
        if(!id) return res.status(401).json({message: 'Invalid credentials'})
        
        Product.findById(id).then((data) => {
            res.status(200).json(data)
        })
    })
    .put(upload.single('image'), (req, res)=> {
        const id = req.params.id;
        const { oldimage, price, description } = req.body;

        // Validate credentials
        if(!id || !oldimage || !price || description) return res.status(401).json({message: 'Invalid credentials'})

        const url = req.protocol + '://' + req.get('host');
        const imageAddress =`${url}/public/${req.file.filename}`;
        
        Product.findByIdAndUpdate(id, {imageAddress: imageAddress, price: price, description: description}).then(()=>{
            const filePath = path.join(__dirname, '../public', path.basename(oldimage));
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Error deleting image file from folder:', err);
                } else {
                    console.log(`Successfully deleted file: ${filePath}`);
                }
            })
        })
    })
    .delete((req, res)=>{
        const id = req.params.id;

        // Validate credentials
        if(!id) return res.status(401).json({message: 'Invalid credentials'})
        
        Product.findByIdAndRemove({_id: id}).then((res)=>{
            const filePath = path.join(__dirname, '../public', path.basename(res.imageAddress));
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Error deleting image file from folder:', err);
                } else {
                    console.log(`Successfully deleted file: ${filePath}`);
                }
            });
        })
    })

module.exports = router;
