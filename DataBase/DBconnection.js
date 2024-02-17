import { log } from "console";
import mongoose from "mongoose";

const connectToDb = () => {
    mongoose.connect(process.env.DB_CONNECTION)
        .then(() => console.log('database connection established'))
        .catch(() => console.log('database connection failed'))
}

export default connectToDb