const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING} = require('../config/index')


// const connectionString = "mongodb+srv://coin-bounce:coinbounce@admin.tqcr1.mongodb.net/coin-bounce?retryWrites=true&w=majority&appName=admin";

// const connectionString = MONGODB_CONNECTION_STRING;


const dbConnect = async () => {
    try {
        // mongoose.set('strictQuery', false)
        // console.log("MONGODB_CONNECTION_STRING:", MONGODB_CONNECTION_STRING)

        // console.log(typeof MONGODB_CONNECTION_STRING);
        
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        
        console.log(`backend is connected to: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error}` );
        
    }
    
}
module.exports = dbConnect;