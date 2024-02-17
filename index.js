import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './DataBase/DBconnection.js'
import bootstrap from './Src/bootstrap.js'
dotenv.config()

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const app = express()
const port = process.env.PORT

connectToDb()
bootstrap(app)

app.listen(port, () => console.log(`E-commerce app listening on port ${port}!`))