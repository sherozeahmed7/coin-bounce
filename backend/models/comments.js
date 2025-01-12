const mongoose = require("mongoose")
const {Schema} = mongoose;

const commentsSchema = new Schema({
    Content: {type: String, required: true},
    blog: {type: mongoose.SchemaType.ObjectId, ref: 'blogs'},
    author: {type: mongoose.SchemaType.ObjectId, required: true},
},
{timestamps: true}

)
module.exports = mongoose.model('Comments', commentsSchema, 'comments')