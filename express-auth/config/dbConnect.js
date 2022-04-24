const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoUrl')

const connectDB = async () => {
    try {
        await mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true});
        console.log("DB Connected")
    }
    catch(err){
        console.log("DB Connection Failed:"+err.message)
        process.exit(1)
    }
}

module.exports = connectDB