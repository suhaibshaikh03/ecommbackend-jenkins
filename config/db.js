const mongoose = require("mongoose");
const DBconnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log('Error in DB connection', error)
        process.exit(1)
    }
}
module.exports = DBconnection