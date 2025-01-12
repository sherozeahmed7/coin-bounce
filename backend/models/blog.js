const mongoose = require('mongoose')
const {Schema} = mongoose;

const blogSchema = new Schema ({
    title: {type: String, required: true},
    content: {type: String, required: true},
    photopath: {type: String, required: true},
    author: {type: mongoose.SchemaType.ObjectId, ref: "users"}
},
{timestamps:true}
);

module.exports = mongoose.model('blog', blogSchema, 'blogs')

